"use client";

import { useEffect, useRef, useState } from "react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const ADMIN_PHONE = "081234546572";
const ADMIN_EMAIL = "kalunastore@gmail.com";
const ADMIN_WA = `https://wa.me/62${ADMIN_PHONE.slice(1)}?text=${encodeURIComponent(
  "Halo admin Kaluna Living, saya butuh bantuan."
)}`;

const SUGGESTIONS = [
  "Cara beli produk di Kaluna Living?",
  "Bagaimana cara custom order?",
  "Pembayaran apa saja yang tersedia?",
];

const INITIAL_BOT: ChatMessage = {
  role: "assistant",
  content:
    "Halo! Saya chatbot Kaluna Living. Tanya apa saja seputar produk, pesanan, atau pembayaran. Jika saya tidak bisa jawab, saya akan arahkan ke admin.",
};

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_BOT]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, open]);

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    setError(null);
    setInput("");

    const history = messages.slice(-8);
    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, history }),
      });

      const data = await res.json().catch(() => null);
      const reply =
        data && typeof data.reply === "string"
          ? data.reply
          : "Maaf, saya belum bisa menjawab. Silakan hubungi admin.";

      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Maaf, terjadi kendala. Silakan hubungi admin melalui WhatsApp atau email.",
        },
      ]);
      setError("Gagal terhubung ke server chatbot.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {showHint && (
        <div className="fixed bottom-[132px] right-4 sm:right-6 z-50 max-w-[240px] rounded-2xl bg-white/90 px-4 py-3 shadow-md ring-1 ring-black/10 backdrop-blur">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-xs font-semibold text-[#111827]">Chatbot Kaluna</p>
              <p className="text-[11px] text-[#111827]/65">
                Tanya produk, pesanan, pembayaran, dan info layanan.
              </p>
            </div>
            <button
              type="button"
              className="text-xs text-[#111827]/60 hover:text-[#111827]"
              onClick={() => setShowHint(false)}
              aria-label="Tutup info chatbot"
            >
              x
            </button>
          </div>
        </div>
      )}

      <div className="fixed bottom-[84px] right-4 sm:right-6 z-50 flex items-center gap-3">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-full w-12 h-12 sm:w-14 sm:h-14
                     bg-gradient-to-br from-[#224670] via-[#6cb4d9] to-[#f08c6a]
                     text-white shadow-lg hover:opacity-90 transition"
          aria-label="Buka chatbot Kaluna Living"
        >
          {open ? (
            <span className="text-lg font-semibold">x</span>
          ) : (
            <span className="text-sm font-semibold">AI</span>
          )}
        </button>
      </div>

      {open && (
        <div className="fixed bottom-[148px] right-4 sm:right-6 z-50 w-[320px] max-w-[92vw] rounded-3xl bg-white/95 shadow-xl ring-1 ring-black/10 backdrop-blur">
          <div className="flex items-start justify-between gap-3 p-4 border-b border-black/10">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-black/45">
                Kaluna Living
              </p>
              <h3 className="text-base font-semibold text-[#111827]">
                Chatbot Kaluna
              </h3>
              <p className="text-[11px] text-[#111827]/65">
                Powered by Cerebras. Jika tidak bisa dijawab, kami arahkan ke admin.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-sm text-[#111827]/60 hover:text-[#111827]"
              aria-label="Tutup chatbot"
            >
              x
            </button>
          </div>

          <div
            ref={listRef}
            className="max-h-[320px] overflow-y-auto p-4 space-y-3"
          >
            {messages.map((m, idx) => (
              <div
                key={`${m.role}-${idx}`}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-[#224670] text-white"
                      : "bg-black/[0.04] text-[#111827]"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="text-xs text-[#111827]/60">Mengetik...</div>
            )}

            {error && (
              <div className="text-xs text-red-600">{error}</div>
            )}
          </div>

          <div className="px-4 pb-3">
            <div className="flex flex-wrap gap-2 pb-3">
              {SUGGESTIONS.map((sug) => (
                <button
                  key={sug}
                  type="button"
                  onClick={() => sendMessage(sug)}
                  className="text-[11px] rounded-full px-3 py-1 bg-black/[0.04] text-[#111827]/70 hover:text-[#111827] transition"
                >
                  {sug}
                </button>
              ))}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(input);
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Tulis pertanyaan..."
                className="flex-1 rounded-2xl px-3 py-2 text-sm ring-1 ring-black/10 focus:outline-none focus:ring-2 focus:ring-[#f08c6a]/60"
              />
              <button
                type="submit"
                disabled={loading}
                className="rounded-2xl px-3 py-2 text-sm font-semibold text-white
                           bg-gradient-to-r from-[#224670] via-[#6cb4d9] to-[#f08c6a]
                           hover:opacity-90 transition disabled:opacity-60"
              >
                Kirim
              </button>
            </form>

            <div className="mt-3 text-[11px] text-[#111827]/60">
              Butuh bantuan admin?{" "}
              <a
                href={ADMIN_WA}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-[#224670] hover:text-[#f08c6a] transition"
              >
                Chat WhatsApp
              </a>{" "}
              atau email {ADMIN_EMAIL}.
            </div>
          </div>
        </div>
      )}
    </>
  );
}

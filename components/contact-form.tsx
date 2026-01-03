"use client";
import clsx from "clsx";
// import { useFormState } from "react-dom";
// import { ContactMessage } from "@/lib/actions";
// import { ContactButton } from "@/components/button";

const ContactForm = () => {
  //   const [state, formAction] = useFormState(ContactMessage, null);
  return (
    <div className="bg-white/90 p-8 rounded-3xl ring-1 ring-white/70 shadow-md backdrop-blur">
      {/* Alert */}
      {/* {state?.message ? (
        <div
          className="p-4 mb-4 text-sm text-gray-800 rounded-lg bg-green-50"
          role="alert"
        >
          <div className="font-medium">{state?.message}</div>
        </div>
      ) : null} */}
      {/* End Alert */}
      <form action="">
        <div className="grid md:grid-cols-2 gap-7 mt-6">
          <div>
            <input
              type="text"
              name="name"
              className="bg-white/80 p-3 ring-1 ring-black/10 rounded-2xl w-full font-light focus:outline-none focus:ring-2 focus:ring-[#f08c6a]/60"
              placeholder="Name*"
            />
            <div aria-live="polite" aria-atomic="true">
              <p className="text-sm text-red-500 mt-2"></p>
            </div>
          </div>
          <div>
            <input
              type="email"
              name="email"
              className="bg-white/80 p-3 ring-1 ring-black/10 rounded-2xl w-full font-light focus:outline-none focus:ring-2 focus:ring-[#f08c6a]/60"
              placeholder="johndoe@example.com*"
            />
            <div aria-live="polite" aria-atomic="true">
              <p className="text-sm text-red-500 mt-2"></p>
            </div>
          </div>
          <div className="md:col-span-2">
            <input
              type="text"
              name="subject"
              className="bg-white/80 p-3 ring-1 ring-black/10 rounded-2xl w-full font-light focus:outline-none focus:ring-2 focus:ring-[#f08c6a]/60"
              placeholder="Subject*"
            />
            <div aria-live="polite" aria-atomic="true">
              <p className="text-sm text-red-500 mt-2">
                {/* {state?.error?.subject} */}
              </p>
            </div>
          </div>
          <div className="md:col-span-2">
            <textarea
              name="message"
              rows={5}
              className="bg-white/80 p-3 ring-1 ring-black/10 rounded-2xl w-full font-light focus:outline-none focus:ring-2 focus:ring-[#f08c6a]/60"
              placeholder="Your message*"
            ></textarea>
            <div aria-live="polite" aria-atomic="true">
              <p className="text-sm text-red-500 mt-2">
                {/* {state?.error?.message} */}
              </p>
            </div>
          </div>
        </div>
        {/* button submit */}
        <button
          type="submit"
          className={clsx(
            "px-10 py-4 text-center font-semibold text-white w-full bg-gradient-to-r from-[#224670] via-[#6cb4d9] to-[#f08c6a] rounded-2xl hover:opacity-90 cursor-pointer"
            // {
            //   "opacity-50 cursor-progress animate-pulse": pending,
            // }
          )}
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactForm;

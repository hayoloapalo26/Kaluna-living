import type { Metadata } from "next";
import ContactForm from "@/components/contact-form";
import {
  IoMailOutline,
  IoCallOutline,
  IoLocationOutline,
} from "react-icons/io5";
import TitleSection from "@/components/title-section";

export const metadata: Metadata = {
  title: "Contact",
};

const Contact = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-[-10%] h-72 w-72 rounded-full bg-[#f6c56e]/25 blur-3xl" />
        <div className="absolute top-12 right-[-8%] h-80 w-80 rounded-full bg-[#6cb4d9]/22 blur-3xl" />
      </div>
      <TitleSection title="Contact Us" subTitle="Lorem ipsum dolor sit amet." />
      <div className="relative max-w-screen-xl mx-auto py-20 px-4">
        <div className="grid md:grid-cols-2 gap-8 rounded-3xl bg-white/85 p-8 md:p-10 ring-1 ring-white/70 shadow-md backdrop-blur">
          <div>
            <h1 className="text-lg text-[#111827]/60 mb-3">Contact Us</h1>
            <h1 className="text-5xl font-semibold text-[#111827] mb-4">
              Get In Touch Today
            </h1>
            <p className="text-[#111827]/70 py-5">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro in
              culpa ducimus ad. Tempore, alias?
            </p>
            <ul className="list-item space-y-6 pt-8">
              <li className="flex gap-5">
                <div className="flex-none bg-[#f6c56e]/20 p-3 shadow-sm rounded-md">
                  <IoMailOutline className="h-7 w-7" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold mb-1">Email :</h4>
                  <p>kalunastore@gmail.com</p>
                </div>
              </li>
              <li className="flex gap-5">
                <div className="flex-none bg-[#6cb4d9]/20 p-3 shadow-sm rounded-md">
                  <IoCallOutline className="h-7 w-7" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold mb-1">Phone Number :</h4>
                  <p>081234546572</p>
                </div>
              </li>
              <li className="flex gap-5">
                <div className="flex-none bg-[#f08c6a]/20 p-3 shadow-sm rounded-md">
                  <IoLocationOutline className="h-7 w-7" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold mb-1">Address :</h4>
                  <p>De Alamuda Residence K-16,Kota Surabaya,Jawa Timur 60222 </p>
                </div>
              </li>
            </ul>
          </div>
          {/* Contact Form */}
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default Contact;

import { Metadata } from "next";
import TitleSection from "@/components/title-section";
import Image from "next/image";
import { IoEyeOutline, IoLocateOutline } from "react-icons/io5";

export const metadata: Metadata = {
  title: "About",
  description: "Who we are",
};

const About = () => {
  return (
    <div>
      <TitleSection title="About Us" subTitle="Kaluna Living." />
      <div className="max-w-screen-xl mx-auto py-20 px-4">
        <div className="grid md:grid-cols-2 gap-8">
          <Image src="/about-image.jpg" width={650} height={579} alt="about" />
          <div>
            <h1 className="text-5xl font-semibold text-gray-900 mb-4">
              Who We Are – Kaluna Living
            </h1>
            <p className="text-gray-700 py-5 text-justify">
              Kaluna Living began its journey in 2016 with a simple vision: to create home living goods that bring joy. Our path started with textiles cushion covers, aprons, cutlery pouches, and wall hangings where we welcomed custom requests and discovered the beauty of personal touches in everyday objects.
              As our community grew, we expanded into wooden and rattan creations, from plates and trays to spoons, forks, and vases. These pieces carried the warmth of natural materials into daily rituals, adding depth and character to the homes they belonged to.
              In recent years, our heart has found its home in ceramics. The process of shaping clay and bringing it to life with color and form became more than a craft; it became the soul of Kaluna Living. This focus allows us to explore design in a way that is both authentic and timeless, staying true to our commitment to warmth, connection, and joyful living.
              Our tagline, “home living goods that bring you joy,” guides everything we do. It comes alive through vibrant colors, thoughtful patterns, and the messages we share within our collections. When someone brings Kaluna Living into their home, they are not simply choosing a product; they are welcoming comfort, beauty, and meaning into their everyday life.
            </p>
            <ul className="list-item space-y-6 pt-8">
              <li className="flex gap-5">
                <div className="flex-none mt-1">
                  <IoEyeOutline className="h-7 w-7" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold mb-1">Vision :</h4>
                  <p className="text-gray-600 text-justify">
                    To become a home living brand that brings warmth, beauty, and meaning into everyday spaces through authentic, timeless designs that inspire joyful living.
                  </p>
                </div>
              </li>
              <li className="flex gap-5">
                <div className="flex-none mt-1">
                  <IoLocateOutline className="h-7 w-7" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold mb-1">Mission :</h4>
                  <p className="text-gray-600">
                  * To create home living goods that bring joy through vibrant colors, thoughtful patterns, and meaningful details.
                  * To celebrate natural materials textiles, wood, rattan, and ceramics by transforming them into objects that enrich daily rituals and living spaces.
                  * To honor craftsmanship and mindful creation, ensuring every piece reflects quality, authenticity, and lasting value beyond trends.
                  * To design products that are not merely functional, but carry comfort, beauty, and emotional connection into everyday life.
                  * To grow alongside our community by listening, collaborating, and continuously creating designs that feel personal, warm, and relevant.
                  </p>
                </div>
              </li>
            </ul>
          </div>
          {/* Contact Form */}
        </div>
      </div>
    </div>
  );
};

export default About;

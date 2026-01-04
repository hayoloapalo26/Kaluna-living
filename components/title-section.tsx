import Image from "next/image";

const TitleSection = ({
  title,
  subTitle,
}: {
  title: string;
  subTitle: string;
}) => {
  return (
    <div className="relative min-h-[200px] sm:min-h-[240px] text-white overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/hero.jpg"
          alt="Background Image"
          fill
          className="object-cover object-center w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1b2d44]/75 via-[#224670]/60 to-[#f08c6a]/45"></div>
      </div>
      <div className="relative flex flex-col justify-center items-center text-center px-4 py-12 sm:py-14">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight capitalize">
          {title}
        </h1>
        <p className="mt-2 text-base sm:text-lg text-white/80">{subTitle}</p>
      </div>
    </div>
  );
};

export default TitleSection;

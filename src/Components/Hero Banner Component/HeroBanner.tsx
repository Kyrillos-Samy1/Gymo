import HeroBannerImage from "../../assets/Images/banner.png";
import Button from "../../utils/Button";

export default function HeroBanner() {
  return (
    <div className="lg:mt-[212px] xs:mt-[70px] md:ml-[50px] relative p-5 tracking-wider">
      <h2 className="text-[var(--primary-color)] font-semibold text-[26px]">
        Fitness Club
      </h2>

      <h2 className="font-bold lg:text-[44px] xs:text-[40px] mb-[23px] mt-[30px]">
        Sweat, Smile <br /> And Repeat
      </h2>

      <p className="text-[22px] leading-[35px] mb-12">
        Check out the most effective exercises
      </p>

      <button
        type="button"
        title="Explore More"
        onClick={() => {
          if (window.innerWidth > 768) {
            window.scrollTo({ top: 1790, left: 100, behavior: "smooth" });
          } else {
            window.scrollTo({ top: 1250, left: 100, behavior: "smooth" });
          }
        }}>
        <Button
          title="Explore More"
          titleHovering="Explore More"
          type="button"
          classNameArrows="pt-[1px]"
        />
      </button>

      <h2 className="font-semibold text-[var(--primary-color)] opacity-10 lg:block xs:hidden text-[200px] tracking-wider">
        Exercise
      </h2>

      <img
        src={HeroBannerImage}
        alt="Hero Banner Image"
        className="absolute right-[40px] top-0 xl:w-[700px] lg:w-[500px] h-[900px] mt-[-330px] xs:hidden lg:block"
      />
    </div>
  );
}

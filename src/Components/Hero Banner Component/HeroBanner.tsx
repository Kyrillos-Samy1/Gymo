import HeroBannerImage from "../../assets/Images/banner.png";
import Button from "../../utils/Button";
import { motion } from "framer-motion";

export default function HeroBanner() {
  const containerParent = {
    hidden: {},
    visible: {
      transition: {
        duration: 1.5,
        staggerChildren: 0.4,
        ease: "easeInOut"
      }
    }
  };

  const containerChild = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1.2,
        ease: "easeOut"
      }
    }
  };

  const containerExercise = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 0.1,
      x: 0,
      transition: {
        duration: 2,
        ease: "easeOut"
      }
    }
  };

  const imageVariant = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1.5,
        ease: "easeOut",
        delay: 2.2
      }
    }
  };

  return (
    <motion.div
      variants={containerParent}
      initial="hidden"
      animate="visible"
      className="lg:mt-[212px] xs:mt-[70px] md:ml-[50px] relative p-5 tracking-wider">
      <motion.h2
        variants={containerChild}
        className="text-[var(--primary-color)] font-semibold text-[26px]">
        Fitness Club
      </motion.h2>

      <motion.h2
        variants={containerChild}
        className="font-bold lg:text-[44px] xs:text-[40px] mb-[23px] mt-[30px]">
        Sweat, Smile <br /> And Repeat
      </motion.h2>

      <motion.p
        variants={containerChild}
        className="text-[22px] leading-[35px] mb-12">
        Check out the most effective exercises
      </motion.p>

      <motion.button
        variants={containerChild}
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
      </motion.button>

      <motion.h2
        variants={containerExercise}
        className="font-semibold text-[var(--primary-color)] opacity-10 lg:block xs:hidden text-[200px] tracking-wider">
        Exercise
      </motion.h2>

      <motion.img
        variants={imageVariant}
        initial="hidden"
        animate="visible"
        src={HeroBannerImage}
        alt="Hero Banner Image"
        className="absolute right-[40px] top-0 xl:w-[700px] lg:w-[500px] h-[900px] mt-[-330px] xs:hidden lg:block overflow-hidden"
      />
    </motion.div>
  );
}

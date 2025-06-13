import { Link } from "react-router-dom";
import Logo from "../../assets/Images/Logo-nav.png";
import { motion } from "framer-motion";

export default function Navbar({
  setIsFooterVisible
}: {
  setIsFooterVisible: (isFooterVisible: boolean) => void;
}) {
  return (
    <nav className="flex xs:gap-[60px] md:gap-[122px] xs:mt-[20px] md:mt-[32px] px-5 tracking-wider">
      <Link to="/">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex items-center justify-center md:ml-[20px] my-0 gap-5">
          {/* <h4 className="text-[var(--text-color)] font-bold text-2xl">Gymo</h4> */}
          <img
            className="w-[48px] h-[48px] outline-none focus:outline-none"
            src={Logo}
            alt="Gymo Logo"
          />
        </motion.div>
      </Link>

      <div className="flex items-center gap-[30px] text-[24px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}>
          <Link
            onClick={() => {
              setIsFooterVisible(false);
            }}
            to="/"
            className="text-[var(--text-color)] border-b-[3px] border-[var(--primary-color)] ">
            Home
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}>
          <Link
            to="/"
            onClick={() => {
              setIsFooterVisible(false);

              if (window.innerWidth < 640) {
                window.scrollTo({
                  top: 1260,
                  behavior: "smooth"
                });
              } else if (window.innerWidth >= 640 && window.innerWidth < 1024) {
                window.scrollTo({
                  top: 1220,
                  behavior: "smooth"
                });
              } else {
                window.scrollTo({
                  top: 1790,
                  behavior: "smooth"
                });
              }
            }}
            className="text-[var(--text-color)] cursor-pointer">
            Exercises
          </Link>
        </motion.div>
      </div>
    </nav>
  );
}

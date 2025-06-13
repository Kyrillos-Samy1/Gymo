import { Link } from "react-router-dom";
import "./NotFound.css";
import Button from "../../utils/Button";
import { scrollToTop } from "../../utils/utils";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <div className="not-found-container relative p-1 flex flex-col items-center justify-center h-dvh overflow-hidden">
      {/* Glowing gradient balls. */}
      <motion.div
        className="pointer-events-none absolute blur-sm w-32 h-32 rounded-full bg-gradient-to-tr from-[#EAD4DA] to-[#EAD4DA] -bottom-16 left-0 -z-10"
        animate={{
          scale: [0.8, 1, 0.8],
          opacity: [0.9, 1, 0.9],
          y: [0, -20, 0]
        }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <motion.div
        className="pointer-events-none absolute blur-sm w-96 h-96 rounded-full bg-gradient-to-br from-[#EAD4DA] to-[#EAD4DA] top-2 bottom-26 -right-28 -z-10"
        animate={{
          scale: [0.9, 1, 0.9],
          opacity: [0.8, 1, 0.8],
          x: [0, 20, 0]
        }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <motion.div
        className="pointer-events-none absolute blur-sm w-60 h-60 rounded-full bg-gradient-to-tl from-[#EAD4DA] to-[#EAD4DA] bottom-7 right-10 -z-10"
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [1, 0.8, 1],
          y: [0, 15, 0]
        }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      {/* Main content */}
      {/* Error 404. */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}>
        404
      </motion.h1>

      {/* Not Found message. */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}>
        Oops! Page Not Found
      </motion.h2>

      {/* Paragraph. */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.6 }}>
        The page you are looking for doesn&apos;t exist or has been moved.
      </motion.p>

      {/* Button to go back to home. */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.9 }}>
        <Link to="/" onClick={() => scrollToTop()} className="z-20">
          <Button
            title="Go to Home"
            type="button"
            className="mt-5 px-5 text-xl xs:py-0"
            classNameIcon="-top-[1.5px]"
          />
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;

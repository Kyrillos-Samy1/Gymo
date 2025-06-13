import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import Button from "../../utils/Button";
import { toastSuccess } from "../../utils/utils";
import { motion } from "framer-motion";

interface handleValidateProps {
  name: string;
  phone: string;
  email: string;
  message: string;
}

export default function ContactUs() {
  const contactUsFormik = useFormik({
    initialValues: { name: "", phone: "", email: "", message: "" },
    onSubmit: (values: handleValidateProps) => {
      if (values.email && values.phone && values.email && values.message) {
        toastSuccess("Message sent successfully!");
      }

      contactUsFormik.resetForm();
    }
  });

  return (
    <>
      <div className="relative overflow-hidden flex xs:flex-col lg:flex-row lg:items-start md:items-center xs:items-start justify-evenly tracking-wider xs:px-5 pb-[90px] xs:pt-[80px] lg:pt-24">
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
          className="pointer-events-none absolute blur-sm w-60 h-60 rounded-full bg-gradient-to-tl from-[#EAD4DA] to-[#EAD4DA] xs:bottom-16 md:bottom-0 right-10 -z-10"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [1, 0.8, 1],
            y: [0, 15, 0]
          }}
          transition={{ duration: 5, repeat: Infinity }}
        />

        {/* Heading & Paragraph Part. */}
        <div className="xl:w-fit lg:max-w-screen-sm md:max-w-2xl md:w-full">
          {/* Heading */}
          <motion.h2
            className="mb-3 md:text-3xl xs:text-2xl shadow-xl w-fit border-b-[3px] border-[var(--primary-color)] rounded-md p-1 pb-0"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}>
            Get in touch
          </motion.h2>

          {/* Paragraph */}
          <motion.p
            className="text-[#6e6e6e] text-lg mb-10"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}>
            Reach out to us via our contacts for <br />
            expert assistance.
          </motion.p>

          {/* Contact Info */}
          <div className="xs:mb-10 lg:mb-0 ">
            {/* Email */}
            <div className="flex items-center gap-4 mb-5">
              <motion.div
                className="md:w-16 xs:w-14 md:h-16 xs:h-14 rounded-full bg-[var(--primary-color)] flex items-center justify-center"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}>
                <MdEmail className="text-white xs:text-3xl md:text-4xl" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 1 }}>
                <h2 className="font-bold md:text-2xl xs:text-xl">Email</h2>
                <Link to="mailto:kyrillossamy@outlook.com" rel="noreferrer">
                  <h4 className="hover:text-[var(--primary-color)] text-lg hover:scale-105 transition-all duration-300 ease-in-out">
                    kyrillossamy@outlook.com
                  </h4>
                </Link>
              </motion.div>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-4 mb-5">
              <motion.div
                className="md:w-16 xs:w-14 md:h-16 xs:h-14 rounded-full bg-[var(--primary-color)] flex items-center justify-center"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 1.5 }}>
                <FaPhoneAlt className="text-white xs:text-3xl md:text-4xl" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 2.5 }}>
                <h2 className="font-bold md:text-2xl xs:text-xl">Phone</h2>
                <Link to="tel:+201271470997" rel="noreferrer">
                  <h4 className="hover:text-[var(--primary-color)] text-lg hover:scale-105 transition-all duration-300 ease-in-out">
                    +20-1271470997
                  </h4>
                </Link>
              </motion.div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-4">
              <motion.div
                className="md:w-16 xs:w-14 md:h-16 xs:h-14 rounded-full bg-[var(--primary-color)] flex items-center justify-center"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 3.5 }}>
                <MdLocationPin className="text-white xs:text-3xl md:text-[40px]" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 4.5 }}>
                <h2 className="font-bold md:text-2xl xs:text-xl">Location</h2>
                <Link
                  to="https://google.com/maps/place/Maadi+Cairo,+Egypt/"
                  rel="noreferrer"
                  target="_blank">
                  <h4 className="hover:text-[var(--primary-color)] text-lg hover:scale-105 transition-all duration-300 ease-in-out">
                    Ma'adi, Cairo, Egypt
                  </h4>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Contact Form. */}
        <motion.div
          className="shadow-2xl rounded-lg p-4 max-w-2xl w-full border-2 border-gray-300 bg-white backdrop-blur-xl"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}>
          <h2 className="md:text-3xl xs:text-2xl shadow-xl text-3xl mb-10 w-fit border-b-[3px] border-[var(--primary-color)] rounded-md p-1 pb-0 relative left-[50%] -translate-x-[50%]">
            Contact Us
          </h2>

          <form onSubmit={contactUsFormik.handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="* Your Name"
              value={contactUsFormik.values.name}
              onChange={contactUsFormik.handleChange}
              className="w-full text-md p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-gray-100"
              required
            />

            <input
              type="text"
              name="phone"
              placeholder="* Your Phone"
              onChange={(e) => {
                const onlyNums = e.target.value.replace(/\D/, "");
                contactUsFormik.setFieldValue("phone", onlyNums);
              }}
              value={contactUsFormik.values.phone}
              className="w-full text-md p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-gray-100"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="* Your Email"
              value={contactUsFormik.values.email}
              onChange={contactUsFormik.handleChange}
              className="w-full text-md p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-gray-100"
              required
            />

            <textarea
              name="message"
              placeholder="* Your Message"
              value={contactUsFormik.values.message}
              onChange={contactUsFormik.handleChange}
              className="w-full text-md p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-gray-100 resize-none"
              rows={4}
              required></textarea>

            <Button
              type="submit"
              title="Send Message"
              titleHovering="Send Message"
              className="relative left-[50%] translate-x-[-50%]"
              classNameArrows="pl-[1px] pt-[1px]"
            />
          </form>
        </motion.div>
      </div>
    </>
  );
}

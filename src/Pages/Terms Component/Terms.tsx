import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Terms_Of_Service_Data } from "../../Data/Terms_Data";

interface TermsOfServiceProps {
  companyName: string;
  effectiveDate: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
}

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.15,
      when: "beforeChildren",
      ease: "easeOut",
      duration: 0.6
    }
  }
};

const sectionVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export default function Terms({
  companyName,
  effectiveDate,
  contactEmail,
  contactPhone,
  contactAddress
}: TermsOfServiceProps) {
  return (
    <motion.main
      className="max-w-5xl md:mx-auto my-16 xs:mx-5 px-12 py-10 bg-white rounded-lg shadow-md font-sans text-[var(--text-color)] leading-relaxed"
      variants={containerVariants}
      initial="hidden"
      animate="visible">
      <motion.h1
        className="md:text-4xl xs:text-2xl font-extrabold text-[var(--primary-color)] border-b-4 border-[var(--primary-color)] pb-2 mb-8"
        variants={sectionVariants}>
        Terms of Service
      </motion.h1>

      <motion.p
        className="italic text-gray-600 font-semibold mb-10"
        variants={sectionVariants}>
        Effective Date: {effectiveDate}
      </motion.p>

      <motion.p className="mb-6" variants={sectionVariants}>
        Welcome to <strong>{companyName}</strong> (&quot;we&quot;,
        &quot;us&quot;, &quot;our&quot;). These Terms of Service
        (&quot;Terms&quot;) govern your use of our website, applications,
        products, and services (collectively, the &quot;Services&quot;). By
        accessing or using our Services, you agree to comply with and be bound
        by these Terms.
      </motion.p>

      {Terms_Of_Service_Data.map(({ id, title, content }) => (
        <motion.section key={id} className="mb-8" variants={sectionVariants}>
          <h2 className="text-[var(--primary-color)] font-bold mt-8 mb-2">
            {id}. {title}
          </h2>
          {content}
        </motion.section>
      ))}

      <motion.section variants={sectionVariants}>
        <h2 className="text-[var(--primary-color)] font-bold mt-8 mb-2">10. Contact Us</h2>
        <p>
          If you have any questions or concerns about these Terms, please
          contact us at:
        </p>
        <address className="not-italic mt-2 space-y-1">
          <div>
            <strong>Email:</strong>{" "}
            <Link
              to={`mailto:${contactEmail}`}
              className="text-[var(--primary-color)] hover:underline">
              {contactEmail}
            </Link>
          </div>
          <div>
            <strong>Phone:</strong> {contactPhone}
          </div>
          <div>
            <strong>Address:</strong> {contactAddress}
          </div>
        </address>
      </motion.section>
    </motion.main>
  );
}

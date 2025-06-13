import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { scrollToTop } from "../../utils/utils";
import { Privacy_Policy_Data } from "../../Data/Privacy_Data";

interface PrivacyPolicyProps {
  companyName: string;
  effectiveDate: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  termsOfServiceUrl: string;
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

export default function Privacy({
  companyName,
  effectiveDate,
  contactEmail,
  contactPhone,
  contactAddress,
  termsOfServiceUrl
}: PrivacyPolicyProps) {
  return (
    <motion.main
      className="max-w-5xl md:mx-auto my-16 xs:mx-5 px-12 py-10 bg-white rounded-lg shadow-md font-sans text-[var(--text-color)] leading-relaxed"
      variants={containerVariants}
      initial="hidden"
      animate="visible">
      <motion.h1
        className="md:text-4xl xs:text-2xl font-extrabold text-[var(--primary-color)] border-b-4 border-[var(--primary-color)] pb-2 mb-8"
        variants={sectionVariants}>
        Privacy Policy
      </motion.h1>

      <motion.p
        className="italic text-gray-600 font-semibold mb-10"
        variants={sectionVariants}>
        Effective Date: {effectiveDate}
      </motion.p>

      <motion.p className="mb-6" variants={sectionVariants}>
        At <strong>{companyName}</strong> (&quot;we&quot;, &quot;us&quot;,
        &quot;our&quot;), protecting your privacy is a top priority. This
        Privacy Policy explains how we collect, use, disclose, and safeguard
        your information when you visit our website, use our applications, or
        access our services (collectively, the &quot;Services&quot;).
      </motion.p>

      {Privacy_Policy_Data.map(({ id, title, content }) => (
        <motion.section key={id} className="mb-8" variants={sectionVariants}>
          <h2 className="text-[var(--primary-color)] font-bold mt-8 mb-2">
            {id}. {title}
          </h2>
          {content}
        </motion.section>
      ))}

      <motion.section variants={sectionVariants}>
        <h2 className="text-[var(--primary-color)] font-bold mt-8 mb-2">
          10. Contact Us
        </h2>
        <p>
          If you have questions or concerns about this Privacy Policy, please
          contact us:
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
          <div>
            <strong>Terms of Service:</strong>{" "}
            <Link
              to={termsOfServiceUrl}
              onClick={scrollToTop}
              className="text-[var(--primary-color)] hover:underline">
              View Terms of Service
            </Link>
          </div>
        </address>
      </motion.section>
    </motion.main>
  );
}

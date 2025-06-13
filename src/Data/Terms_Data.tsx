import { Link } from "react-router-dom";
import { scrollToTop } from "../utils/utils";

const companyName = "Gymo";
const jurisdiction = "Cairo, Egypt";
const privacyPolicyUrl = "/privacy";

export const Terms_Of_Service_Data = [
  {
    id: 1,
    title: "Acceptance of Terms",
    content: (
      <p>
        By accessing or using <strong>{companyName}</strong>'s services, you
        confirm that you are at least 18 years old or the age of majority in
        your jurisdiction. If you do not accept these terms, you must not use
        our services.
      </p>
    )
  },
  {
    id: 2,
    title: "Use of Services",
    content: (
      <>
        <p className="mb-3">
          You agree to use <strong>{companyName}</strong> only for lawful,
          fitness-related purposes and to comply with all applicable laws. You
          shall not:
        </p>
        <ul className="list-disc list-inside mb-6 space-y-1">
          <li>Violate any applicable laws or regulations;</li>
          <li>Upload offensive, misleading, or unlawful content;</li>
          <li>Attempt to disrupt or hack into our services;</li>
          <li>Use bots or automated systems without written consent.</li>
        </ul>
      </>
    )
  },
  {
    id: 3,
    title: "Account Registration",
    content: (
      <p>
        To access certain features of <strong>{companyName}</strong>, you may
        need to register an account. You agree to provide true, accurate
        information and are solely responsible for safeguarding your login
        credentials.
      </p>
    )
  },
  {
    id: 4,
    title: "Intellectual Property",
    content: (
      <p>
        All content, branding, logos, and fitness content on{" "}
        <strong>{companyName}</strong> belong to us or our licensors.
        Reproduction or distribution without express written permission is
        strictly prohibited.
      </p>
    )
  },
  {
    id: 5,
    title: "Privacy",
    content: (
      <p>
        Your use of <strong>{companyName}</strong> is subject to our{" "}
        <Link
          to={privacyPolicyUrl}
          onClick={scrollToTop}
          className="text-[var(--primary-color)] hover:underline">
          Privacy Policy
        </Link>
        , which outlines how your personal information is collected and managed.
      </p>
    )
  },
  {
    id: 6,
    title: "Termination",
    content: (
      <p>
        We reserve the right to suspend or terminate your access to{" "}
        <strong>{companyName}</strong> without prior notice if you violate these
        terms or misuse the platform in any way.
      </p>
    )
  },
  {
    id: 7,
    title: "Disclaimers and Limitation of Liability",
    content: (
      <p>
        <strong>{companyName}</strong> is provided &quot;as is&quot;. We do not
        guarantee that the services will be error-free or uninterrupted. To the
        extent permitted by law, we are not liable for damages resulting from
        your use.
      </p>
    )
  },
  {
    id: 8,
    title: "Changes to Terms",
    content: (
      <p>
        We may revise these terms at any time. Continued use of{" "}
        <strong>{companyName}</strong> indicates your agreement to the updated
        terms. Please review them regularly.
      </p>
    )
  },
  {
    id: 9,
    title: "Governing Law",
    content: (
      <p>
        These Terms are governed by the laws of <strong>{jurisdiction}</strong>.
        All legal actions shall be brought exclusively in courts located in{" "}
        <strong>{jurisdiction}</strong>.
      </p>
    )
  }
];

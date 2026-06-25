"use client"

import { LegalArticle, type LegalSection } from "./shared"

const sections: LegalSection[] = [
  {
    id: "overview",
    title: "1 · Overview",
    body: (
      <>
        <p>
          This Privacy Policy explains how Rozper, Inc. (&ldquo;Rozper,&rdquo;
          &ldquo;we,&rdquo; or &ldquo;us&rdquo;) handles personal information
          when you use our communications platform, websites, and related
          services (together, the &ldquo;Services&rdquo;).
        </p>
        <p>
          We act as a <span className="text-white">data controller</span> for
          information about visitors to our marketing site and prospects, and as
          a <span className="text-white">data processor</span> for the
          communications data our customers send through the platform on behalf
          of their end users.
        </p>
      </>
    ),
  },
  {
    id: "info-we-collect",
    title: "2 · Information we collect",
    body: (
      <>
        <p>
          We collect only what we need to operate the Services, support you,
          and meet our legal obligations. The categories below cover the full
          set.
        </p>
        <ul className="space-y-2 pl-1">
          <li>
            <span className="text-white font-medium">Account data.</span>{" "}
            Name, work email, company, role, and authentication identifiers
            when you sign up or are provisioned by an administrator.
          </li>
          <li>
            <span className="text-white font-medium">Communications data.</span>{" "}
            Call detail records, message metadata, recordings, transcripts,
            and routing information generated as you use the Services. Content
            is processed on behalf of our customers under their instructions.
          </li>
          <li>
            <span className="text-white font-medium">Usage & device data.</span>{" "}
            IP address, device identifiers, browser type, pages viewed,
            referrers, and timestamps — collected through cookies and similar
            technologies.
          </li>
          <li>
            <span className="text-white font-medium">Billing data.</span>{" "}
            Plan, invoices, and the last four digits of payment instruments.
            Full card details are handled by our PCI-compliant payment
            processor and never stored on our systems.
          </li>
          <li>
            <span className="text-white font-medium">Support data.</span>{" "}
            Messages, screen recordings, and diagnostic logs you share with our
            support and solutions teams.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "how-we-use",
    title: "3 · How we use information",
    body: (
      <>
        <p>We use personal information to:</p>
        <ul className="space-y-2 pl-1">
          <li>Provide, secure, and improve the Services.</li>
          <li>
            Authenticate users, prevent fraud, and detect abusive or unsafe
            traffic patterns on our network.
          </li>
          <li>
            Bill accurately, send service notices, and respond to your
            requests.
          </li>
          <li>
            Conduct aggregated analytics and product research. Aggregated and
            de-identified outputs are not personal information.
          </li>
          <li>
            Meet legal, regulatory, and law-enforcement obligations applicable
            to telecommunications providers.
          </li>
        </ul>
        <p>
          We do not sell personal information, and we do not use customer
          communications content to train general-purpose AI models. AI
          features that operate on customer content (transcription, agent
          assist, conversation intelligence) run inside the customer&apos;s
          tenant under their control.
        </p>
      </>
    ),
  },
  {
    id: "how-we-share",
    title: "4 · How we share information",
    body: (
      <>
        <p>
          We share personal information only in the limited circumstances
          listed here, and only with parties bound by appropriate confidentiality
          and security commitments.
        </p>
        <ul className="space-y-2 pl-1">
          <li>
            <span className="text-white font-medium">Sub-processors.</span>{" "}
            Cloud infrastructure, edge protection, payment processing, and
            other vendors that help us deliver the Services. The current list
            is maintained at{" "}
            <a
              href="/security/"
              className="text-[#22D3EE] hover:text-white transition-colors"
            >
              /security
            </a>
            .
          </li>
          <li>
            <span className="text-white font-medium">Customers.</span>{" "}
            If you are an end user, your administrator may receive activity
            and usage data under their organisation&apos;s account.
          </li>
          <li>
            <span className="text-white font-medium">
              Legal & regulatory requests.
            </span>{" "}
            We respond to lawful subpoenas, court orders, and equivalent
            telecommunications-regulator demands. Where permitted, we notify
            affected customers first.
          </li>
          <li>
            <span className="text-white font-medium">Corporate events.</span>{" "}
            In the case of a merger, acquisition, financing, or asset sale,
            information may transfer under equivalent protections.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "cookies",
    title: "5 · Cookies and similar technologies",
    body: (
      <>
        <p>
          We use a small set of cookies to keep you signed in, remember your
          preferences, and measure how the marketing site performs. You can
          control non-essential cookies through the banner shown on your first
          visit, and update your choices from the footer at any time.
        </p>
        <p>
          We do not use cross-site advertising cookies on the platform itself.
          Embedded recordings or transcripts inside the application do not
          carry tracking pixels.
        </p>
      </>
    ),
  },
  {
    id: "international-transfers",
    title: "6 · International transfers",
    body: (
      <>
        <p>
          Rozper operates regional points-of-presence in the United States,
          European Union, and Asia-Pacific. Customers can pin their tenant to
          a specific region; that pinning is enforced at the storage layer.
        </p>
        <p>
          Where data must cross borders — for example for global support — we
          rely on Standard Contractual Clauses, the UK International Data
          Transfer Addendum, or other recognised safeguards under applicable
          law.
        </p>
      </>
    ),
  },
  {
    id: "your-rights",
    title: "7 · Your rights",
    body: (
      <>
        <p>
          Depending on where you live, you may have the right to access,
          correct, delete, restrict, or port your personal information, and to
          object to certain processing. To exercise a right, email{" "}
          <a
            href="mailto:privacy@rozper.com"
            className="text-[#22D3EE] hover:text-white transition-colors"
          >
            privacy@rozper.com
          </a>
          . If you are an end user of a customer&apos;s account, please direct
          your request to that customer first; we will assist them in
          responding.
        </p>
        <p>
          You can also lodge a complaint with the data-protection authority in
          your region. We&apos;d appreciate the chance to address your
          concerns first.
        </p>
      </>
    ),
  },
  {
    id: "retention",
    title: "8 · Data retention",
    body: (
      <>
        <p>
          We retain personal information only as long as needed to provide the
          Services, comply with our legal obligations, resolve disputes, and
          enforce our agreements. Customer-controlled content follows the
          retention rules set by the customer administrator.
        </p>
        <p>
          When data is no longer needed, we delete it or de-identify it using
          industry-standard methods.
        </p>
      </>
    ),
  },
  {
    id: "children",
    title: "9 · Children",
    body: (
      <>
        <p>
          The Services are not directed to children under 16, and we do not
          knowingly collect personal information from children. If you believe
          a child has provided us with personal information, contact{" "}
          <a
            href="mailto:privacy@rozper.com"
            className="text-[#22D3EE] hover:text-white transition-colors"
          >
            privacy@rozper.com
          </a>{" "}
          and we will delete it.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    title: "10 · Changes to this policy",
    body: (
      <>
        <p>
          We may update this Privacy Policy from time to time. When we make
          material changes, we will let active customers know at least 30 days
          before they take effect — through the product, email, or both — and
          update the &ldquo;last updated&rdquo; date at the top of this page.
        </p>
      </>
    ),
  },
  {
    id: "contact",
    title: "11 · Contact us",
    body: (
      <>
        <p>
          Questions, complaints, or requests can be sent to our privacy team
          at{" "}
          <a
            href="mailto:privacy@rozper.com"
            className="text-[#22D3EE] hover:text-white transition-colors"
          >
            privacy@rozper.com
          </a>
          . For postal correspondence: Rozper, Inc., Attn: Privacy, 548
          Market Street, PMB 41255, San Francisco, CA 94104, USA.
        </p>
        <p>
          Our EU representative under Article 27 GDPR can be reached at{" "}
          <a
            href="mailto:eu-rep@rozper.com"
            className="text-[#22D3EE] hover:text-white transition-colors"
          >
            eu-rep@rozper.com
          </a>
          .
        </p>
      </>
    ),
  },
]

export function PrivacyContent() {
  return <LegalArticle sections={sections} />
}

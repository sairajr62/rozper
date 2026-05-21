"use client"

import { LegalArticle, type LegalSection } from "./shared"

const sections: LegalSection[] = [
  {
    id: "acceptance",
    title: "1 · Acceptance of terms",
    body: (
      <>
        <p>
          These Terms of Service (&ldquo;Terms&rdquo;) form a binding agreement
          between you and Rozper, Inc. (&ldquo;Rozper&rdquo;) covering your use
          of the Rozper communications platform and related services
          (&ldquo;Services&rdquo;). By creating an account, signing an order
          form, or using the Services, you agree to these Terms.
        </p>
        <p>
          If you are accepting on behalf of an organisation, you confirm you
          have authority to bind it. Where a signed order form or Master
          Services Agreement exists between Rozper and your organisation, that
          document controls in the event of conflict.
        </p>
      </>
    ),
  },
  {
    id: "account",
    title: "2 · Your account",
    body: (
      <>
        <p>
          You are responsible for keeping account credentials secure, for the
          accuracy of the information you provide, and for activity that
          occurs under your account. Notify us promptly at{" "}
          <a
            href="mailto:security@rozper.com"
            className="text-[#22D3EE] hover:text-white transition-colors"
          >
            security@rozper.com
          </a>{" "}
          if you suspect unauthorised use.
        </p>
        <p>
          Administrators may provision users, set roles, and configure
          policies on behalf of their organisation. End users with questions
          about their data should contact their administrator first.
        </p>
      </>
    ),
  },
  {
    id: "acceptable-use",
    title: "3 · Acceptable use",
    body: (
      <>
        <p>You agree not to use the Services to:</p>
        <ul className="space-y-2 pl-1">
          <li>
            Send unlawful, harassing, or fraudulent communications, including
            unsolicited bulk traffic that violates anti-spam or
            telecommunications laws.
          </li>
          <li>
            Interfere with the operation of the network, evade rate limits, or
            attempt to access tenants that are not yours.
          </li>
          <li>
            Distribute malware, run denial-of-service attacks, or use the
            platform to facilitate illegal activity.
          </li>
          <li>
            Resell or rebadge the Services outside the scope of a written
            partner agreement.
          </li>
        </ul>
        <p>
          We may suspend traffic patterns that appear to violate this section
          while we investigate. We&apos;ll contact your account team as soon
          as practicable.
        </p>
      </>
    ),
  },
  {
    id: "fees",
    title: "4 · Fees and payment",
    body: (
      <>
        <p>
          Fees are described in your order form, the published pricing pages,
          or in-product checkout flows. Usage-based charges accrue on a daily
          rolling basis and invoice at the end of each billing cycle.
        </p>
        <p>
          Invoices are due within 30 days of issue unless otherwise stated.
          Late amounts may accrue interest at the lower of 1.5% per month or
          the maximum permitted by law. Disputed charges should be raised in
          good faith within 30 days, and we will work with you to resolve them
          quickly.
        </p>
        <p>
          All fees are exclusive of applicable taxes and regulatory surcharges,
          which we may itemise on your invoice.
        </p>
      </>
    ),
  },
  {
    id: "customer-data",
    title: "5 · Customer data and AI features",
    body: (
      <>
        <p>
          You retain all rights in the content you and your users send through
          the Services (&ldquo;Customer Data&rdquo;). You grant Rozper a
          limited licence to host, process, and route that Customer Data only
          as needed to operate the Services and as instructed by you.
        </p>
        <p>
          AI features that operate on Customer Data — including transcription,
          agent assist, conversation intelligence, and the AI Receptionist —
          run inside your tenant under your control. Customer Data is not
          used to train general-purpose models.
        </p>
        <p>
          A Data Processing Addendum is available on request through{" "}
          <a
            href="mailto:legal@rozper.com"
            className="text-[#22D3EE] hover:text-white transition-colors"
          >
            legal@rozper.com
          </a>{" "}
          for customers subject to GDPR or equivalent laws, and is incorporated
          by reference when executed.
        </p>
      </>
    ),
  },
  {
    id: "service-levels",
    title: "6 · Service levels and changes",
    body: (
      <>
        <p>
          We work hard to keep the Services available and to communicate
          changes clearly. Our 99.99% availability commitment, related service
          credits, and excluded events are published in the Service Level
          Agreement linked from your order form.
        </p>
        <p>
          We may add features, modify the platform, or deprecate functionality
          to improve security, performance, or compliance. Material reductions
          in functionality are announced at least 90 days in advance for
          paying customers.
        </p>
      </>
    ),
  },
  {
    id: "ip",
    title: "7 · Intellectual property",
    body: (
      <>
        <p>
          Rozper and its licensors own all rights in the Services, including
          the platform, documentation, and brand. We grant you a non-exclusive,
          non-transferable right to use the Services during the term of your
          subscription, subject to these Terms.
        </p>
        <p>
          Feedback you provide is gratefully received; you grant Rozper a
          royalty-free licence to use it without obligation. We will not
          identify you by name in connection with feedback without your prior
          consent.
        </p>
      </>
    ),
  },
  {
    id: "confidentiality",
    title: "8 · Confidentiality",
    body: (
      <>
        <p>
          Each party will protect the other&apos;s confidential information
          with the same care it uses for its own, and not less than a
          reasonable standard. Confidential information may be disclosed when
          required by law, after notifying the other party where permitted.
        </p>
      </>
    ),
  },
  {
    id: "term",
    title: "9 · Term and termination",
    body: (
      <>
        <p>
          These Terms apply for as long as you use the Services. Subscription
          terms and renewal dates are set out in your order form. Either party
          may terminate for material breach not cured within 30 days of written
          notice.
        </p>
        <p>
          On termination, you may export Customer Data for 30 days. After that
          window, we will delete or de-identify Customer Data on the schedule
          described in our Data Processing Addendum.
        </p>
      </>
    ),
  },
  {
    id: "warranty",
    title: "10 · Warranties and disclaimers",
    body: (
      <>
        <p>
          We warrant that the Services will perform materially in accordance
          with the published documentation, and that we will provide them with
          reasonable care and skill.
        </p>
        <p>
          Other than as expressly stated, the Services are provided
          &ldquo;as is&rdquo; without warranties of any kind. To the maximum
          extent permitted by law, we disclaim implied warranties of
          merchantability, fitness for a particular purpose, and non-infringement.
        </p>
      </>
    ),
  },
  {
    id: "liability",
    title: "11 · Limitation of liability",
    body: (
      <>
        <p>
          To the maximum extent permitted by law, neither party will be liable
          for indirect, incidental, special, consequential, or punitive
          damages, or for loss of profits, revenue, or data — even if advised
          of the possibility.
        </p>
        <p>
          Each party&apos;s total cumulative liability arising out of or
          related to these Terms will not exceed the fees paid by you to
          Rozper in the 12 months preceding the event giving rise to the
          claim. Nothing in this section limits liability that cannot be
          excluded under applicable law.
        </p>
      </>
    ),
  },
  {
    id: "indemnification",
    title: "12 · Indemnification",
    body: (
      <>
        <p>
          You agree to indemnify Rozper against third-party claims arising
          from your Customer Data, your end users, or your breach of these
          Terms. Rozper will indemnify you against third-party claims that
          the Services, used as permitted, infringe a registered patent,
          copyright, or trademark — subject to the standard process of
          prompt notice, exclusive control of the defence, and reasonable
          cooperation.
        </p>
      </>
    ),
  },
  {
    id: "governing-law",
    title: "13 · Governing law and venue",
    body: (
      <>
        <p>
          These Terms are governed by the laws of the State of Delaware,
          without regard to its conflict-of-laws rules. The exclusive venue
          for disputes is the state and federal courts located in Wilmington,
          Delaware, and each party consents to personal jurisdiction there.
        </p>
        <p>
          Customers outside the United States may have additional, non-waivable
          rights under local law. Those rights are unaffected by this section.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    title: "14 · Changes to these Terms",
    body: (
      <>
        <p>
          We may update these Terms from time to time. For material changes
          we will give active customers at least 30 days&apos; notice through
          the product, email, or both. Continued use of the Services after
          the effective date constitutes acceptance.
        </p>
      </>
    ),
  },
  {
    id: "contact",
    title: "15 · Contact us",
    body: (
      <>
        <p>
          Questions about these Terms can be directed to{" "}
          <a
            href="mailto:legal@rozper.com"
            className="text-[#22D3EE] hover:text-white transition-colors"
          >
            legal@rozper.com
          </a>
          . Postal address: Rozper, Inc., Attn: Legal, 548 Market Street, PMB
          41255, San Francisco, CA 94104, USA.
        </p>
      </>
    ),
  },
]

export function TermsContent() {
  return <LegalArticle sections={sections} />
}

import { Email, InlineLink, LegalPage, List, Section } from '../components/LegalPage';

export const metadata = {
  title: 'Terms and Conditions',
  description: 'The terms that apply when you use bharatchandra.me, the personal portfolio of Bodapati Bharat Chandra.',
  alternates: { canonical: 'https://bharatchandra.me/terms' },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms and Conditions"
      intro="These terms apply when you use bharatchandra.me, the personal portfolio of Bodapati Bharat Chandra, an individual based in Hyderabad, Telangana, India. By using the site, you agree to them. If you do not agree, please do not use the site."
    >
      <Section title="1. What this site is">
        <p>
          This site presents my work, projects, writing, and contact details. It does not sell goods or services, and it
          does not require an account. A message through the site does not create a contract, an employment offer, or a
          client relationship. Any such arrangement needs a separate written agreement.
        </p>
      </Section>

      <Section title="2. Using the site">
        <p>You may browse, read, and share links to the site for lawful purposes. You agree not to:</p>
        <List>
          <li>Attack, overload, probe, or try to gain unauthorised access to the site or its systems.</li>
          <li>Use the contact form to send spam, malware, unlawful content, or someone else&apos;s details without permission.</li>
          <li>Use my name, photos, or work to impersonate me or to suggest that I endorse something.</li>
          <li>Use the site in a way that breaks any applicable law, including the Information Technology Act, 2000.</li>
        </List>
      </Section>

      <Section title="3. Content and ownership">
        <List>
          <li>Unless stated otherwise, the writing, photos, and design on this site belong to me. You may quote short extracts with credit and a link. Please ask before republishing anything else.</li>
          <li>The source code of this site and my public projects are licensed as stated in their own GitHub repositories. Those licences apply to that code.</li>
          <li>Client names, company names, and trademarks belong to their owners. They appear only to describe work or experience, and do not imply endorsement.</li>
        </List>
      </Section>

      <Section title="4. Accuracy of information">
        <p>
          I try to keep the site accurate and up to date, but it may contain errors or become outdated. Project results and
          rankings describe the conditions when they were measured and may change. Technical articles are my own
          experience, not professional, legal, medical, or financial advice. Check anything important before relying on it.
        </p>
      </Section>

      <Section title="5. Linked sites and projects">
        <p>
          The site links to third-party sites and to separate projects, such as GitHub repositories and live demos. They have their
          own terms and policies. I am not responsible for third-party sites, and demos are shown for illustration only
          unless a separate agreement says otherwise.
        </p>
      </Section>

      <Section title="6. Disclaimer and limitation of liability">
        <p>
          The site is provided free of charge, &quot;as is&quot; and &quot;as available&quot;, without warranties of any kind, to the
          extent the law permits. I do not promise that it will always be available or free of errors. To the extent the
          law permits, I am not liable for indirect or consequential loss, or for loss arising from your use of the site or
          reliance on its content.
        </p>
        <p>
          Nothing in these terms removes rights that cannot legally be excluded, including rights under the Consumer
          Protection Act, 2019 of India or the mandatory consumer laws of the country where you live, or liability
          that cannot be limited by law.
        </p>
      </Section>

      <Section title="7. Privacy">
        <p>
          The <InlineLink href="/privacy">Privacy Policy</InlineLink> explains how personal data is handled.
        </p>
      </Section>

      <Section title="8. Governing law">
        <p>
          These terms are governed by the laws of India. Subject to any mandatory rights you have where you live, the
          courts at Hyderabad, Telangana have jurisdiction over disputes about them. Please contact me first, as most
          issues can be resolved directly.
        </p>
      </Section>

      <Section title="9. Changes and general terms">
        <p>
          I may update these terms or change the site at any time. The date at the top shows the latest version, and using
          the site after a change means you accept it. If part of these terms is found unenforceable, the rest still applies.
        </p>
      </Section>

      <Section title="10. Contact and grievances">
        <p>
          Questions or complaints about the site or its content: Bodapati Bharat Chandra (Grievance Officer), Hyderabad,
          Telangana, India. Email: <Email />. Grievances are addressed within one month.
        </p>
      </Section>
    </LegalPage>
  );
}

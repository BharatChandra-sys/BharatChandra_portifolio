import { Email, InlineLink, LegalPage, List, Section } from '../components/LegalPage';

export const metadata = {
  title: 'Privacy Policy',
  description: 'How bharatchandra.me collects, uses and protects personal data, and the rights you have over it.',
  alternates: { canonical: 'https://bharatchandra.me/privacy' },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="This site is my personal portfolio. It collects very little personal data. This policy explains what is collected, why, who receives it, and the rights you have."
    >
      <Section title="1. Who is responsible for your data">
        <p>
          Bodapati Bharat Chandra, an individual based in Hyderabad, Telangana, India, runs bharatchandra.me and decides
          how personal data is used here. In legal terms I am the data fiduciary under Indian law and the controller
          under the GDPR. Contact: <Email />.
        </p>
      </Section>

      <Section title="2. What I collect and why">
        <p><strong className="text-primary/90">When you use the contact form:</strong></p>
        <List>
          <li>Your name, email address, and message.</li>
          <li>Used only to read and reply to your message, and to send you one confirmation email.</li>
          <li>Sharing this is voluntary. Without it I cannot reply to you, but the rest of the site works normally.</li>
        </List>
        <p><strong className="text-primary/90">When you visit any page:</strong></p>
        <List>
          <li>Technical data such as your IP address, browser type, the page requested, and the time of the request.</li>
          <li>Used to deliver the site, keep it secure, and limit abuse of the contact form.</li>
        </List>
        <p><strong className="text-primary/90">If you accept analytics cookies:</strong></p>
        <List>
          <li>Google Analytics records how the site is used, such as pages viewed, approximate location, device type, and how the site performs.</li>
          <li>It only runs if you choose Accept. Declining changes nothing else on the site.</li>
        </List>
        <p>
          Please do not send passwords, financial details, health information, or other sensitive personal data through
          the form. I do not ask for it.
        </p>
      </Section>

      <Section title="3. Legal basis">
        <List>
          <li><strong className="text-primary/90">India:</strong> data you voluntarily provide for a specified purpose (Digital Personal Data Protection Act, 2023, section 7(a)), and consent for analytics. I also follow the Information Technology Act, 2000 and the SPDI Rules, 2011 while they remain in force.</li>
          <li><strong className="text-primary/90">EU and UK:</strong> legitimate interests in replying to enquiries and keeping the site secure (GDPR Article 6(1)(f)), steps you request before a possible contract (Article 6(1)(b)), and consent for analytics (Article 6(1)(a)).</li>
        </List>
      </Section>

      <Section title="4. Cookies and local storage">
        <List>
          <li><strong className="text-primary/90">Necessary:</strong> your browser stores your theme and your analytics choice. These do not identify you, and they stay on your device.</li>
          <li><strong className="text-primary/90">Analytics (optional):</strong> Google Analytics cookies, set only after you accept. You can change your mind at any time using Cookie settings in the site footer, when analytics is enabled.</li>
        </List>
      </Section>

      <Section title="5. Who receives your data">
        <p>I do not sell your personal data, share it for advertising, or use it to train AI models. It is only handled by:</p>
        <List>
          <li><strong className="text-primary/90">Vercel</strong>: hosts the site and processes request data.</li>
          <li><strong className="text-primary/90">Brevo</strong>: delivers contact form emails.</li>
          <li><strong className="text-primary/90">Google</strong>: email inbox where messages arrive, and Google Analytics if you accept it.</li>
          <li><strong className="text-primary/90">Authorities</strong>: only where the law requires it.</li>
        </List>
        <p>
          Links to sites such as GitHub, LinkedIn, and Medium, and to projects, leave this site. Their own privacy policies apply.
        </p>
      </Section>

      <Section title="6. International transfers">
        <p>
          These providers may process data outside your country, including in India, the European Union, and the United
          States. Indian law allows this except to any country the Government restricts. For data from the EU or UK, I rely on the
          safeguards these providers offer, such as Standard Contractual Clauses or an adequacy decision where one applies.
          You can ask me for details of these safeguards.
        </p>
      </Section>

      <Section title="7. How long I keep it">
        <List>
          <li>Contact messages: up to 24 months after our last exchange, then deleted, unless the law requires me to keep them longer or you ask me to delete them sooner.</li>
          <li>Contact form rate-limit records: held briefly in server memory, for about 10 minutes.</li>
          <li>Hosting logs, email delivery records, and analytics data: kept for the periods set by each provider.</li>
        </List>
      </Section>

      <Section title="8. Your rights">
        <p>To use any of these rights, email <Email />. I may need to confirm it is you. I aim to respond within one month, and it is free.</p>
        <List>
          <li><strong className="text-primary/90">India:</strong> access a summary of your data and who received it, correct, complete, update, or erase it, withdraw consent, get grievances resolved, and nominate someone to exercise your rights if you die or become incapacitated.</li>
          <li><strong className="text-primary/90">EU and UK:</strong> access, correct, or erase your data, restrict or object to its use, receive a portable copy, withdraw consent at any time, and complain to your data protection authority.</li>
          <li><strong className="text-primary/90">California and similar US state laws:</strong> know what is collected, and ask to delete or correct it, without discrimination for doing so. I do not sell or share personal data as those laws define it.</li>
        </List>
        <p>Withdrawing consent does not affect anything done lawfully before you withdrew it.</p>
      </Section>

      <Section title="9. Grievance Officer">
        <p>
          Bodapati Bharat Chandra, Hyderabad, Telangana, India. Email: <Email />. Grievances are addressed within one month.
          If you are in India and are not satisfied with the outcome, you may approach the Data Protection Board of India
          once the relevant provisions apply.
        </p>
      </Section>

      <Section title="10. Children">
        <p>
          This site is for professional contact and is not aimed at children. If you are under 18, please ask a parent or
          guardian before using the contact form. If you believe a child has sent me personal data without that permission,
          contact me and I will delete it. I do not track or target children.
        </p>
      </Section>

      <Section title="11. Security and automated decisions">
        <p>
          The site uses HTTPS, security headers, and limits on contact form use, and access to messages is restricted to me. No system is
          perfectly secure. If a breach affects you, I will notify you and the authorities where the law requires it. No
          decisions with legal or similar effects are made about you by automated means.
        </p>
      </Section>

      <Section title="12. Changes">
        <p>
          I may update this policy as the site or the law changes. The date at the top shows the latest version. See also the{' '}
          <InlineLink href="/terms">Terms and Conditions</InlineLink>.
        </p>
      </Section>
    </LegalPage>
  );
}

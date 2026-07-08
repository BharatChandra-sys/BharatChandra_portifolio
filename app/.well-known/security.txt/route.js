// Security.txt - RFC 9116 compliant
// Helps security researchers report vulnerabilities

const securityTxt = `Contact: mailto:bc833498@gmail.com
Expires: 2027-12-31T23:59:59.000Z
Preferred-Languages: en, hi, te
Canonical: https://bharatchandra.me/.well-known/security.txt
Acknowledgments: https://bharatchandra.me/thanks

# Security Policy

If you discover a security vulnerability, please email bc833498@gmail.com
with details. I will respond within 48 hours.

# Scope
In scope:
- XSS vulnerabilities
- CSRF issues
- Authentication bypasses
- Data leakage

Out of scope:
- Social engineering
- Physical attacks
- DDoS attacks

# Safe Harbor
I support responsible disclosure. Researchers who report issues in good faith
will not face legal action.
`;

export async function GET() {
  return new Response(securityTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400'
    }
  });
}

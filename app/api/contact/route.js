import { NextResponse } from 'next/server';

const BREVO_ENDPOINT = 'https://api.brevo.com/v3/smtp/email';
const SENDER_EMAIL   = 'bharat.833498@gmail.com';
const SENDER_NAME    = 'Bharat Chandra';

async function sendEmail(payload) {
    const res = await fetch(BREVO_ENDPOINT, {
        method: 'POST',
        headers: {
            'accept':       'application/json',
            'api-key':      process.env.BREVO_API_KEY,
            'content-type': 'application/json',
        },
        body: JSON.stringify(payload),
    });
    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || `Brevo ${res.status}`);
    }
    return res.json();
}

// ─── Email to Bharat (owner notification) ────────────────────────────────────
function buildOwnerHtml(name, email, message) {
    const escaped = message.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>
<body style="margin:0;padding:0;background:#ffffff;font-family:Arial,sans-serif;font-size:15px;color:#111111;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;">
  <tr>
    <td align="center" style="padding:40px 20px;">
    <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

      <!-- Header -->
      <tr>
        <td style="padding-bottom:24px;border-bottom:2px solid #111111;">
          <p style="margin:0;font-size:13px;color:#555555;letter-spacing:0.5px;text-transform:uppercase;">bharatchandra.me &nbsp;·&nbsp; Contact Form</p>
        </td>
      </tr>

      <!-- Subject -->
      <tr>
        <td style="padding:28px 0 8px;">
          <h2 style="margin:0;font-size:20px;font-weight:700;color:#111111;line-height:1.3;">New message from ${name}</h2>
          <p style="margin:6px 0 0;font-size:13px;color:#777777;">${email}</p>
        </td>
      </tr>

      <!-- Divider -->
      <tr><td style="padding:4px 0 20px;"><div style="height:1px;background:#eeeeee;"></div></td></tr>

      <!-- Body -->
      <tr>
        <td style="line-height:1.75;color:#222222;">
          <p style="margin:0 0 14px;">Hi Bharat,</p>
          <p style="margin:0 0 14px;">Someone reached out through your portfolio. Here are the details:</p>
        </td>
      </tr>

      <!-- Details table -->
      <tr>
        <td style="background:#f7f7f7;border-radius:4px;padding:18px 20px 14px;margin-bottom:24px;">
          <table cellpadding="0" cellspacing="0" style="width:100%;font-size:14px;color:#222222;">
            <tr>
              <td style="padding:5px 0;color:#777777;width:80px;">Name</td>
              <td style="padding:5px 0;font-weight:600;">${name}</td>
            </tr>
            <tr>
              <td style="padding:5px 0;color:#777777;">Email</td>
              <td style="padding:5px 0;">${email}</td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Message -->
      <tr><td style="padding:20px 0 0;"><p style="margin:0 0 10px;font-size:12px;font-weight:700;color:#555555;text-transform:uppercase;letter-spacing:0.8px;">Their message</p></td></tr>
      <tr>
        <td style="background:#f7f7f7;border-radius:4px;padding:18px 20px;border-left:3px solid #111111;">
          <p style="margin:0;font-size:14px;color:#222222;line-height:1.8;white-space:pre-wrap;">${escaped}</p>
        </td>
      </tr>

      <!-- CTA -->
      <tr>
        <td style="padding:28px 0;">
          <a href="mailto:${email}?subject=Re: Your message on bharatchandra.me&body=Hi ${name},%0A%0A"
             style="display:inline-block;background:#111111;color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;padding:13px 28px;border-radius:4px;letter-spacing:0.2px;">
            Reply to ${name} &rarr;
          </a>
        </td>
      </tr>

      <!-- Closing -->
      <tr>
        <td style="padding:0 0 0;line-height:1.75;color:#222222;">
          <p style="margin:0;">— Portfolio Contact System<br/>
          <span style="color:#777777;font-size:13px;">bharatchandra.me</span></p>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="padding:28px 0 0;border-top:1px solid #eeeeee;margin-top:28px;">
          <p style="margin:20px 0 0;font-size:12px;color:#aaaaaa;line-height:1.6;">
            Sent via the contact form at bharatchandra.me. Hit reply or use the button above to respond directly to ${name}.
          </p>
        </td>
      </tr>

    </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}

// ─── Email to the user (thank-you / confirmation) ────────────────────────────
function buildUserHtml(name, message) {
    const escaped = message.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>
<body style="margin:0;padding:0;background:#ffffff;font-family:Arial,sans-serif;font-size:15px;color:#111111;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;">
  <tr>
    <td align="center" style="padding:40px 20px;">
    <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

      <!-- Header -->
      <tr>
        <td style="padding-bottom:24px;border-bottom:2px solid #111111;">
          <p style="margin:0;font-size:13px;color:#555555;letter-spacing:0.5px;text-transform:uppercase;">Bharat Chandra &nbsp;·&nbsp; bharatchandra.me</p>
        </td>
      </tr>

      <!-- Subject -->
      <tr>
        <td style="padding:28px 0 8px;">
          <h2 style="margin:0;font-size:20px;font-weight:700;color:#111111;line-height:1.3;">Got your message, ${name}.</h2>
          <p style="margin:6px 0 0;font-size:13px;color:#777777;">I'll get back to you within 24 hours.</p>
        </td>
      </tr>

      <!-- Divider -->
      <tr><td style="padding:4px 0 20px;"><div style="height:1px;background:#eeeeee;"></div></td></tr>

      <!-- Body -->
      <tr>
        <td style="line-height:1.75;color:#222222;">
          <p style="margin:0 0 14px;">Hi ${name},</p>
          <p style="margin:0 0 14px;">Thanks for reaching out — I received your message and will get back to you personally. I read every message myself, so you'll hear from me directly, not an assistant.</p>
          <p style="margin:0 0 20px;">If it's urgent, just reply to this email.</p>
        </td>
      </tr>

      <!-- Message recap -->
      <tr><td style="padding:0 0 10px;"><p style="margin:0;font-size:12px;font-weight:700;color:#555555;text-transform:uppercase;letter-spacing:0.8px;">Your message</p></td></tr>
      <tr>
        <td style="background:#f7f7f7;border-radius:4px;padding:18px 20px;border-left:3px solid #111111;margin-bottom:28px;">
          <p style="margin:0;font-size:14px;color:#444444;line-height:1.8;white-space:pre-wrap;">${escaped}</p>
        </td>
      </tr>

      <!-- Quick links -->
      <tr>
        <td style="padding:28px 0 0;">
          <table cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding-right:10px;">
                <a href="https://github.com/BharatChandra-sys"
                   style="display:inline-block;background:#111111;color:#ffffff;text-decoration:none;font-size:13px;font-weight:600;padding:11px 22px;border-radius:4px;letter-spacing:0.2px;">
                  GitHub
                </a>
              </td>
              <td style="padding-right:10px;">
                <a href="https://www.linkedin.com/in/bharat-chandra-bodapati/"
                   style="display:inline-block;background:#ffffff;color:#111111;text-decoration:none;font-size:13px;font-weight:600;padding:11px 22px;border-radius:4px;letter-spacing:0.2px;border:1px solid #dddddd;">
                  LinkedIn
                </a>
              </td>
              <td>
                <a href="https://bharatchandra.me/assets/resume.pdf"
                   style="display:inline-block;background:#ffffff;color:#111111;text-decoration:none;font-size:13px;font-weight:600;padding:11px 22px;border-radius:4px;letter-spacing:0.2px;border:1px solid #dddddd;">
                  Download CV
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Closing -->
      <tr>
        <td style="padding:28px 0 0;line-height:1.75;color:#222222;">
          <p style="margin:0;">Talk soon,<br/>
          <strong>Bharat Chandra</strong><br/>
          <span style="color:#777777;font-size:13px;">AI/ML Engineer &mdash; GITAM University Hyderabad</span></p>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="padding:28px 0 0;border-top:1px solid #eeeeee;margin-top:28px;">
          <p style="margin:20px 0 0;font-size:12px;color:#aaaaaa;line-height:1.6;">
            You're receiving this because you submitted the contact form at <a href="https://bharatchandra.me" style="color:#aaaaaa;">bharatchandra.me</a>. No mailing lists, no follow-ups — just a reply to your message.
          </p>
        </td>
      </tr>

    </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}

// ─── Plain text fallbacks ─────────────────────────────────────────────────────
function buildOwnerText(name, email, message) {
    return `New message from ${name} (${email}) via bharatchandra.me\n\n${message}\n\n---\nReply directly to: ${email}`;
}

function buildUserText(name, message) {
    return `Hi ${name},\n\nGot your message — I'll get back to you within 24 hours.\n\nYour message:\n${message}\n\n---\nBharat Chandra\nbharatchandra.me`;
}

// ─── Route handler ────────────────────────────────────────────────────────────
export async function POST(request) {
    try {
        const { name, email, message } = await request.json();

        if (!name?.trim() || !email?.trim() || !message?.trim()) {
            return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
        }
        if (!process.env.BREVO_API_KEY) {
            console.error('[Contact] BREVO_API_KEY missing');
            return NextResponse.json({ error: 'Email service not configured.' }, { status: 500 });
        }

        const OWNER_EMAIL = process.env.OWNER_EMAIL || 'bc833498@gmail.com';

        await Promise.all([
            // 1. Notification to Bharat
            sendEmail({
                sender:      { name: 'Portfolio Contact', email: SENDER_EMAIL },
                to:          [{ email: OWNER_EMAIL, name: SENDER_NAME }],
                replyTo:     { email, name },
                subject:     `${name} reached out via bharatchandra.me`,
                htmlContent: buildOwnerHtml(name, email, message),
                textContent: buildOwnerText(name, email, message),
            }),
            // 2. Thank-you to the user
            sendEmail({
                sender:      { name: SENDER_NAME, email: SENDER_EMAIL },
                to:          [{ email, name }],
                subject:     `Got your message — Bharat Chandra`,
                htmlContent: buildUserHtml(name, message),
                textContent: buildUserText(name, message),
            }),
        ]);

        return NextResponse.json({ success: true });

    } catch (err) {
        console.error('[Contact API]', err.message);
        return NextResponse.json(
            { error: 'Could not send your message. Please try again.' },
            { status: 500 }
        );
    }
}

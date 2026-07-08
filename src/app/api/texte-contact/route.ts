import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, textart, message } = body;

    if (!name || !email) {
      return NextResponse.json({ error: "Name und E-Mail sind Pflichtfelder." }, { status: 400 });
    }

    const resendKey = process.env.RESEND_API_KEY;
    if (!resendKey) {
      console.error("RESEND_API_KEY not set");
      return NextResponse.json({ error: "Konfigurationsfehler" }, { status: 500 });
    }

    const toEmail = process.env.CONTACT_EMAIL || "info@seoforge.de";

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9fafb; padding: 32px; border-radius: 8px;">
        <div style="background: #0f172a; padding: 24px 28px; border-radius: 8px; margin-bottom: 28px;">
          <p style="color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 6px;">seoforge.de</p>
          <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 700;">Anfrage: SEO-Texte</h1>
        </div>

        <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; margin-bottom: 24px;">
          <p style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.8px; margin: 0; padding: 14px 20px; font-weight: 600; border-bottom: 1px solid #f3f4f6; background: #f9fafb;">Kontaktdaten</p>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #f3f4f6;">
              <td style="padding: 12px 20px; color: #9ca3af; font-size: 13px; width: 110px;">Name</td>
              <td style="padding: 12px 20px; color: #111827; font-size: 14px; font-weight: 600;">${name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f3f4f6;">
              <td style="padding: 12px 20px; color: #9ca3af; font-size: 13px;">E-Mail</td>
              <td style="padding: 12px 20px; font-size: 14px;"><a href="mailto:${email}" style="color: #0891b2;">${email}</a></td>
            </tr>
            ${phone ? `<tr style="border-bottom: 1px solid #f3f4f6;"><td style="padding: 12px 20px; color: #9ca3af; font-size: 13px;">Telefon</td><td style="padding: 12px 20px; color: #111827; font-size: 14px;">${phone}</td></tr>` : ""}
            ${textart ? `<tr><td style="padding: 12px 20px; color: #9ca3af; font-size: 13px;">Textart</td><td style="padding: 12px 20px; color: #111827; font-size: 14px; font-weight: 600;">${textart}</td></tr>` : ""}
          </table>
        </div>

        ${message ? `
        <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; margin-bottom: 28px;">
          <p style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.8px; margin: 0; padding: 14px 20px; font-weight: 600; border-bottom: 1px solid #f3f4f6; background: #f9fafb;">Projektbeschreibung</p>
          <p style="color: #374151; font-size: 14px; line-height: 1.7; margin: 0; padding: 16px 20px; white-space: pre-wrap;">${message}</p>
        </div>` : ""}

        <div style="text-align: center;">
          <a href="mailto:${email}" style="display: inline-block; background: #0891b2; color: white; padding: 13px 28px; border-radius: 7px; text-decoration: none; font-weight: 600; font-size: 14px;">Jetzt antworten</a>
        </div>

        <p style="color: #d1d5db; font-size: 12px; text-align: center; margin: 24px 0 0;">seoforge.de · Automatisch generierte Benachrichtigung</p>
      </div>
    `;

    const emailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendKey}`,
      },
      body: JSON.stringify({
        from: "SeoForge <noreply@seoforge.de>",
        to: toEmail,
        subject: `SEO-Texte-Anfrage – ${name}`,
        html: htmlBody,
      }),
    });

    if (!emailRes.ok) {
      const err = await emailRes.json().catch(() => ({}));
      console.error("Resend error:", err);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("texte-contact error:", err);
    return NextResponse.json({ error: "Interner Fehler" }, { status: 500 });
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ success: false, message: 'Method not allowed' });

  try {
    const lead = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    if (!lead?.email && !lead?.phone) return res.status(400).json({ success: false, message: 'Email or phone is required.' });

    const emailTo = process.env.EMAIL_TO || 'hello@nestviewinfra.com';
    const emailFrom = process.env.EMAIL_FROM || 'Nest View Infra <onboarding@resend.dev>';
    const subject = `New enquiry — ${lead.project_name || 'Nest View Infra'}`;
    const text = [
      'NEW NEST VIEW INFRA ENQUIRY', '',
      `Project: ${lead.project_name || 'General Enquiry'}`,
      `Name: ${lead.name || ''}`,
      `Email: ${lead.email || ''}`,
      `Phone: ${lead.phone || ''}`,
      `Message: ${lead.message || ''}`, '',
      'ATTRIBUTION',
      `Source page: ${lead.source_page || '/'}`,
      `Source URL: ${lead.source_url || ''}`,
      `Referrer: ${lead.referrer || ''}`,
      `UTM source: ${lead.utm_source || ''}`,
      `UTM medium: ${lead.utm_medium || ''}`,
      `UTM campaign: ${lead.utm_campaign || ''}`,
      `UTM term: ${lead.utm_term || ''}`,
      `UTM content: ${lead.utm_content || ''}`,
    ].join('\n');

    let delivered = false;
    if (process.env.RESEND_API_KEY) {
      const r = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ from: emailFrom, to: [emailTo], subject, text, reply_to: lead.email || undefined }),
      });
      if (!r.ok) throw new Error(await r.text());
      delivered = true;
    } else {
      const formSubmit = `https://formsubmit.co/ajax/${encodeURIComponent(emailTo)}`;
      const r = await fetch(formSubmit, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ _subject: subject, _template: 'table', name: lead.name || '', email: lead.email || '', phone: lead.phone || '', project: lead.project_name || '', message: lead.message || '', source_page: lead.source_page || '/', source_url: lead.source_url || '', referrer: lead.referrer || '', utm_source: lead.utm_source || '', utm_medium: lead.utm_medium || '', utm_campaign: lead.utm_campaign || '', utm_term: lead.utm_term || '', utm_content: lead.utm_content || '' }),
      });
      if (!r.ok) throw new Error(await r.text());
      delivered = true;
    }

    return res.status(200).json({ success: delivered });
  } catch (error) {
    console.error('Lead email error:', error);
    return res.status(500).json({ success: false, message: 'Unable to send enquiry email.' });
  }
}

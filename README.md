# Nest View Infra — Premium React Website

A premium animated real-estate / infrastructure landing website built with React + Vite and CSS animations. The supplied Nest View Infra logo is included as `src/assets/logo.jpeg`.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Notes
- No pure black is used in the design palette.
- Responsive mobile navigation.
- Scroll reveal animations.
- Animated architectural hero illustration built in CSS.
- Interactive project tabs.
- Contact enquiry form with success state (front-end only).
- Replace the placeholder contact details in `src/main.jsx` with the company's real details before launch.

## Project Detail Sections

The site now includes dedicated detail sections for:
- The Meridian Residences
- Nest Avenue Luxe
- Vista Greens Estate

Each section includes project highlights, amenities, a dedicated enquiry form, responsive layout, and premium image treatment.

## Enquiry submission setup

Each project enquiry form now submits asynchronously through **FormSubmit** and includes the selected project name, visitor name, phone and email. The form validates email format and Indian mobile numbers before submission.

1. Copy `.env.example` to `.env`.
2. Replace `VITE_FORM_ENDPOINT` with your FormSubmit AJAX endpoint for the real Nest View Infra enquiry inbox.
3. Start the site with `npm run dev` or build with `npm run build`.
4. On the first submission to a new FormSubmit email address, FormSubmit will send an activation/confirmation email to that inbox. Confirm it once before using the form in production.

Example:

`VITE_FORM_ENDPOINT=https://formsubmit.co/ajax/your-real-inbox@example.com`

For a CRM instead, set `VITE_FORM_ENDPOINT` to the CRM/webhook endpoint that accepts browser POST requests (with the required CORS policy), or proxy it through your backend/serverless function. No CRM API secret is embedded in the React client.

## CRM webhook + attribution

All three project enquiry forms and the general contact form submit to `/api/leads`.
The serverless endpoint forwards the lead to `CRM_WEBHOOK_URL`, keeping the CRM webhook URL out of browser code.

Each submission includes:
- `project_name` — Meridian / Avenue / Vista / General Enquiry
- `source_page` — page path where the form was submitted
- `source_url` — full URL
- `referrer`
- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_term`
- `utm_content`
- name, email, phone, message, submitted_at

### Configure
1. Deploy the project on a platform supporting the included `api/leads.js` serverless function (Vercel is a simple option).
2. Add `CRM_WEBHOOK_URL` as a server-side environment variable.
3. Point it at your CRM/automation webhook. For HubSpot or Zoho, use their supported inbound form/automation endpoint or an automation layer such as Make/Zapier that maps the JSON fields into the CRM.
4. Do not put HubSpot/Zoho private API tokens in `VITE_*` variables or frontend code.

### UTM tracking
Campaign parameters are read automatically from the landing URL. Example:
`/?utm_source=google&utm_medium=cpc&utm_campaign=meridian-launch&utm_content=hero`

The values are forwarded unchanged to the CRM webhook, together with the project selected on the form.


## Enquiries
- Email delivery uses Resend when `RESEND_API_KEY` is configured; otherwise it falls back to FormSubmit.
- Set `EMAIL_TO` to the real Nest View Infra inbox.
- Set `VITE_WHATSAPP_NUMBER` to the WhatsApp business number in international format without `+` or spaces (example: `919876543210`).
- After a successful enquiry, the visitor gets a pre-filled WhatsApp continuation button.
- Project name, source page, referrer and UTM parameters are included in the email payload.

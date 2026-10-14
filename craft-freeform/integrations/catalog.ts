interface Integration {
  title: string;
  description: string;
  icon: string;
  link: string;
  proOnly?: boolean;
  filterIcon?: boolean;
}

// Both views use this catalog so names, descriptions, and edition requirements stay consistent.
export const integrationGroups: Record<string, Integration[]> = {
  crm: [
    { title: 'ActiveCampaign', description: 'Sync contacts and subscribe to lists', icon: 'active-campaign', link: './activecampaign/', proOnly: true },
    { title: 'Freshdesk', description: 'Create support tickets', icon: 'freshdesk', link: './freshdesk/', proOnly: true },
    { title: 'HubSpot', description: 'Sync contacts, companies, and deals', icon: 'hubspot', link: './hubspot/', proOnly: true },
    { title: 'Keap', description: 'Sync contact records', icon: 'keap', link: './keap/', proOnly: true },
    { title: 'Insightly', description: 'Create leads from submissions', icon: 'insightly', link: './insightly/', proOnly: true },
    { title: 'Microsoft Dynamics 365', description: 'Create leads and contacts', icon: 'ms-dynamics', link: './ms-dynamics/', proOnly: true },
    { title: 'Pardot', description: 'Sync prospect records', icon: 'pardot', link: './pardot/', proOnly: true },
    { title: 'Pipedrive', description: 'Sync leads, deals, and contacts', icon: 'pipedrive', link: './pipedrive/', proOnly: true },
    { title: 'Salesforce', description: 'Send submissions to Salesforce', icon: 'salesforce', link: './salesforce/', proOnly: true },
    { title: 'SugarAI', description: 'Sync contact records', icon: 'sugarcrm', link: './sugarcrm/', proOnly: true },
    { title: 'Zoho', description: 'Sync CRM records', icon: 'zoho', link: './zoho/', proOnly: true },
  ],
  emailMarketing: [
    { title: 'ActiveCampaign', description: 'Sync contacts and subscribe to lists', icon: 'active-campaign', link: './activecampaign/', proOnly: true },
    { title: 'Brevo', description: 'Send contacts to mailing lists', icon: 'brevo', link: './brevo/', proOnly: true },
    { title: 'Campaign Monitor', description: 'Subscribe contacts to mailing lists', icon: 'campaign-monitor', link: './campaign-monitor/', proOnly: true },
    { title: 'Constant Contact', description: 'Subscribe contacts to mailing lists', icon: 'constant-contact', link: './constant-contact/', proOnly: true },
    { title: 'Campaign', description: 'Connect to the Craft Campaign plugin', icon: 'campaign', link: './campaign/', proOnly: true },
    { title: 'Dotdigital', description: 'Send contacts to mailing lists', icon: 'dotdigital', link: './dotdigital/', proOnly: true },
    { title: 'Mailchimp', description: 'Subscribe contacts to audiences', icon: 'mailchimp', link: './mailchimp/', proOnly: true },
    { title: 'MailerLite', description: 'Subscribe contacts to mailing lists', icon: 'mailerlite', link: './mailerlite/', proOnly: true },
    { title: 'Klaviyo', description: 'Send contacts to Klaviyo', icon: 'klaviyo', link: './klaviyo/', proOnly: true, filterIcon: true },
  ],
  elements: [
    { title: 'Craft Entries', description: 'Create entries from submissions', icon: 'craft-entries', link: './elements/#craft-entries', proOnly: true, filterIcon: true },
    { title: 'Craft Users', description: 'Create users from submissions', icon: 'craft-users', link: './elements/#craft-users', proOnly: true, filterIcon: true },
    { title: 'Calendar Events', description: 'Create Calendar events', icon: 'solspace-calendar', link: './elements/#calendar-events', proOnly: true },
    { title: 'Edit Elements', description: 'Update existing Craft elements', icon: 'edit-elements', link: './elements/#editing-elements', proOnly: true, filterIcon: true },
  ],
  spam: [
    { title: 'reCAPTCHA', description: 'Google CAPTCHA verification', icon: 'recaptcha', link: './recaptcha/' },
    { title: 'hCaptcha', description: 'CAPTCHA verification', icon: 'hcaptcha', link: './hcaptcha/' },
    { title: 'Friendly Captcha', description: 'Friendly Captcha verification', icon: 'friendly-captcha', link: './friendly-captcha/' },
    { title: 'Cloudflare Turnstile', description: 'Cloudflare bot verification', icon: 'turnstile', link: './turnstile/' },
    { title: 'Honeypot', description: 'Catch bots with a hidden input', icon: 'honeypot', link: '../forms/spam-protection/#honeypot' },
    { title: 'JavaScript Test', description: 'Require JavaScript to submit', icon: 'javascript-test', link: '../forms/spam-protection/#javascript-test' },
    { title: 'AI Spam Analysis', description: 'Analyze submissions for spam', icon: 'ai-spam-analysis', link: './ai-spam-analysis/', proOnly: true },
    { title: 'Blocked Keywords', description: 'Block selected words and phrases', icon: 'blocked-keywords', link: '../forms/spam-protection/#spam-blocking' },
    { title: 'Blocked Emails', description: 'Block selected email addresses', icon: 'blocked-emails', link: '../forms/spam-protection/#spam-blocking' },
    { title: 'Blocked IP Addresses', description: 'Block selected IP addresses', icon: 'blocked-ip-addresses', link: '../forms/spam-protection/#spam-blocking' },
    { title: 'Block Gibberish', description: 'Reject nonsensical text', icon: 'block-gibberish', link: '../forms/spam-protection/#spam-blocking' },
    { title: 'Snaptcha', description: 'Connect to the Snaptcha plugin', icon: 'snaptcha', link: '../forms/spam-protection/#snaptcha' },
  ],
  webhooks: [
    { title: 'Slack', description: 'Send submissions to Slack', icon: 'slack', link: './slack/', proOnly: true },
    { title: 'Zapier', description: 'Trigger workflows in Zapier', icon: 'zapier', link: './zapier/', proOnly: true },
    { title: 'Generic Webhooks', description: 'Send data to webhook URLs', icon: 'generic-webhook', link: './generic-webhooks/', proOnly: true },
  ],
  ai: [
    { title: 'SolspaceAI', description: 'Analyze submissions with SolspaceAI', icon: 'solspace-ai', link: './solspace-ai/', proOnly: true },
    { title: 'Anthropic AI', description: 'Process submissions with Claude', icon: 'anthropic', link: './anthropic/', proOnly: true, filterIcon: true },
    { title: 'Gemini AI', description: 'Process submissions with Gemini', icon: 'gemini', link: './gemini/', proOnly: true },
    { title: 'OpenAI', description: 'Process submissions with OpenAI', icon: 'openai', link: './openai/', proOnly: true, filterIcon: true },
    { title: 'xAI', description: 'Process submissions with Grok', icon: 'xai', link: './xai/', proOnly: true, filterIcon: true },
  ],
  payments: [
    { title: 'Stripe Payments', description: 'Accept payments with Stripe', icon: 'stripe', link: './stripe-payments/', proOnly: true },
    { title: 'PayPal', description: 'Accept payments with PayPal', icon: 'paypal', link: './paypal/', proOnly: true },
    { title: 'Square', description: 'Accept payments with Square', icon: 'square', link: './square/', proOnly: true, filterIcon: true },
    { title: 'Mollie', description: 'Accept payments with Mollie', icon: 'mollie', link: './mollie/', proOnly: true, filterIcon: true },
  ],
  processing: [
    { title: 'Google Tag Manager', description: 'Track form activity with GTM', icon: 'google-tag-manager', link: './google-tag-manager/' },
    { title: 'POST Forwarding', description: 'Forward data to an external URL', icon: 'post-forwarding', link: './post-forwarding/', proOnly: true },
    { title: 'URL Parameter Tracking', description: 'Capture UTM and tracking parameters', icon: 'url-parameter-tracking', link: './url-parameter-tracking/', proOnly: true },
  ],
  other: [
    { title: 'Google Sheets', description: 'Add submissions to spreadsheets', icon: 'google-sheets', link: './google-sheets/', proOnly: true },
    { title: 'Jira', description: 'Create Jira cards', icon: 'jira', link: './jira/', proOnly: true },
    { title: 'Supabase', description: 'Store submissions in database tables', icon: 'supabase', link: './supabase/', proOnly: true },
    { title: 'Form Monitor', description: 'Monitor forms and notification delivery', icon: 'form-monitor', link: '../monitoring/', proOnly: true },
    { title: 'Click', description: 'Send data to Click for Dynamics', icon: 'click', link: './click/', proOnly: true },
  ],
};

export const alphabeticalIntegrations = Array.from(
  new Map(Object.values(integrationGroups).flat().map((item) => [item.title, item])).values(),
).sort((a, b) => a.title.localeCompare(b.title, 'en'));

export const customIntegrations: Integration[] = [
  { title: 'Custom CRM', description: 'Build your own CRM connection', icon: 'custom', link: '../developer/crm/', proOnly: true },
  { title: 'Custom Email Marketing', description: 'Connect another mailing list service', icon: 'custom', link: '../developer/email-marketing/', proOnly: true },
  { title: 'Custom Webhooks', description: 'Build a custom webhook integration', icon: 'custom', link: '../developer/webhooks/', proOnly: true },
  { title: 'Integration Development Guide', description: 'Explore custom integration options', icon: 'custom', link: '../guides/guide/custom-integrations/' },
];

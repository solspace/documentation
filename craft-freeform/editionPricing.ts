export const editionPurchaseUrl = 'https://plugins.craftcms.com/freeform';

export const editionPricing = {
  Express: {
    description: 'For a single form',
    price: 'Free',
    term: 'forever',
    renewal: null,
    action: 'Get Express',
  },
  Lite: {
    description: 'For sites with multiple forms',
    price: '$99',
    term: 'one-time',
    renewal: '$49/year after the first year (optional)',
    action: 'Buy Lite',
  },
  Pro: {
    description: 'For advanced workflows',
    price: '$149',
    term: 'one-time',
    renewal: '$79/year after the first year (optional)',
    action: 'Buy Pro',
  },
} as const;

export interface PluginListingItem {
  id: string;
  name: string;
  icon?: string;
  path: string;
  guide?: string;
  headline: string;
  summary?: string;
  description: string;
  features: readonly string[];
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
}

const calendarSummary = 'Create and schedule events';

export const craftPlugins: readonly PluginListingItem[] = [
  {
    id: 'freeform',
    name: 'Freeform',
    icon: 'freeform-blue',
    path: '/craft/freeform/v5/',
    headline: 'Build forms for any workflow',
    description: 'Create anything from a simple contact form to a multi-step application in Craft.',
    features: [
      'Drag-and-drop form builder',
      'Multi-page forms with conditional logic',
      'CRM and email marketing integrations',
    ],
    image: {
      src: 'craft/freeform/v5/cp/form-builder-consultation.jpg',
      alt: 'Freeform’s field palette and two-column Book a consultation form in the Layout tab',
      width: 1603,
      height: 893,
    },
  },
  {
    id: 'calendar',
    name: 'Calendar',
    icon: 'calendar-orange',
    path: '/craft/calendar/v5/',
    headline: 'Manage events in Craft',
    summary: calendarSummary,
    description: 'Organize your events in the control panel and choose how to display them on your site.',
    features: [
      'Recurring events with custom rules and exceptions',
      'Multiple calendars with their own field layouts',
      'Twig and GraphQL for custom event displays',
    ],
    image: {
      src: 'craft/calendar/v5/event-editor-letterpress.jpg',
      alt: 'Calendar’s Letterpress Studio Series event with biweekly recurrence, an end date, a skipped session, and custom event fields',
      width: 1603,
      height: 835,
    },
  },
  {
    id: 'ai-assistant',
    name: 'AI Assistant',
    path: '/craft/ai-assistant/v1/',
    headline: 'Draft text and images in the editor',
    description: 'Generate and refine content while working on a Craft entry.',
    features: [
      'Text and image generation in the control panel',
      'Reusable prompts for your editorial team',
      'Support for multiple AI providers and models',
    ],
    image: {
      src: 'craft/ai-assistant/v1/cp/generate-text.jpg',
      alt: 'AI Assistant in a Craft entry showing a product description prompt, its source context, and the generated text',
      width: 3000,
      height: 1315,
    },
  },
  {
    id: 'dark-mode',
    name: 'darkMode',
    path: '/craft/dark-mode/v1/',
    guide: 'setup/installation/',
    headline: 'Switch control panel themes',
    description: 'Give each Craft CMS 5 user a choice of light, dark, or system appearance.',
    features: [
      'Switch appearance from the control panel toolbar',
      'Save preferences per user and sync them across tabs',
      'Built-in styling for supported plugins',
    ],
    image: {
      src: 'craft/dark-mode/v1/overview/dashboard-800.jpg',
      alt: 'The Craft CMS dashboard with darkMode enabled',
      width: 800,
      height: 472,
    },
  },
];

export const expressionEngineAddOns: readonly PluginListingItem[] = [
  {
    id: 'freeform',
    name: 'Freeform',
    icon: 'freeform-blue',
    path: '/expressionengine/freeform/v3/',
    headline: 'Build forms for any workflow',
    description: 'Create anything from a simple contact form to a multi-page application in ExpressionEngine.',
    features: [
      'Drag-and-drop form builder',
      'Multi-page forms and reusable formatting templates',
      'CRM and email marketing integrations',
    ],
    image: {
      src: 'ee/freeform/v3/cp_forms-form-builder.png',
      alt: 'Freeform’s ExpressionEngine form builder showing a two-page job application, field palette, and form settings',
      width: 2200,
      height: 1350,
    },
  },
  {
    id: 'calendar',
    name: 'Calendar',
    icon: 'calendar-orange',
    path: '/expressionengine/calendar/v5/',
    headline: 'Manage events in ExpressionEngine',
    summary: calendarSummary,
    description: 'Create and organize events in the control panel, then choose how to display them on your site.',
    features: [
      'Recurring events with custom rules and exclusions',
      'Month, week, and day views in the control panel',
      'ExpressionEngine template tags for custom event displays',
    ],
    image: {
      src: 'ee/calendar/v5/calendar-cp_events-create.png',
      alt: 'Calendar’s ExpressionEngine event editor showing a recurring family picnic with a monthly rule, an end date, and exceptions',
      width: 2434,
      height: 1855,
    },
  },
];

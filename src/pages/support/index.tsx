import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import type { ComponentProps } from 'react';
import { createStripePaymentExtension, recommendedExtensions } from '@solspace/freeform-extensions';
import { builtinComponents, type ReactFieldRendererProps } from '@solspace/freeform-react';
import { darkTheme } from '@solspace/freeform-theme-default';
import DocsFreeform from '@site/src/components/forms/DocsFreeform';
import { Footer, LeftNav } from '@site/src/components/layout';
import styles from './index.module.css';

function SupportForm({ children, ...props }: ComponentProps<typeof builtinComponents.Form>) {
  const { fieldErrors, formErrors, pageErrors } = props.form;
  const showSummary = !formErrors.length &&
    (pageErrors.length > 0 || Object.values(fieldErrors).some((errors) => errors.length > 0));

  return (
    <builtinComponents.Form {...props}>
      {showSummary && (
        <p className={styles.errorSummary} role="alert">
          <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM7.47 7.47a.75.75 0 0 1 1.06 0L10 8.94l1.47-1.47a.75.75 0 0 1 1.06 1.06L11.06 10l1.47 1.47a.75.75 0 0 1-1.06 1.06L10 11.06l-1.47 1.47a.75.75 0 0 1-1.06-1.06L8.94 10 7.47 8.53a.75.75 0 0 1 0-1.06Z" />
          </svg>
          Please review the highlighted fields and try again.
        </p>
      )}
      {children}
    </builtinComponents.Form>
  );
}

function SupportLevel(props: ReactFieldRendererProps) {
  const labelMarkup = document.createElement('template');
  const { field, form, value } = props;

  return (
    <fieldset className={styles.supportLevels}>
      <legend className="sr-only">{field.label}</legend>
      {field.options?.map((option) => {
        labelMarkup.innerHTML = option.label;
        const price = labelMarkup.content.querySelector('.font-mono');
        price?.remove();

        return (
          <label className={styles.supportLevel} data-level={option.value} key={option.value}>
            <input
              type="radio"
              name={field.handle}
              value={option.value}
              checked={String(value ?? '') === option.value}
              disabled={!form.isFieldEnabled(field.handle)}
              onChange={() => form.setValue(field.handle, option.value)}
            />
            <svg className={styles.selectedIcon} aria-hidden="true" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" />
            </svg>
            <span>{labelMarkup.content.textContent?.trim()}</span>
            {price && <span className={styles.supportPrice}>{price.textContent}</span>}
          </label>
        );
      })}
    </fieldset>
  );
}

const supportRenderers = { handles: { supportLevel: SupportLevel } };
const supportTheme = { ...darkTheme, renderers: { components: { Form: SupportForm } } };
const supportStripeExtension = createStripePaymentExtension({
  variables: {
    colorPrimary: '#3b82f6',
    colorBackground: '#1e242b',
    colorText: '#ffffff',
    colorTextSecondary: '#d1d5db',
    colorTextPlaceholder: '#9ca3af',
    colorDanger: '#ff8b82',
    fontFamily: 'sans-serif',
    fontSizeBase: '16px',
    spacingUnit: '4px',
    borderRadius: '6px',
    gridColumnSpacing: '16px',
    gridRowSpacing: '16px',
  },
  rules: {
    '.Label': { fontSize: '14px', fontWeight: '500', marginBottom: '4px' },
    '.Input': {
      padding: '6px 12px',
      lineHeight: '22px',
      border: '1px solid #353b42',
      boxShadow: 'none',
    },
    '.Input:focus': {
      borderColor: '#3b82f6',
      boxShadow: '0 0 0 1px #3b82f6',
    },
    '.Input--invalid': {
      borderColor: '#ff8b82',
      boxShadow: 'none',
    },
    '.Block': {
      border: '1px solid #353b42',
      backgroundColor: '#1e242b',
      boxShadow: 'none',
    },
  },
});
const supportExtensions = recommendedExtensions.map((extension) =>
  extension.name === supportStripeExtension.name ? supportStripeExtension : extension,
);

const Support: React.FC = () => {
  return (
    <Layout
      title="Software Support"
      description="Need help with one of our plugins or add-ons? We love helping our customers discover best practices, resolve issues, and achieve their goals!"
    >
      <div className="flex">
        <LeftNav />
        <div className="flex min-w-0 flex-1 flex-col gap-3 md:ml-72 p-8">
          <main className="w-full max-w-6xl m-auto my-3">
            <span className="page-section">Support</span>
            <h1>Software Support</h1>
            <p>
              Need help with one of our plugins or add-ons? We love helping our customers discover best practices, resolve issues, and achieve their goals!
            </p>
            <div className="flex flex-col gap-4 lg:flex-row">
              <div className="flex-1 bg-[rgba(255,102,36,0.1)] rounded-lg outline -outline-offset-1 outline-[rgba(255,102,36,0.3)]">
                <div className="p-4">
                  <div className="sm:flex sm:items-start sm:justify-between">
                    <div>
                      <h5 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Priority Support</h5>
                      <div className="text-sm text-gray-800 dark:text-gray-200">
                        <p className="mb-0">
                          Need help fast? Priority Support moves your request to the front of the line and gives you direct access to our team,
                          so you can get unstuck quickly and keep things moving. Just choose <strong>Priority</strong> under <i>Support Level</i> below.
                        </p>
                      </div>
                    </div>
                    <div className="mt-5 sm:mt-0 sm:ml-6 sm:flex sm:shrink-0 sm:items-center">
                      <a href="#support-form" className="inline-flex items-center rounded-md bg-[rgba(255,102,36,1)] px-3 py-2 text-sm font-semibold text-white hover:bg-[#058ffe] hover:text-white border-0">Learn more</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1 bg-teal-100/50 rounded-lg dark:bg-teal-800/10 dark:outline dark:-outline-offset-1 dark:outline-teal-600/30">
                <div className="p-4">
                  <div className="sm:flex sm:items-start sm:justify-between">
                    <div>
                      <h5 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Custom Software Development Services</h5>
                      <div className="text-sm text-gray-800 dark:text-gray-200">
                        <p className="mb-0">
                          Need something beyond what our plugins offer out of the box? Our team provides <a href="/support/custom-development/" className="text-teal-800 dark:text-teal-600">custom development services</a> to
                          help you extend, integrate, and tailor Solspace plugins to fit your exact project needs.
                        </p>
                      </div>
                    </div>
                    <div className="mt-5 sm:mt-0 sm:ml-6 sm:flex sm:shrink-0 sm:items-center">
                      <a href="/support/custom-development/" className="inline-flex items-center rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white hover:bg-[#058ffe] hover:text-white border-0">Learn more</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-10">
              <div className="flex flex-wrap gap-1">
                <h2 className="leading-0 !m-0 px-6 py-4 bg-[#058ffe] rounded-t-md support-tab">
                  Private Ticket
                </h2>
                <div className="flex flex-wrap gap-1 items-end">
                  <Link
                    className="px-6 py-2 bg-teal-600 rounded-t-md text-white font-bold hover:text-white hover:bg-[#ff6624] support-tab-urgent"
                    href="/support/custom-development"
                  >
                    Custom Development
                  </Link>
                  <Link
                    className="px-6 py-2 bg-[rgba(0,105,190,0.25)]  rounded-t-md text-white font-bold hover:text-white hover:bg-[#ff6624]"
                    to="https://github.com/solspace"
                  >
                    Github
                  </Link>
                  <Link
                    className="px-6 py-2 bg-[rgba(0,105,190,0.25)]  rounded-t-md text-white font-bold hover:text-white hover:bg-[#ff6624]"
                    to="https://craftcms.stackexchange.com/questions/tagged/solspace"
                  >
                    Stack Exchange
                  </Link>
                </div>
              </div>
              <div className="mx-auto p-6 bg-[#121820] text-white rounded-b-md rounded-tr-md border border-solid border-[#058ffe]">
                <h2 className="text-xl md:text-3xl font-bold mb-4 text-gray-200 support-page">
                  Create a Support Ticket
                </h2>
                <p className="text-gray-200">
                  If you need assistance, have a question before making a
                  purchase, or simply want to get in touch, please fill out the
                  form below.
                </p>
                <div id="support-form" className={styles.supportForm}>
                  <DocsFreeform
                    handle="support"
                    theme={supportTheme}
                    extensions={supportExtensions}
                    renderers={supportRenderers}
                    // The support team's conditional notices and Priority Support terms contain HTML.
                    allowRawHtml
                    fallback={(
                      <iframe
                        title="Support Form"
                        src="https://support.solspace.com/software/support"
                        height="850"
                        width="100%"
                        className="block border-0"
                      />
                    )}
                  />
                </div>
              </div>
            </div>
          </main>
          <footer className="docusaurus-mt-lg docs-footer">
            <Footer />
          </footer>
        </div>
      </div>
    </Layout>
  );
};

export default Support;

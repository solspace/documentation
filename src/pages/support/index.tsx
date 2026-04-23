import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { Footer, LeftNav } from '@site/src/components/layout';

const Support: React.FC = () => {
  return (
    <Layout
      title="Software Support"
      description="Need help with one of our plugins or add-ons? We love helping our customers discover best practices, resolve issues, and achieve their goals!"
    >
      <div className="flex">
        <LeftNav />
        <div className="flex flex-col gap-3 md:ml-72 p-8">
          <main className="max-w-6xl m-auto my-3">
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
              <div className="flex gap-1">
                <h2 className="leading-0 !m-0 px-6 py-4 bg-[#058ffe] rounded-t-md support-tab">
                  Private Ticket
                </h2>
                <div className="flex gap-1 items-end">
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
                <iframe
                  title="Support Form"
                  id="support-form"
                  src="https://support.solspace.com/software/support"
                  scrolling="yes"
                  height="850px"
                  width="100%"
                  frameBorder="0"
                ></iframe>
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

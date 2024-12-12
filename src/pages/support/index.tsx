import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

import { Footer, LeftNav } from '@site/src/components/layout';

const Support: React.FC = () => {
  return (
    <Layout
      title="Support"
      description="Need help with Freeform or Calendar? We love helping our customers discover best practices, resolve issues, and achieve their goals!"
    >
      <div className="flex">
        <LeftNav />
        <div className="flex flex-col gap-3 md:ml-72 p-8">
          <main className="max-w-6xl m-auto my-3">
            <span className="page-section">Support</span>

            <h1>Support</h1>
            <p>
              Need help with Freeform or Calendar? We love helping our customers
              discover best practices, resolve issues, and achieve their goals!
            </p>
            <p>
              For more extensive or urgent needs, consider our
              <Link href="/support/premium"> premium support services</Link>.
              Get direct, high-priority access to our Software team for complex
              questions, custom modules, and complicated upgrades.
            </p>
            <div className="mt-10">
              <div className="flex gap-1">
                <h2 className="leading-0 !m-0 px-6 py-4 bg-[#ff6624] rounded-t-md support-tab">
                  Private Ticket
                </h2>
                <div className="flex gap-1 items-end">
                  <Link
                    className="px-6 py-2 bg-red-600 rounded-t-md text-white font-bold hover:text-white hover:bg-red-800 support-tab-urgent"
                    href="/support/premium"
                  >
                    Urgent
                  </Link>
                  <Link
                    className="px-6 py-2 bg-[rgba(0,127,230,0.2)]  rounded-t-md text-black dark:text-white font-bold hover:text-white hover:bg-[#058ffe] dark:bg-[rgba(0,105,190,0.25)] dark:hover:hover:bg-[#058ffe]"
                    to="https://github.com/solspace/craft-freeform/"
                  >
                    Github
                  </Link>
                  <Link
                    className="px-6 py-2 bg-[rgba(0,127,230,0.2)]  rounded-t-md text-black dark:text-white font-bold hover:text-white hover:bg-[#058ffe] dark:bg-[rgba(0,105,190,0.25)] dark:hover:hover:bg-[#058ffe]"
                    to="https://craftcms.stackexchange.com/questions/tagged/solspace"
                  >
                    Stack Exchange
                  </Link>
                </div>
              </div>
              <div className="mx-auto p-6 bg-[#181d27] text-white rounded-b-md rounded-tr-md border border-solid border-[#ff6624]">
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

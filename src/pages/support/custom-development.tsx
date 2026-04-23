import Layout from '@theme/Layout';
import Admonition from '@theme-original/Admonition';
import Link from '@docusaurus/Link';

import { FlexCards } from '@site/src/components/docs';
import { Footer, LeftNav } from '@site/src/components/layout';

import Icons from '@site/static/icons/cards';

const Support: React.FC = () => {
  return (
    <Layout
      title="Custom Development Services"
      description="Need help with Freeform? We love helping our customers discover best practices, resolve issues, and achieve their goals!"
    >
      <div className="flex">
        <LeftNav />
        <div className="flex flex-col gap-3 md:ml-72 p-8">
          <main className="max-w-6xl m-auto my-3">
            <span className="page-section">Support</span>

            <h1>Custom Development Services</h1>
            <div className="custom-development-services">
              <p>
                Need something beyond what our plugins offer out of the box? Our team provides custom development services to help you extend, integrate, and tailor Solspace plugins to fit your exact project needs.
              </p>
              <p>
                Whether you're building something complex or just need help getting over a technical hurdle, we can work directly with you to design and implement the right solution.
              </p>

              <blockquote className="text-sm font-italic rounded-md p-4 mb-7 form-styling">
                <p className="text-blue-500 mb-2">
                  My experience with Solspace Priority Support was fantastic! They contacted me in a matter of minutes and within 30 minutes, I was
                  talking to the lead developer. Gustavs was amazing to work with and helped me through my issue quickly and efficiently. I can’t
                  recommend the Priority Support enough, and will definitely be using it in the future when needed.
                  <br /><br />
                  <b>– Jeff Glenn, Paradigm Marketing & Creative</b>
                </p>
              </blockquote>

              <h3 className="pt-6">
                What we can help with
              </h3>
              <FlexCards
                items={[
                  {
                    title: 'Custom Modules',
                    description:
                      'Develop tailored modules or middleware to support your workflows.',
                    icon: Icons.BoxIcon,
                  },
                  {
                    title: 'Custom Features',
                    description:
                      'Add new functionality or extend existing plugin behavior to meet your requirements.',
                    icon: Icons.PaletteIcon,
                  },
                  {
                    title: 'Integrations',
                    description:
                      'Connect Freeform, Calendar, or AI Assistant with third-party services, APIs, or internal systems',
                    icon: Icons.CloudApiIcon,
                  },
                  {
                    title: 'Upgrades & Migrations',
                    description:
                      'Assistance with complex upgrades, refactors, or moving between environments.',
                    icon: Icons.UpdateArrowsIcon,
                  },
                  {
                    title: 'Performance & Optimization',
                    description:
                      'Improve performance, scalability, and reliability of your implementation.',
                    icon: Icons.ThrottlingIcon,
                  },
                  {
                    title: 'Brainstorming & Planning',
                    description:
                      'Building something complex and wish to get your flows right from the start? Let us help guide you.',
                    icon: Icons.EaselIcon,
                  },
                  {
                    title: 'Rescue',
                    description:
                      'Is there a pressing issue affecting your site or project? Let us help you put out that fire.',
                    icon: Icons.LifeRingIcon,
                  },
                  {
                    title: 'Advanced Templating',
                    description:
                      'Build complex front-end experiences, headless implementations, or highly customized layouts.',
                    icon: Icons.CodeIcon,
                  },
                  {
                    title: 'Template/Code Review',
                    description:
                      'We can review your templates or custom module and confirm everything looks good & reliable.',
                    icon: Icons.ReviewCodeIcon,
                  },
                  {
                    title: 'Unlimited Questions',
                    description:
                      'Have lots of questions for your project? No such thing as too many questions here.',
                    icon: Icons.QuestionSignIcon,
                  },
                  {
                    title: 'and More!',
                    description:
                      'Need us for something else not listed here? We can likely help with that too!',
                    icon: Icons.MoreIcon,
                  },
                ]}
              />

              <h3>
                How it works
              </h3>
              <ul role="list" className="mt-6 ml-0 pl-0 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
                <li className="col-span-1 flex rounded-md shadow-xs dark:shadow-none">
                  <div className="flex w-10 shrink-0 items-center justify-center rounded-l-md bg-[#058ffe] text-lg font-bold text-white dark:text-black">1</div>
                  <div className="flex flex-1 items-center justify-between rounded-r-md bg-gray-100/50 dark:bg-gray-800/50">
                    <div className="flex-1 px-4 py-2 text-sm">
                      <span className="font-medium text-gray-900 hover:text-gray-600 dark:text-white dark:hover:text-gray-200">
                        Tell us about your project, goals, and any challenges you're facing
                      </span>
                    </div>
                  </div>
                </li>
                <li className="col-span-1 flex rounded-md shadow-xs dark:shadow-none">
                  <div className="flex w-10 shrink-0 items-center justify-center rounded-l-md bg-[#058ffe] text-lg font-bold text-white dark:text-black">2</div>
                  <div className="flex flex-1 items-center justify-between rounded-r-md bg-gray-100/50 dark:bg-gray-800/50">
                    <div className="flex-1 px-4 py-2 text-sm">
                      <span className="font-medium text-gray-900 hover:text-gray-600 dark:text-white dark:hover:text-gray-200">
                        We'll review your request and help define a clear scope of work
                      </span>
                    </div>
                  </div>
                </li>
                <li className="col-span-1 flex rounded-md shadow-xs dark:shadow-none">
                  <div className="flex w-10 shrink-0 items-center justify-center rounded-l-md bg-[#058ffe] text-lg font-bold text-white dark:text-black">3</div>
                  <div className="flex flex-1 items-center justify-between rounded-r-md bg-gray-100/50 dark:bg-gray-800/50">
                    <div className="flex-1 px-4 py-2 text-sm">
                      <span className="font-medium text-gray-900 hover:text-gray-600 dark:text-white dark:hover:text-gray-200">
                        If needed, we can suggest approaches, architecture, or best practices
                      </span>
                    </div>
                  </div>
                </li>
                <li className="col-span-1 flex rounded-md shadow-xs dark:shadow-none">
                  <div className="flex w-10 shrink-0 items-center justify-center rounded-l-md bg-[#058ffe] text-lg font-bold text-white dark:text-black">4</div>
                  <div className="flex flex-1 items-center justify-between rounded-r-md bg-gray-100/50 dark:bg-gray-800/50">
                    <div className="flex-1 px-4 py-2 text-sm">
                      <span className="font-medium text-gray-900 hover:text-gray-600 dark:text-white dark:hover:text-gray-200">
                        Once aligned, we'll provide an estimate and timeline for the work
                      </span>
                    </div>
                  </div>
                </li>
              </ul>

              <h3 className="py-6">
                What to expect
              </h3>
              <ul>
                <li>Direct collaboration with experienced developers who know the plugins inside and out</li>
                <li>Practical, implementation-focused guidance. Not just theory</li>
                <li>Clear communication and iterative progress throughout the project</li>
              </ul>

              <h3 className="py-6">
                Need help deciding?
              </h3>
              <p>
                If you're unsure whether your request falls under support or custom development, feel free to reach out. We’re happy to help you determine the best path forward.
              </p>
            </div>

            <div className="mt-10">
              <div className="flex gap-1">
                <h2 className="leading-0 !m-0 px-6 py-4 bg-[#ff6624] rounded-t-md">
                  Get Started
                </h2>
              </div>
              <div className="mx-auto p-6 bg-[#181d27] text-white rounded-b-md rounded-tr-md border border-solid border-[#ff6624]">
                <iframe
                  title="Support Form"
                  id="support-form"
                  src="https://support.solspace.com/software/custom-development"
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

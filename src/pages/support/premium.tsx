import Layout from '@theme/Layout';
import Admonition from '@theme-original/Admonition';
import Link from '@docusaurus/Link';

import { FlexCards } from '@site/src/components/docs';
import { Footer, LeftNav } from '@site/src/components/layout';

import Icons from '@site/static/card-icons';

const Support: React.FC = () => {
  return (
    <Layout
      title="Support"
      description="Need help with Freeform? We love helping our customers discover best practices, resolve issues, and achieve their goals!"
    >
      <div className="flex">
        <LeftNav />

        <div className="flex flex-col gap-3 md:ml-72 p-8">
          <main className="max-w-6xl m-auto my-3">
            <span className="page-section">Support</span>

            <h1>Premium Support</h1>
            <p>
              Solspace offers premium paid support services for its plugins. If
              you have lots of questions or are building something complex, need
              help with a custom module, or have a complicated upgrade, you can
              get direct, high-priority email, chat, or web call access to the
              Solspace Software team.
            </p>
            <blockquote className="text-sm font-italic rounded-md p-4 mb-7 form-styling">
              <p className="text-blue-500 mb-2">
                My experience with Solspace Premium Support was fantastic! They
                contacted me in a matter of minutes and within 30 minutes, I was
                talking to the lead developer. Gustavs was amazing to work with
                and helped me through my issue quickly and efficiently. I can’t
                recommend the Premium Support enough, and will definitely be
                using it in the future when needed.
                <br />
                <br />
                <b>– Jeff Glenn, Paradigm Marketing & Creative</b>
              </p>
            </blockquote>
            <h4 className="pt-6">
              Here are some of the ways you can use this service:
            </h4>
            <FlexCards
              items={[
                {
                  title: 'Unlimited Questions',
                  description:
                    'Have lots of questions for your project? No such thing as too many questions here.',
                  icon: Icons.QuestionSignIcon,
                },
                {
                  title: 'Priority Support',
                  description:
                    'You become our number 1 priority and your questions always go to the front of the line.',
                  icon: Icons.ShieldIcon,
                },
                {
                  title: 'Access to Live Calls',
                  description:
                    'Wish to be able to have a web call with the Software team? Premium support gives you access to that!',
                  icon: Icons.SupportIcon,
                },
                {
                  title: 'Access to Live Chat',
                  description:
                    'Wish to have a live web chat with the Software team? Premium support gives you access to that!',
                  icon: Icons.ChatIcon,
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
                  title: 'Product Demo',
                  description:
                    'New to our product? We can help you every step of the way and walk you through setting it up.',
                  icon: Icons.TapIcon,
                },
                {
                  title: 'Advanced Templating',
                  description:
                    'Need something complex in your templates? Our developers know all the tricks and best practices.',
                  icon: Icons.CodeIcon,
                },
                {
                  title: 'Template/Code Review',
                  description:
                    'We can review your templates or custom module and confirm everything looks good & reliable.',
                  icon: Icons.ReviewCodeIcon,
                },
                {
                  title: 'Challenging Upgrades',
                  description:
                    'Have an ugly upgrade to make? Let us help you out and make sure it goes smoothly!',
                  icon: Icons.AlertIcon,
                },
                {
                  title: 'Custom Modules',
                  description:
                    'Building a custom module to extend our plugin? A developer can help coach you through it.',
                  icon: Icons.BoxIcon,
                },
                {
                  title: 'Minor Features',
                  description:
                    'Need a small improvement to our software? We can custom develop a solution for you!',
                  icon: Icons.MagicWandIcon,
                },
                {
                  title: 'and More!',
                  description:
                    'Need us for something else not listed here? We can likely help with that too!',
                  icon: Icons.MoreIcon,
                },
              ]}
            />
            <div className="mt-10">
              <div className="flex gap-1">
                <h2 className="leading-0 !m-0 px-6 py-4 bg-[#ff6624] rounded-t-md">
                  Sign up for Premium Support now!
                </h2>
              </div>
              <div className="mx-auto p-6 bg-[#181d27] text-white rounded-b-md rounded-tr-md border border-solid border-[#ff6624]">
                <Admonition type="info">
                  <span className="text-gray-100">If you have any questions about our Premium Support service,
                  feel free to <Link href="/support">contact us</Link> and we
                  can determine if our Premium Support service is right for you.
                  If you're ready to proceed, fill out the form, select the
                  number of hours and submit payment below:</span>
                </Admonition>
                <iframe
                  title="Support Form"
                  id="support-form"
                  src="/support/software/premium-support"
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

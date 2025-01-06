import Layout from '@theme/Layout';
import { LeftNav, Footer } from '@site/src/components/layout';
import { FlexCards } from '@site/src/components/docs';
import Icons from '@site/static/card-icons';

export default function Home(): JSX.Element {
  return (
    <Layout
      title="Documentation"
      description="The most dependable and user-friendly forms plugin for Craft CMS."
    >
      <div className="flex">
        <LeftNav />
        <div className="flex flex-col gap-3 md:ml-72 p-8">
          <main className="max-w-6xl m-auto my-3">
            <span className="page-section">Home</span>
            <h1>Software Documentation</h1>
            <p>
              Solspace builds high quality plugins and add-ons to extend{' '}
              <a
                className="external-link"
                rel="noopener noreferrer"
                target="_blank"
                href="https://craftcms.com"
              >
                Craft CMS
              </a>{' '}
              and{' '}
              <a
                className="external-link"
                rel="noopener noreferrer"
                target="_blank"
                href="https://expressionengine.com"
              >
                ExpressionEngine
              </a>{' '}
              . Our offerings push the boundaries of Craft CMS and
              ExpressionEngine with creative thinking to help you create
              ambitious websites.
            </p>

            <h2 className="mt-12">Craft CMS Plugins</h2>
            <FlexCards
              items={[
                {
                  title: 'Freeform',
                  icon: Icons.FreeformIcon,
                  fullCardLink: 'craft/freeform/v5',
                },
                {
                  title: 'Calendar',
                  icon: Icons.CalendarIcon,
                  fullCardLink: 'craft/calendar/v5',
                },
                {
                  title: 'Express Forms',
                  icon: Icons.ExpressFormsIcon,
                  fullCardLink:
                    'https://discontinued-docs.solspace.com/express-forms/',
                },
              ]}
            />

            <h2 className="mt-8">ExpressionEngine Add-ons</h2>
            <FlexCards
              items={[
                {
                  title: 'Freeform',
                  icon: Icons.FreeformIcon,
                  fullCardLink: 'expressionengine/freeform/v3',
                },
                {
                  title: 'Calendar',
                  icon: Icons.CalendarIcon,
                  fullCardLink: 'expressionengine/calendar/v5',
                },
              ]}
            />

            <h2 className="mt-8">Why Solspace</h2>
            <p>
              Rest assured the team behind Solspace plugins are committed to
              providing you with the level of quality and support that you
              expect and deserve.
            </p>
            <FlexCards
              items={[
                {
                  title: 'Top Notch Support',
                  icon: Icons.SupportIcon,
                  description:
                    'Our commitment to providing top-notch customer support is well-known in the Craft CMS community. We always aim to deliver the best and most dependable assistance to our valued customers.',
                  linkWithDescription: 'https://support.solspace.com/',
                },
                {
                  title: '20+ Years Experience',
                  icon: Icons.HourglassIcon,
                  description:
                    'For over 20 years, Solspace has been creating, maintaining, and providing support for software to more than 20,000 customers. In total, over 400,000 plugins have been sold or downloaded for free.',
                  linkWithDescription: 'https://solspace.com',
                },
                {
                  title: 'Active Development',
                  icon: Icons.DevelopmentIcon,
                  description:
                    'Solspace builds some of the most popular plugins for Craft CMS and boasts an impressive track record of continuous development, including numerous feature upgrades, enhancements, and bug fixes.',
                },
              ]}
            />
          </main>
        </div>
      </div>
      <footer className="docusaurus-mt-lg docs-footer">
        <Footer />
      </footer>
    </Layout>
  );
}

import Layout from '@theme/Layout';
import { LeftNav, Footer } from '@site/src/components/layout';
import { FlexCards } from '@site/src/components/docs';
import Icons from '@site/static/icons/cards';

export default function Craft(): JSX.Element {
  return (
    <Layout
      title="Craft"
      description="The most dependable and user-friendly plugins for Craft CMS."
    >
      <div className="flex">
        <LeftNav />
        <div className="flex flex-col gap-3 md:ml-72 p-8 w-full">
          <main className="max-w-6xl my-3">
            <div className="flex flex-col">
              <span className="page-section">Plugins</span>
              <h1>Craft CMS</h1>
              <p>Choose a Craft plugin from below:</p>

              <FlexCards
                items={[
                  {
                    title: 'Freeform',
                    icon: Icons.FreeformIcon,
                    fullCardLink: '/craft/freeform/v5',
                  },
                  {
                    title: 'Calendar',
                    icon: Icons.CalendarIcon,
                    fullCardLink: '/craft/calendar/v5',
                  },
                  {
                    title: 'Express Forms',
                    icon: Icons.ExpressFormsIcon,
                    fullCardLink:
                      'https://discontinued-docs.solspace.com/express-forms',
                  },
                ]}
              />
            </div>
          </main>
        </div>
      </div>
      <footer className="docusaurus-mt-lg docs-footer">
        <Footer />
      </footer>
    </Layout>
  );
}

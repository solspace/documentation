import Layout from '@theme/Layout';
import { LeftNav, Footer } from '@site/src/components/layout';
import { FlexCards } from '@site/src/components/docs';
import Icons from '@site/static/icons/cards';

export default function ExpressionEngine(): JSX.Element {
  return (
    <Layout
      title="ExpressionEngine"
      description="The most dependable and user-friendly add-ons for ExpressionEngine CMS."
    >
      <div className="flex">
        <LeftNav />
        <div className="flex flex-col gap-3 md:ml-72 p-8 w-full">
          <main className="max-w-6xl my-3">
            <div className="flex flex-col">
              <span className="page-section">Add-ons</span>
              <h1>ExpressionEngine CMS</h1>
              <p>Choose an ExpressionEngine add-on from below:</p>

              <FlexCards
                items={[
                  {
                    title: 'Freeform',
                    icon: Icons.FreeformIcon,
                    fullCardLink: '/expressionengine/freeform/v3',
                  },
                  {
                    title: 'Calendar',
                    icon: Icons.CalendarIcon,
                    fullCardLink: '/expressionengine/calendar/v5',
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

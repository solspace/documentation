import Layout from '@theme/Layout';

import { ThemedIdealImage } from '@site/src/components/utils';
import { Footer, LeftNav } from '@site/src/components/layout';

import CalendarIntroLight from '@site/static/img/intro/calendar-light.png';
import CalendarIntroDark from '@site/static/img/intro/calendar-dark.png';

import {
  SimpleTextLink,
  PrimaryButtonWithLink,
  FlexButton,
} from '@site/src/components/utils';

export function EECalendarPageHeader() {
  return (
    <header className="flex flex-col px-4 m-auto items-center gap-6 mt-32 max-w-7xl">
      <ThemedIdealImage
        sources={{
          light: CalendarIntroLight,
          dark: CalendarIntroDark,
        }}
        className="max-w-3xl"
        alt="Calendar for ExpressionEngine CMS"
      />
      <p className="text-center">
        ExpressionEngine users can rely on the Calendar addon for efficient
        event management and calendaring. With its own field type, you can
        easily manage Calendar Events with power and flexibility. Its intuitive
        interface makes creating events with complex recurring rules and
        exclusions easy. The flexible templating options ensure you can
        customize your calendar to meet your needs. You can trust the quality
        and support provided by the Solspace team.
      </p>
      <FlexButton
        items={[
          {
            to: '/expressionengine/calendar/v5#reliability',
            label: 'Feature Tour',
          },
          { to: '/expressionengine/calendar/v5#compare', label: 'Compare' },
          {
            to: '/expressionengine/calendar/v5/guides/getting-started/',
            label: 'Getting Started',
          },
        ]}
      />
      <small>
        <SimpleTextLink
          to="https://expressionengine.com/add-ons/calendar"
          label="RISK-FREE 30 DAY SATISFACTION GUARANTEE!"
        />
      </small>
    </header>
  );
}

export default function EECalendar(): JSX.Element {
  return (
    <Layout
      title="Calendar for ExpressionEngine"
      description="The most dependable and user-friendly event management add-on for ExpressionEngine CMS."
    >
      <div className="flex">
        <LeftNav />

        <div className="flex flex-col gap-3 md:ml-72 p-8">
          <EECalendarPageHeader />
          <main>
            <section className="container">
              <div className="flex flex-col gap-2 items-center my-20 py-10 lg:mx-60  bg-slate-200 dark:bg-black rounded-lg">
                <h4 className="text-lg">
                  <i>Select a version below:</i>
                </h4>
                <div className="flex flex-wrap justify-center gap-4">
                  {[
                    {
                      label: 'v5 (latest)',
                      link: '/expressionengine/calendar/v5/',
                      latest: true,
                    },
                    { label: 'v4', link: '/expressionengine/calendar/v4/' },
                    { label: 'v3', link: '/expressionengine/calendar/v3/' },
                    { label: 'v2', link: '/expressionengine/calendar/v2/' },
                    { label: 'v1', link: '/expressionengine/calendar/v1/' },
                  ].map((item, index) => (
                    <PrimaryButtonWithLink
                      key={`${item.link}-${index}`}
                      to={item.link}
                      label={item.label}
                      classes={`${
                        item?.latest ? '!bg-green-600' : '!bg-gray-800'
                      } hover:opacity-90`}
                    />
                  ))}
                </div>
              </div>
            </section>
          </main>
          <footer className="docusaurus-mt-lg docs-footer">
            <Footer />
          </footer>
        </div>
      </div>
    </Layout>
  );
}

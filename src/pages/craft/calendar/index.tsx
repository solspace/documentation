import Layout from '@theme/Layout';

import { ThemedIdealImage } from '@site/src/components/utils';
import { Footer, LeftNav } from '@site/src/components/layout';

import CalendarIntroBlackPhoto from '@site/static/img/craft-calendar-intro-black.png';

import {
  SimpleTextLink,
  PrimaryButtonWithLink,
  FlexButton,
} from '@site/src/components/utils';

export function CraftCalendarPageHeader() {
  return (
    <header className="flex flex-col px-4 m-auto items-center gap-6 mt-32 max-w-7xl">
      <ThemedIdealImage
        sources={{
          light: CalendarIntroBlackPhoto,
          dark: CalendarIntroBlackPhoto,
        }}
        className="max-w-3xl"
        alt="Freeform 5 for Craft CMS"
      />
      <span className="italic font-bold text-2xl text-[#ff6624]">
        Hassle-free event management.
      </span>
      <p className="text-center">
        Craft CMS users can rely on the Calendar plugin for efficient event
        management and calendaring. With its own element type, you can easily
        manage Calendar Events with power and flexibility. Its intuitive
        interface makes creating events with complex recurring rules and
        exclusions easy. The flexible templating options ensure you can
        customize your calendar to meet your needs. You can trust the quality
        and support provided by the Solspace team.
      </p>
      <FlexButton
        items={[
          { to: '/craft/calendar/v5#reliability', label: 'Feature Tour' },
          { to: '/craft/calendar/v5#compare', label: 'Compare' },
          {
            to: '/craft/calendar/v5/guides/getting-started',
            label: 'Getting Started',
          },
        ]}
      />
      <small>
        <SimpleTextLink
          to="https://plugins.craftcms.com/calendar"
          label="INSTALL A FREE, UNLIMITED TRIAL TODAY!"
        />
      </small>
    </header>
  );
}

export default function CraftCalendar(): JSX.Element {
  return (
    <Layout
      title="Calendar for Craft"
      description="The most dependable and user-friendly forms plugin for Craft CMS."
    >
      <div className="flex">
        <LeftNav />

        <div className="flex flex-col gap-3 md:ml-72 p-8">
          <CraftCalendarPageHeader />
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
                      link: '/craft/calendar/v5/',
                      latest: true,
                    },
                    { label: 'v4', link: '/craft/calendar/v4/' },
                    { label: 'v3', link: '/craft/calendar/v2/' },
                    { label: 'v2', link: '/craft/calendar/v2/' },
                    { label: 'v1', link: '/craft/calendar/v1/' },
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

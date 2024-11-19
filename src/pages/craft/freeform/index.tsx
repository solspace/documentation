import Layout from '@theme/Layout';

import { ThemedIdealImage } from '@site/src/components/utils';
import { Footer, LeftNav } from '@site/src/components/layout';

import FreeformIntroLight from '@site/static/img/intro/freeform-light.png';
import FreeformIntroDark from '@site/static/img/intro/freeform-dark.png';

import {
  SimpleTextLink,
  PrimaryButtonWithLink,
  FlexButton,
} from '@site/src/components/utils';

export function CraftFreeformPageHeader() {
  return (
    <header className="flex flex-col px-4 m-auto items-center gap-6 mt-32 max-w-7xl">
      <ThemedIdealImage
        sources={{
          light: FreeformIntroLight,
          dark: FreeformIntroDark,
        }}
        className="max-w-3xl"
        alt="Freeform for Craft CMS"
      />
      <p className="text-center">
        Freeform is a versatile form-building tool that can adjust to the
        evolving needs of your project, whether it's a simple or complex form.
        It offers effective spam protection and an easy-to-use form builder with
        powerful field types and built-in convenience features that your users
        will love. Freeform integrates seamlessly with popular CRMs, email
        marketing services, Craft elements, and more. It includes fully
        customizable ready-to-go templates and also offers headless support.
      </p>
      <FlexButton
        items={[
          { to: '/craft/freeform/v5#reliability', label: 'Feature Tour' },
          { to: '/craft/freeform/v5#compare', label: 'Compare' },
          {
            to: '/craft/freeform/v5/guides/getting-started/',
            label: 'Getting Started',
          },
        ]}
      />
      <small>
        <SimpleTextLink
          to="https://plugins.craftcms.com/freeform"
          label="INSTALL A FREE, UNLIMITED TRIAL TODAY!"
        />
      </small>
    </header>
  );
}

export default function CraftFreeformFreeform(): JSX.Element {
  return (
    <Layout
      title="Freeform for Craft"
      description="The most dependable and user-friendly forms plugin for Craft CMS."
    >
      <div className="flex">
        <LeftNav />

        <div className="flex flex-col gap-3 md:ml-72 p-8">
          <CraftFreeformPageHeader />
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
                      link: '/craft/freeform/v5/',
                      latest: true,
                    },
                    { label: 'v4', link: '/craft/freeform/v4/' },
                    { label: 'v3', link: '/craft/freeform/v3/' },
                    { label: 'v2', link: '/craft/freeform/v2/' },
                    { label: 'v1', link: '/craft/freeform/v1/' },
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

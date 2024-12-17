import Layout from '@theme/Layout';

import { ThemedIdealImage } from '@site/src/components/utils';
import { Footer } from '@site/src/components/layout';

import FreeformIntroLight from '@site/static/img/intro/freeform-light.png';
import FreeformIntroDark from '@site/static/img/intro/freeform-dark.png';

import {
  SimpleTextLink,
  PrimaryButtonWithLink,
  FlexButton,
} from '@site/src/components/utils';

export function EEFreeformPageHeader() {
  return (
    <header className="flex flex-col px-4 m-auto items-center gap-6 mt-10 max-w-7xl">
      <ThemedIdealImage
        sources={{
          light: FreeformIntroLight,
          dark: FreeformIntroDark,
        }}
        className="max-w-3xl"
        alt="Freeform for ExpressionEngine CMS"
      />
      <p className="text-center">
        Freeform is a versatile form-building tool that can adjust to the
        evolving needs of your project, whether it's a simple or complex form.
        It offers effective spam protection and an easy-to-use form builder with
        powerful field types and built-in convenience features that your users
        will love. Freeform integrates seamlessly with popular CRMs, email
        marketing services, and more. It also includes fully customizable
        ready-to-go templates.
      </p>
      <FlexButton
        items={[
          { to: '/craft/freeform/v3#reliability', label: 'Feature Tour' },
          { to: '/craft/freeform/v3#compare', label: 'Compare' },
          {
            to: '/craft/freeform/v3/guides/getting-started/',
            label: 'Getting Started',
          },
        ]}
      />
      <small>
        <SimpleTextLink
          to="https://expressionengine.com/add-ons/freeform"
          label="RISK-FREE 30 DAY SATISFACTION GUARANTEE!"
        />
      </small>
    </header>
  );
}

export default function EEFreeformFreeform(): JSX.Element {
  return (
    <Layout
      title="Freeform for ExpressionEngine"
      description="The most dependable and user-friendly forms plugin for ExpressionEngine CMS."
    >
      <div className="flex">

        <div className="flex flex-col gap-3 mx-auto p-8">
          <EEFreeformPageHeader />
          <main>
            <section className="container">
              <div className="flex flex-col gap-2 items-center my-10 py-5 bg-slate-200 dark:bg-neutral-950 rounded-lg">
                <h4 className="text-lg product-version-picker">
                  <i>Select a version below:</i>
                </h4>
                <div className="flex flex-wrap justify-center gap-4">
                  {[
                    {
                      label: 'v3 (latest)',
                      link: '/expressionengine/freeform/v3/',
                      latest: true,
                    },
                    { label: 'v2', link: '/expressionengine/freeform/v2/' },
                    { label: 'v1', link: '/expressionengine/freeform/v1/' },
                    {
                      label: 'Classic',
                      link: '/expressionengine/freeform/classic',
                    },
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

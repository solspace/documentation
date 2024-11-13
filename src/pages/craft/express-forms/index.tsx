import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Admonition from '@theme/Admonition';

import {
  SimpleTextLink,
  ThemedIdealImage,
  PrimaryButtonWithLink,
} from '@site/src/components/utils';
import { Footer, LeftNav } from '@site/src/components/layout';

import FreeformIntroBlackPhoto from '@site/static/img/craft-express-forms-intro-black.png';

function CraftExpressFormsPageHeader() {
  return (
    <header className="flex flex-col px-4 m-auto items-center gap-6 mt-32 max-w-7xl">
      <ThemedIdealImage
        sources={{
          light: FreeformIntroBlackPhoto,
          dark: FreeformIntroBlackPhoto,
        }}
        className="max-w-3xl"
        alt="Freeform 5 for Craft CMS"
      />
      <p className="text-center">
        Express Forms is a free and dependable form building plugin for Craft
        CMS. It offers more features than the native Craft Contact Form plugin,
        is easy to use, and highly customizable for developers. It also has
        popular API integrations built-in, saving development time.
      </p>
      <small>
        <SimpleTextLink
          to="https://plugins.craftcms.com/freeform"
          label="INSTALL A FREE, UNLIMITED TRIAL TODAY!"
        />
      </small>
    </header>
  );
}

export default function CraftExpressFormsFreeform(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="The most dependable and user-friendly forms plugin for Craft CMS."
    >
      <div className="flex">
        <LeftNav />

        <div className="flex flex-col gap-3 md:ml-72 max-w-7xl p-8">
          <Admonition type="warning">
            <h4>Important Notice - May 16, 2024</h4>
            <h6>The Express Forms plugin has been discontinued.</h6>
            <p>
              It was originally created as a free and reliable form-building
              plugin for Craft CMS when other options were limited. It allowed
              for experimentation and trying different approaches, which was
              challenging to do with Freeform due to legacy constraints. Over
              time, we incorporated new features and improved approaches from
              Express Forms into{' '}
              <SimpleTextLink label="Freeform" to="/craft/freeform" />. With the
              significant rewrite of Freeform 5, we addressed many limitations
              related to extending and custom module development. Now,{' '}
              <SimpleTextLink label="Freeform v5" to="/craft/freeform/v5" />{' '}
              includes three editions: <i>Express</i>, <i>Lite</i>, and{' '}
              <i>Pro</i>. The <i>Express</i> edition of Freeform is free and
              suitable for most small sites that only require a simple contact
              form while offering many additional features and benefits.
            </p>
            <hr className="bg-gray-500" />
            <h4>What does this mean?</h4>
            <ul>
              <li>Express Forms will not have a Craft 5-compatible version.</li>
              <li>
                Freeform 5 works on both Craft 4 and 5 and includes a{' '}
                <SimpleTextLink
                  label="migration utility"
                  to="/craft/freeform/v5/setup/express-forms-migration/"
                />{' '}
                from Express Forms.
              </li>
              <li>
                There will be no further updates for Express Forms 2.x, but
                support and critical bug fixes will continue.
              </li>
              <li>
                Customers with a Pro license of Express Forms will receive a
                free license to Freeform Pro for the transition. If we were
                unable to reach you, please{' '}
                <SimpleTextLink label="get in touch with us." to="/support/" />
              </li>
            </ul>
            <hr className="bg-gray-500" />
            <p>
              Please see the{' '}
              <SimpleTextLink
                label="Freeform migration guide"
                to="/craft/freeform/v5/setup/express-forms-migration/"
              />{' '}
              for more information.
            </p>
          </Admonition>

          <CraftExpressFormsPageHeader />
          <main>
            <section className="container">
              <div className="flex flex-col gap-2 items-center my-20 py-10 lg:mx-60  bg-slate-200 dark:bg-black rounded-lg">
                <h4 className="text-lg">
                  <i>Select a version below:</i>
                </h4>
                <div className="flex flex-wrap justify-center gap-4">
                  {[
                    {
                      label: 'v2 (Discontinued)',
                      link: '/craft/express-forms/v2/',
                    },
                    { label: 'v1', link: '/craft/express-forms/v1/' },
                  ].map((item, index) => (
                    <PrimaryButtonWithLink
                      key={`${item.link}-${index}`}
                      to={item.link}
                      label={item.label}
                      classes="!bg-gray-600 hover:opacity-90"
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

import type { JSX } from 'react';
import Layout from '@theme/Layout';
import { Footer } from '@site/src/components/layout';
import landingStyles from '@site/src/components/layout/LandingPage.module.css';
import styles from './LicenseAgreement.module.css';

export default function LicenseAgreement(): JSX.Element {
  return (
    <Layout
      title="License Agreement"
      description="License terms for Solspace plugins and add-ons."
    >
      <div className={landingStyles.shell}>
        <main className={`${landingStyles.page} ${landingStyles.readingPage}`}>
          <header className={landingStyles.intro}>
            <h1 id="license-agreement-title">License Agreement</h1>
          </header>

          <article className={`${landingStyles.readingPanel} ${styles.agreement}`} aria-labelledby="license-agreement-title">
            <p>
              This license is a legal agreement between you and Solspace, Inc.
              for the use of Solspace Software (the "Software"). By downloading
              any Solspace add-ons or plugins, you agree to be bound by the
              terms and conditions of this license. Solspace, Inc. reserves the
              right to alter this agreement at any time, for any reason, without
              notice.
            </p>
            <p className={styles.revision}>
              Revised on: <time dateTime="2017-10-16">October 16, 2017</time>
            </p>
            <h2>Permitted Use</h2>
            <p>
              One license grants the right to perform one installation of the
              Software on a live/production website. Development, staging and
              sandbox servers do not require an additional purchase of a
              license. Each additional installation of the Software on a
              live/production website requires an additional purchased license.
            </p>

            <h2>Restrictions</h2>
            <p>
              Unless you have been granted prior, written consent from Solspace,
              Inc., you may not:
            </p>
            <ul>
              <li>
                Reproduce, distribute, or transfer the Software, or portions
                thereof, to any third party.
              </li>
              <li>
                Sell, rent, lease, assign, or sublet the Software or portions
                thereof.
              </li>
              <li>Grant rights to any other person.</li>
              <li>
                Use the Software in violation of any U.S. or international law
                or regulation.
              </li>
            </ul>

            <h2>Display of Copyright Notices</h2>
            <p>
              All copyright and proprietary notices and logos in the Control
              Panel and within the Software files must remain intact.
            </p>

            <h2>Making Copies</h2>
            <p>
              You may make copies of the Software for back-up purposes, provided
              that you reproduce the Software in its original form and with all
              proprietary notices on the back-up copy.
            </p>

            <h2>Software Modification</h2>
            <p>
              You may alter, modify, or extend the Software for your own use, or
              commission a third-party to perform modifications for you, but you
              may not resell, redistribute or transfer the modified or
              derivative version without prior written consent from Solspace,
              Inc. Components from the Software may not be extracted and used in
              other programs without prior written consent from Solspace, Inc.
            </p>

            <h2>Technical Support</h2>
            <p>
              Technical support is available only through Solspace, Inc. No
              warranty is provided and no liability is assumed by Solspace, Inc.
              for support services offered or provided. No representations or
              guarantees are made regarding the response time in which support
              questions are answered.
            </p>

            <h2>Refunds</h2>
            <p>
              Solspace offers refunds on software within 30 days of purchase.
              Contact{' '}
              <a href="mailto:support@solspace.com" className="external-link">
                support@solspace.com
              </a>{' '}
              for assistance.
            </p>

            <h2>Indemnity</h2>
            <p>
              You agree to indemnify and hold harmless Solspace, Inc. for any
              third-party claims, actions or suits, as well as any related
              expenses, liabilities, damages, settlements or fees arising from
              your use or misuse of the Software, or a violation of any terms of
              this license.
            </p>

            <h2>Disclaimer of Warranty</h2>
            <p>
              The Software is provided "AS IS", without warranty of any kind,
              expressed or implied, including, but not limited to, warranties of
              quality, performance, non-infringement, merchantability, or
              fitness for a particular purpose. Further, Solspace, Inc. does not
              warrant that the Software or any related service will always be
              available.
            </p>

            <h2>Limitations of Liability</h2>
            <p>
              You assume all risk associated with the installation and use of
              the Software. In no event shall the authors or copyright holders
              of the Software be liable for claims, damages or other liability
              arising from, out of, or in connection with the Software. License
              holders are solely responsible for determining the appropriateness
              of use and assume all risks associated with its use, including but
              not limited to the risks of program errors, damage to equipment,
              loss of data or software programs, or unavailability or
              interruption of operations.
            </p>
          </article>
        </main>
      </div>
      <footer className="docusaurus-mt-lg docs-footer">
        <Footer showDeveloperSupport={false} />
      </footer>
    </Layout>
  );
}

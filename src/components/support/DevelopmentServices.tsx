import useBaseUrl from '@docusaurus/useBaseUrl';
import Icons from '@site/static/icons/cards';
import DocsFreeform from '@site/src/components/forms/DocsFreeform';
import styles from './SupportPage.module.css';

const hostedInquiryUrl = 'https://support.solspace.com/software/custom-development';

const services = [
  {
    title: 'Build and integrate',
    description: 'Create custom modules or plugin features, connect Freeform, Calendar, or AI Assistant to other systems, and build advanced templates or headless front ends.',
    icon: Icons.CodeIcon,
  },
  {
    title: 'Upgrade and troubleshoot',
    description: 'Manage complex upgrades and migrations, improve performance and reliability, or get help diagnosing an urgent issue.',
    icon: Icons.UpdateArrowsIcon,
  },
  {
    title: 'Plan and review',
    description: 'Talk through architecture and workflows, get a second pair of eyes on your templates or code, and work through implementation questions.',
    icon: Icons.EaselIcon,
  },
];

const process = [
  {
    title: 'Share your project',
    detail: 'Tell us what you’re building, what you want to achieve, and where you’re stuck.',
  },
  {
    title: 'Define the scope',
    detail: 'We’ll review your request and suggest approaches or architecture where useful.',
  },
  {
    title: 'Get an estimate',
    detail: 'Once we agree on the scope, we’ll send an estimate and timeline.',
  },
];

export default function DevelopmentServices() {
  const icons = useBaseUrl('/icons/cards');

  return (
    <section className={styles.ticketPanel} aria-labelledby="development-heading">
      <div className={styles.developmentContent}>
        <div className={styles.developmentDescription}>
          <header className={styles.developmentIntro}>
            <h2 id="development-heading">Custom development services</h2>
            <p>
              Work directly with the Solspace team to extend our plugins, connect them to your
              other tools, or work through a complex technical problem.
            </p>
            <a className={styles.inquiryLink} href="#support-form">
              <span className={styles.linkLabel}>Tell us about your project</span> <span aria-hidden="true">↓</span>
            </a>
          </header>
          <section aria-labelledby="development-services">
            <h3 id="development-services">What we can help with</h3>
            <ul className={styles.serviceList} role="list">
              {services.map(({ title, description, icon }) => (
                <li key={title}>
                  <span
                    className={styles.serviceIcon}
                    style={{ maskImage: `url(${icons}/${icon}.svg)` }}
                    aria-hidden="true"
                  />
                  <div>
                    <h4>{title}</h4>
                    <p>{description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
          <section className={styles.developmentProcess} aria-labelledby="development-process">
            <h3 id="development-process">How it works</h3>
            <ol role="list">
              {process.map(({ title, detail }, index) => (
                <li key={title}>
                  <span className={styles.processNumber} aria-hidden="true">{index + 1}</span>
                  <div>
                    <strong>{title}</strong>
                    <p>{detail}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p>
              You’ll work directly with developers who know the plugins, with practical
              guidance and regular progress updates throughout the project.
            </p>
          </section>
        </div>
        <section className={`${styles.developmentInquiry} ${styles.supportForm}`} id="support-form" aria-labelledby="inquiry-heading">
          <h3 id="inquiry-heading">Tell us about your project</h3>
          <p>
            Share your goals, what you’re building, and where you could use a hand. If you’re unsure
            whether your request falls under support or custom development, we can help you decide.
          </p>
          <DocsFreeform
            handle="customDevelopment"
            fallback={(
              <p className={styles.inquiryFallback} role="status">
                The inline form is unavailable. You can still <a href={hostedInquiryUrl}>send a project inquiry</a>.
              </p>
            )}
          />
        </section>
      </div>
    </section>
  );
}

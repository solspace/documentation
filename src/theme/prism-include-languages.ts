import siteConfig from '@generated/docusaurus.config';

export default function prismIncludeLanguages(PrismObject) {
  const {
    themeConfig: { prism },
  } = siteConfig;
  const { additionalLanguages } = prism as { additionalLanguages: string[] };

  // Prism components work on the Prism instance on the window, while prism-
  // react-renderer uses its own Prism instance. We temporarily mount the
  // instance onto window, import components to enhance it, then remove it to
  // avoid polluting global namespace.
  // You can mutate PrismObject: registering plugins, deleting languages... As
  // long as you don't re-assign it
  globalThis.Prism = PrismObject;

  additionalLanguages.forEach((lang) => {
    if (lang === 'twig') {
      require(`@site/src/utils/lang/prism-twig`);
      return;
    }

    // eslint-disable-next-line global-require, import/no-dynamic-require
    require(`prismjs/components/prism-${lang}`);
  });

  // Shell transcripts use Bash for the command and a separate grammar for output.
  require('prismjs/components/prism-bash');
  // Prism's default Bash pattern skips hyphenated options such as --age-in-days.
  PrismObject.languages.bash.parameter.pattern = /(^|\s)-{1,2}(?:\w+:[+-]?)?\w+(?:[.-]\w+)*(?=[=\s]|$)/;
  require('prismjs/components/prism-shell-session');

  const shellSession = PrismObject.languages['shell-session'];
  if (shellSession?.output instanceof RegExp) {
    shellSession.output = {
      pattern: shellSession.output,
      inside: {
        'terminal-warning': /^WARNING:[^\r\n]*/m,
      },
    };
  }

  delete globalThis.Prism;
}

import {
  SimpleTextLink,
  PrimaryButtonWithLink,
} from '@site/src/components/utils';

const footerMenu = {
  links: [
    { label: 'Home', to: '/' },
    { label: 'Support', to: 'https://support.solspace.com/' },
    {
      label: 'Premium Support',
      to: '/support/premium/',
    },
    {
      label: 'License Agreement',
      to: '/license-agreement/',
    },
    {
      label: 'Legacy Account',
      to: '/legacy-account/',
    },
  ],
  copyright: `© ${new Date().getFullYear()} Solspace, Inc.`,
};

const Footer: React.FC = () => {
  const { links, copyright } = footerMenu;

  return (
    <div className="flex flex-col m-auto mb-0 mt-15 items-center gap-6 max-w-7xl">
      <div className="pt-12 pb-8 px-6 md:px-12 lg:px-24 lg:pb-12 text-center rounded-lg transition-all duration-500">
        <h4 className="text-3xl md:text-4xl font-bold mb-4">
          Need Extra Help?
        </h4>
        <p className="text-md md:text-lg mt-4 mb-6">
          Stuck on a tough development problem? Our expert team at Solspace is
          here to help you overcome any challenges and keep your projects on
          track.
        </p>
        <PrimaryButtonWithLink
          to="https://solspace.com/services/developer-support/"
          label="Get Developer Support Now"
        />
      </div>
      <div className="flex flex-wrap justify-center gap-5 pb-8 social-icons">
        <a
          href="https://github.com/solspace"
          target="_blank"
          rel="noopener noreferrer"
          title="GitHub"
        >
          <svg
            enableBackground="new 0 0 24 24"
            height="512"
            viewBox="0 0 24 24"
            width="512"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m12 .5c-6.63 0-12 5.28-12 11.792 0 5.211 3.438 9.63 8.205 11.188.6.111.82-.254.82-.567 0-.28-.01-1.022-.015-2.005-3.338.711-4.042-1.582-4.042-1.582-.546-1.361-1.335-1.725-1.335-1.725-1.087-.731.084-.716.084-.716 1.205.082 1.838 1.215 1.838 1.215 1.07 1.803 2.809 1.282 3.495.981.108-.763.417-1.282.76-1.577-2.665-.295-5.466-1.309-5.466-5.827 0-1.287.465-2.339 1.235-3.164-.135-.298-.54-1.497.105-3.121 0 0 1.005-.316 3.3 1.209.96-.262 1.98-.392 3-.398 1.02.006 2.04.136 3 .398 2.28-1.525 3.285-1.209 3.285-1.209.645 1.624.24 2.823.12 3.121.765.825 1.23 1.877 1.23 3.164 0 4.53-2.805 5.527-5.475 5.817.42.354.81 1.077.81 2.182 0 1.578-.015 2.846-.015 3.229 0 .309.21.678.825.56 4.801-1.548 8.236-5.97 8.236-11.173 0-6.512-5.373-11.792-12-11.792z" />
          </svg>
        </a>
        <a
          href="https://x.com/solspace"
          target="_blank"
          rel="noopener noreferrer"
          title="X (Twitter)"
        >
          <svg
            enableBackground="new 0 0 1226.37 1226.37"
            viewBox="0 0 1226.37 1226.37"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m727.348 519.284 446.727-519.284h-105.86l-387.893 450.887-309.809-450.887h-357.328l468.492 681.821-468.492 544.549h105.866l409.625-476.152 327.181 476.152h357.328l-485.863-707.086zm-144.998 168.544-47.468-67.894-377.686-540.24h162.604l304.797 435.991 47.468 67.894 396.2 566.721h-162.604l-323.311-462.446z" />
          </svg>
        </a>
        <a
          href="https://bsky.app/profile/solspace.com"
          target="_blank"
          rel="noopener noreferrer"
          title="Bluesky"
        >
          <svg
            height="512"
            viewBox="0 0 60 60"
            width="512"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m30 27.013c-2.717-5.251-10.115-15.036-16.994-19.862-6.59-4.623-9.104-3.822-10.752-3.082-1.907.857-2.254 3.767-2.254 5.479s.945 14.038 1.561 16.095c2.035 6.798 9.282 9.095 15.956 8.358.341-.051.688-.097 1.038-.14-.344.055-.69.101-1.038.14-9.78 1.439-18.466 4.981-7.074 17.585 12.532 12.894 17.175-2.765 19.557-10.704 2.382 7.939 5.127 23.033 19.333 10.704 10.667-10.704 2.93-16.145-6.85-17.585-.348-.038-.694-.085-1.038-.139.351.042.696.089 1.038.139 6.674.738 13.92-1.56 15.956-8.357.617-2.058 1.561-14.383 1.561-16.096 0-1.712-.347-4.622-2.254-5.479-1.648-.74-4.162-1.541-10.752 3.082-6.879 4.826-14.277 14.611-16.994 19.862z" />
          </svg>
        </a>
        <a
          href="https://mastodon.social/@solspace"
          target="_blank"
          rel="me noopener noreferrer"
          title="Mastodon"
        >
          <svg
            height="512"
            viewBox="0 0 512 512"
            width="512"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m509.934 113.352c-7.886-55.012-58.977-98.366-119.541-106.766-10.218-1.42-48.932-6.586-138.613-6.586h-.67c-89.705 0-108.95 5.166-119.168 6.586-58.878 8.168-112.647 47.123-125.692 102.786-6.275 27.413-6.944 57.805-5.779 85.683 1.662 39.98 1.984 79.889 5.853 119.705 2.675 26.448 7.341 52.686 13.963 78.516 12.401 47.705 62.598 87.405 111.779 103.602 52.655 16.89 109.28 19.694 163.538 8.098 5.968-1.303 11.871-2.816 17.707-4.538 13.17-3.933 28.621-8.331 39.98-16.057.156-.109.284-.248.374-.41.09-.161.14-.339.146-.521v-38.583c-.002-.17-.045-.337-.126-.489s-.196-.286-.339-.391-.309-.178-.485-.216c-.177-.036-.361-.036-.537.002-34.762 7.792-70.384 11.697-106.124 11.636-61.506 0-78.049-27.39-82.786-38.793-3.808-9.854-6.226-20.134-7.192-30.577-.01-.176.024-.351.1-.512.075-.16.191-.302.335-.413.146-.11.317-.188.499-.225.183-.038.373-.034.554.009 34.183 7.739 69.224 11.645 104.388 11.636 8.457 0 16.889 0 25.346-.209 35.366-.931 72.642-2.63 107.438-9.006.868-.163 1.736-.303 2.48-.512 54.885-9.89 107.116-40.933 112.423-119.542.199-3.095.695-32.417.695-35.628.025-10.914 3.745-77.421-.546-118.285zm-84.472 196.149h-57.712v-132.643c0-27.925-12.401-42.167-37.624-42.167-27.727 0-41.615 16.848-41.615 50.125v72.605h-57.365v-72.605c0-33.277-13.913-50.125-41.641-50.125-25.074 0-37.599 14.242-37.624 42.167v132.643h-57.662v-136.669c0-27.925 7.598-50.11 22.792-66.555 15.674-16.405 36.235-24.829 61.755-24.829 29.538 0 51.859 10.657 66.739 31.951l14.361 22.619 14.384-22.619c14.88-21.294 37.202-31.951 66.69-31.951 25.496 0 46.055 8.424 61.779 24.829 15.195 16.43 22.792 38.614 22.792 66.555z" />
          </svg>
        </a>
        <a
          href="https://threads.net/@solspacecom"
          target="_blank"
          rel="noopener noreferrer"
          title="Threads"
        >
          <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
            <path d="m259.965 512h-.147c-76.391-.518-135.117-25.703-174.575-74.879-35.125-43.755-53.232-104.638-53.84-180.936v-.37c.609-76.316 18.715-137.182 53.84-180.936 39.439-49.176 98.184-74.363 174.556-74.879h.295c58.56.387 107.551 15.451 145.626 44.732 35.789 27.529 60.977 66.766 74.879 116.642l-43.514 12.133c-23.545-84.467-83.138-127.65-177.138-128.332-62.064.442-108.99 19.95-139.505 57.971-28.58 35.605-43.349 87.03-43.884 152.836.553 65.825 15.322 117.25 43.884 152.837 30.516 38.019 77.441 57.526 139.505 57.969 55.941-.405 92.967-13.44 123.76-43.606 35.143-34.426 34.498-76.649 23.25-102.333-6.619-15.139-18.643-27.75-34.85-37.302-4.073 28.802-13.239 52.181-27.399 69.791-18.882 23.508-45.653 36.361-79.544 38.185-25.648 1.382-50.355-4.682-69.531-17.092-22.68-14.677-35.955-37.136-37.375-63.244-1.383-25.389 8.685-48.733 28.34-65.734 18.789-16.244 45.211-25.776 76.427-27.528 23.011-1.291 44.528-.276 64.424 3.042-2.637-15.839-7.983-28.395-15.949-37.467-10.953-12.483-27.898-18.862-50.337-19.01h-.627c-18.014 0-42.482 4.941-58.081 28.137l-37.485-25.205c20.872-31.032 54.781-48.106 95.548-48.106h.922c68.167.424 108.751 42.113 112.789 114.926 2.321.979 4.591 1.991 6.84 3.043 31.807 14.954 55.057 37.597 67.263 65.476 17.001 38.867 18.568 102.205-33.041 152.725-39.422 38.609-87.289 56.034-155.197 56.496h-.147l.018.019zm21.389-249.418c-5.163 0-10.4.147-15.748.461-39.181 2.213-63.594 20.154-62.211 45.709 1.457 26.773 30.995 39.218 59.372 37.689 26.127-1.403 60.129-11.562 65.825-79.158-14.42-3.078-30.275-4.701-47.239-4.701z" />
          </svg>
        </a>
        <a
          href="https://facebook.com/Solspace"
          target="_blank"
          rel="noopener noreferrer"
          title="Facebook"
        >
          <svg
            enableBackground="new 0 0 513.36 513.36"
            height="512"
            viewBox="0 0 513.36 513.36"
            width="512"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m513.36 258.235c0 128.1-93.99 234.3-216.68 253.57v-178.89h59.65l11.35-74h-71v-48.02c0-20.25 9.92-39.98 41.72-39.98h32.28v-63s-29.3-5-57.31-5c-58.47 0-96.69 35.44-96.69 99.6v56.4h-65v74h65v178.89c-122.67-19.29-216.68-125.48-216.68-253.57 0-141.76 114.92-256.68 256.68-256.68s256.68 114.92 256.68 256.68z" />
          </svg>
        </a>
        <a
          href="https://youtube.com/@solspace-inc"
          target="_blank"
          rel="noopener noreferrer"
          title="YouTube"
        >
          <svg
            enableBackground="new 0 0 512 512"
            height="512"
            viewBox="0 0 512 512"
            width="512"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m501.3 131.96c-5.89-22.17-23.24-39.63-45.26-45.56-39.93-10.76-200.04-10.76-200.04-10.76s-160.11 0-200.04 10.76c-22.02 5.93-39.37 23.39-45.26 45.56-10.7 40.19-10.7 124.04-10.7 124.04s0 83.85 10.7 124.04c5.89 22.17 23.24 39.63 45.26 45.56 39.93 10.76 200.04 10.76 200.04 10.76s160.11 0 200.04-10.76c22.02-5.93 39.37-23.39 45.26-45.56 10.7-40.19 10.7-124.04 10.7-124.04s0-83.85-10.7-124.04zm-297.66 200.17v-152.26l133.81 76.13z" />
          </svg>
        </a>
        <a
          href="https://linkedin.com/company/solspace"
          target="_blank"
          rel="noopener noreferrer"
          title="LinkedIn"
        >
          <svg
            height="512"
            viewBox="0 0 512 512"
            width="512"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m436.248 436.258h-75.862v-118.807c0-28.332-.506-64.802-39.456-64.802-39.512 0-45.557 30.868-45.557 62.739v120.862h-75.861v-244.316h72.828v33.388h1.019c14.851-25.391 42.462-40.557 71.857-39.466 76.889 0 91.067 50.576 91.067 116.373zm-322.336-277.721c-24.314.005-44.027-19.703-44.032-44.017-.005-24.315 19.703-44.029 44.016-44.034 24.313-.004 44.027 19.704 44.032 44.017.004 24.315-19.702 44.031-44.016 44.034zm37.931 277.722h-75.941v-244.325h75.941zm322.226-436.224h-436.288c-20.62-.233-37.529 16.285-37.781 36.905v438.112c.242 20.631 17.151 37.165 37.781 36.945h436.288c20.672.259 37.645-16.274 37.931-36.945v-438.143c-.294-20.662-17.27-37.178-37.931-36.906" />
          </svg>
        </a>
      </div>
      <div className="flex flex-wrap justify-center gap-2 sm:gap-6 footer-links">
        {links.map((link, index) => (
          <SimpleTextLink
            classes="text-black dark:text-white"
            key={index}
            to={link.to}
            label={link.label}
          />
        ))}
      </div>
      <div className="flex flex-col items-center">
        <span>{copyright}</span>
        <p className="text-xs italic">
          Icons created by{' '}
          <a
            href="https://www.flaticon.com/authors/freepik"
            title="Freepik from Flaticon"
          >
            Freepik from Flaticon
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export { Footer };

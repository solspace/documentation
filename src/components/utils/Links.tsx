import Link from '@docusaurus/Link';
import clsx from 'clsx';

interface SimpleTextLink {
  to: string;
  label?: string;
  classes?: string;
}

const SimpleTextLink: React.FC<SimpleTextLink> = ({ to, label, classes }) => {
  return (
    <Link to={to} className={clsx('font-medium text-link', classes)}>
      {label}
    </Link>
  );
};

export { SimpleTextLink };

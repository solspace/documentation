import Link from '@docusaurus/Link';

interface SimpleTextLink {
  to: string;
  label?: string;
  classes?: string;
}

const SimpleTextLink: React.FC<SimpleTextLink> = ({ to, label, classes }) => {
  return (
    <Link to={to} className={`font-medium text-link ${classes}`}>
      {label}
    </Link>
  );
};

export { SimpleTextLink };

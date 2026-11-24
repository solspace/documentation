type BadgeType = 'lite' | 'pro' | 'feature' | 'addon' | 'recommended' | 'deprecated';

interface BadgeProps {
  type: BadgeType;
  text?: string;
  ariaLabel?: string;
}

interface BadgeGroupProps {
  children: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({ type, text, ariaLabel }) => (
  <span className={`badge docs-badge ${type}`} title={text} aria-label={ariaLabel}>
    <span className="docs-badge-icon" aria-hidden="true" />
    <span className="docs-badge-label">{text}</span>
  </span>
);

const BadgeGroup: React.FC<BadgeGroupProps> = ({ children }) => (
  <span className="badge-group">{children}</span>
);

export { Badge, BadgeGroup };

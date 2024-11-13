type BadgeType = 'lite' | 'pro' | 'feature' | 'addon' | 'recommended';

interface BadgeProps {
  type: BadgeType;
  text?: string;
}

interface BadgeGroupProps {
  children: React.ReactNode;
}

const badgeStyles: { [key in BadgeType]: string } = {
  lite: 'bg-gradient-to-r from-amber-500 to-yellow-400 text-gray-800',
  pro: 'bg-gradient-to-r from-red-500 to-orange-500 text-white',
  feature: 'bg-gradient-to-r from-blue-800 to-violet-600 text-white',
  addon: 'bg-gradient-to-r from-amber-300 to-yellow-600 text-black',
  recommended: 'bg-gradient-to-r from-lime-700 to-lime-500 text-black',
};

const Badge: React.FC<BadgeProps> = ({ type, text }) => {
  return (
    <span
      className={`badge align-top !text-[10px] !font-bold mt-0.5 mx-1 px-2 py-1 rounded-full ${badgeStyles[type]} ${type}`}
    >
      {text}
    </span>
  );
};

const BadgeGroup: React.FC<BadgeGroupProps> = ({ children }) => {
  return <div className="inline-table rounded badge-group">{children}</div>;
};

export { Badge, BadgeGroup };

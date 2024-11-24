import './item.scss';

type itemProps = { year: string; description: string };

export const Item = ({ year, description }: itemProps) => {
  return (
    <div className="itemWrapper">
      <div className="itemTitle">{year}</div>
      <div className="itemDescription">{description}</div>
    </div>
  );
};

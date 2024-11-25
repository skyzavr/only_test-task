import { onSwipeCircleType } from '@type/sectionSwiperProps';

import './dotItem.scss';

type dotItemProps = {
  currentValue: number;
  left: string;
  top: string;
  angle: number;
  title: string;
  ind: number;
  onSwipeCircle: onSwipeCircleType;
};
export const DotItem = (props: dotItemProps) => {
  const { currentValue, left, top, angle, title, ind, onSwipeCircle } = props;

  const transform = `translate(-50%, -50%) translate(${left}, ${top}) rotate(${
    -1 * angle
  }deg)`;
  return (
    <div
      className={`dotContainer ${ind === currentValue ? 'active' : 'passive'}`}
      style={{ transform }}
      onClick={(e) => onSwipeCircle(ind, e)}
    >
      <div className="dot"></div>
      <div className="dotNumber">{ind + 1}</div>
      <p>{title}</p>
    </div>
  );
};

import { arrows } from './arrows';
import './swiperSection.scss';

type sectionProps = {
  handlePrev: () => void;
  handleNext: () => void;
  currentValue: number;
  total: number;
};
export const SwipeSection = (props: sectionProps) => {
  const { handlePrev, handleNext, currentValue, total } = props;

  const getTitle = (startValue: number, endValue: number) => {
    const start =
      startValue + 1 < 10 ? `0${startValue + 1}` : (startValue + 1).toString();
    const end = endValue < 10 ? `0${endValue}` : endValue.toString();
    return `${start}/${end}`;
  };
  const disabledClass = (isOnTheEdge: boolean) =>
    isOnTheEdge ? 'disabled' : '';

  return (
    <div className="swiperSectionWrapper">
      <div className="swiperSectionTitle">{getTitle(currentValue, total)}</div>
      <div className="swiperSectionBtns">
        <button
          className={disabledClass(currentValue === 0)}
          onClick={handlePrev}
        >
          {arrows.left}
        </button>
        <button
          className={disabledClass(currentValue === total - 1)}
          onClick={handleNext}
        >
          {arrows.right}
        </button>
      </div>
    </div>
  );
};

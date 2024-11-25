import { MouseEvent } from 'react';

export type sectionSwiperProps = {
  currentValue: number;
  setCurrentValue: (value: number) => void;
};

export type onSwipeCircleType = (
  ind: number,
  e: MouseEvent<HTMLDivElement>
) => void;

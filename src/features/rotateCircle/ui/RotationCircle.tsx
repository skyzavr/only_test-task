import { useState, useEffect } from 'react';

import { data } from '@app/lib/data';
import {
  onSwipeCircleType,
  sectionSwiperProps,
} from '@type/sectionSwiperProps';

import { circleBlockSide, radius } from '../lib/constant';
import * as calc from '../lib/calculations';

import { DotItem } from '@shared/ui';
import './rotation.scss';

export const RotationCircle = (props: sectionSwiperProps) => {
  const { currentValue, setCurrentValue } = props;

  const distance = calc.calculateAngleTurn(data.length);
  const dots = calc.buildDotsList(data.length, circleBlockSide, radius);

  const [sectionNumber, setSectionNumber] = useState(currentValue);
  const [angle, setAngle] = useState(-1 * distance);

  const handleAngleUpdate = (newAngle: number, index: number) => {
    setAngle(newAngle + angle);
    setSectionNumber(index);
  };

  const onSwipeCircle: onSwipeCircleType = (ind, e) => {
    const { clientX } = e;
    const { innerWidth } = window;
    const direction = calc.getCircleDirection(clientX, innerWidth);
    const turnNumber = calc.calculateTurn(
      ind,
      direction,
      currentValue,
      data.length
    );
    handleAngleUpdate(turnNumber * distance, ind);
    setCurrentValue(ind);
  };

  useEffect(() => {
    if (currentValue === sectionNumber) return;

    const direction = currentValue > sectionNumber ? -1 : 1;
    const turnNumber = calc.calculateTurn(
      currentValue,
      direction,
      sectionNumber,
      data.length
    );
    handleAngleUpdate(turnNumber * distance, currentValue);
  }, [currentValue]);

  return (
    <div
      className="circleSwiper"
      style={{ width: `${circleBlockSide}px`, height: `${circleBlockSide}px` }}
    >
      <div className="circleWrapper" style={{ rotate: `${angle}deg` }}>
        {dots.map(({ top, left }, i) => (
          <DotItem
            title={data[i].title}
            ind={i}
            left={left}
            top={top}
            onSwipeCircle={onSwipeCircle}
            currentValue={sectionNumber}
            angle={angle}
            key={i}
          />
        ))}
      </div>
    </div>
  );
};

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

import { data } from '@app/lib/data';
import { TextItem } from '@entities/textItem';
import { endYearStyles, startYearStyles } from '../lib/styles';
import { getYears } from '../lib/helpers';

import './numbers.scss';

type animatedNumbersProps = {
  listOfData: { year: string; description: string }[];
};

export const AnimatedNumbers = (props: animatedNumbersProps) => {
  const { listOfData } = props;
  const startEl = useRef<HTMLHeadingElement>(null);
  const endEl = useRef<HTMLHeadingElement>(null);

  const animate = getYears(data[0].listOfData);
  const { startYear, endYear } = getYears(listOfData);

  useEffect(() => {
    gsap.to(startEl.current, {
      innerText: startYear,
      duration: 1,
      snap: {
        innerText: 1,
      },
    });
    gsap.to(endEl.current, {
      innerText: endYear,
      duration: 1,
      snap: {
        innerText: 1,
      },
    });
  }, [startYear, endYear]);

  return (
    <div className="numbersWrapper">
      <TextItem
        title={animate.startYear}
        styles={startYearStyles}
        refLink={startEl}
      />
      <TextItem
        title={animate.endYear}
        styles={endYearStyles}
        refLink={endEl}
      />
    </div>
  );
};

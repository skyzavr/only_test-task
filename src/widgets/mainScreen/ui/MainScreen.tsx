import { ReactElement } from 'react';

import { data } from '@app/lib/data';
import { sectionSwiperProps } from '@type/sectionSwiperProps';

import { AnimatedNumbers } from '@features/numbersAnimation';
import { RotationCircle } from '@features/rotateCircle';
import { MainScreenTitle } from '@entities/mainScreenTitle';

import './mainScreen.scss';

type mainScreenProps = {
  children: ReactElement;
} & sectionSwiperProps;

export const MainScreen = (props: mainScreenProps) => {
  const { children, currentValue, setCurrentValue } = props;

  return (
    <section className="mainScreenWrapper">
      <MainScreenTitle />
      <AnimatedNumbers listOfData={data[currentValue].listOfData} />
      <div className="horizontalLine"></div>
      <RotationCircle
        currentValue={currentValue}
        setCurrentValue={setCurrentValue}
      />
      <div className="swiperSectionDesktop"> {children}</div>
    </section>
  );
};

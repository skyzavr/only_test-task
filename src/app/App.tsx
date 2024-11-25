import { useState } from 'react';

import { SectionSlider } from '@widgets/sectionContentSlider';
import { MainScreen } from '@widgets/mainScreen';
import { SwipeSection } from '@features/swipeSection';

import { data } from './lib/data';
import './style.scss';

export const App = () => {
  const [currentValue, setCurrentValue] = useState(0);
  const { listOfData } = data[currentValue];

  const handleNext = () => {
    if (currentValue >= data.length - 1) return;
    setCurrentValue((prev) => prev + 1);
  };
  const handlePrev = () => {
    if (currentValue === 0) return;
    setCurrentValue((prev) => prev - 1);
  };
  const swiperSectionBtns = (
    <SwipeSection
      handleNext={handleNext}
      handlePrev={handlePrev}
      currentValue={currentValue}
      total={data.length}
    />
  );
  return (
    <main>
      <section className="wrapper">
        <div className="verticalLine"></div>
        <MainScreen
          currentValue={currentValue}
          setCurrentValue={setCurrentValue}
        >
          {swiperSectionBtns}
        </MainScreen>
        <SectionSlider data={listOfData}>{swiperSectionBtns}</SectionSlider>
      </section>
    </main>
  );
};

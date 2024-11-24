import { ReactElement, RefObject, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwipeRef } from 'swiper';
import { Pagination, A11y } from 'swiper/modules';

import { SectionSliderItem } from '@entities/sliderItem';
import { sliderSettings } from '../lib/sliderSettings';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './section.scss';

type dataListTypes = { year: string; description: string };
type SectionSliderProps = { data: dataListTypes[]; children: ReactElement };
type currentSlide = { prev: boolean; next: boolean };

export const SectionSlider = ({ data, children }: SectionSliderProps) => {
  const swiperRef = useRef<SwipeRef>();
  const containerRef = useRef<HTMLDivElement>(null);
  const btnsRef = useRef<HTMLDivElement>(null);

  const [current, setCurrent] = useState<currentSlide>({
    prev: false,
    next: true,
  });

  const { next, prev } = current;

  const setCurrentHandler = (element: SwipeRef) => {
    setCurrent({
      next: !element?.isEnd,
      prev: !element?.isBeginning,
    });
  };

  const fromToGsapHandler = (element: RefObject<HTMLDivElement>) => {
    gsap.fromTo(
      element?.current,
      { opacity: 0, y: 50, delay: 0.5 },
      { opacity: 1, y: 0, duration: 0.75, delay: 0.75 }
    );
  };

  const onTouchHandler = (swiper: SwipeRef) => {
    if (!swiper) return;
    setCurrentHandler(swiper);
  };

  const onChangeSlideHandler = (side: string) => {
    if (!swiperRef.current) return;

    side === 'prev'
      ? swiperRef.current?.slidePrev()
      : swiperRef.current?.slideNext();

    setCurrentHandler(swiperRef.current);
  };

  useEffect(() => {
    swiperRef.current?.slideTo(0);
    fromToGsapHandler(containerRef);
    fromToGsapHandler(btnsRef);
  }, [data]);

  return (
    <section className="sliderSection">
      <div ref={containerRef}>
        <Swiper
          grabCursor
          breakpoints={sliderSettings}
          pagination={{ clickable: true }}
          onBeforeInit={(swiper) => (swiperRef.current = swiper)}
          modules={[Pagination, A11y]}
          onTouchEnd={onTouchHandler}
          onReachBeginning={onTouchHandler}
          onReachEnd={onTouchHandler}
        >
          {data.map((el, i) => (
            <SwiperSlide key={i}>
              <SectionSliderItem {...el} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="swiperSectionMobile"> {children}</div>
      <div className="swiperButtonWrapper" ref={btnsRef}>
        <button
          className={
            prev ? 'swiper-button-prev show' : 'swiper-button-prev hide'
          }
          onClick={() => onChangeSlideHandler('prev')}
        ></button>

        <button
          className={
            next ? 'swiper-button-next show' : 'swiper-button-next hide'
          }
          onClick={() => onChangeSlideHandler('next')}
        ></button>
      </div>
    </section>
  );
};

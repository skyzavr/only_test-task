type buildDotsListType = (...args: number[]) => { top: string; left: string }[];

type calculateTurnType = (...args: number[]) => number;
type circleDirection = (clientWidth: number, innerWidth: number) => number;

const fullCircle = 360;

export const calculateAngleTurn = (sectionsLen: number) =>
  fullCircle / sectionsLen;

export const buildDotsList: buildDotsListType = (...args) => {
  const [listLength, circleBlockSide, radius] = args;

  const particle = circleBlockSide / 2;
  const angleParam = (2 / listLength) * Math.PI;

  return new Array(listLength).fill(null).map((_, i) => {
    const top = particle + radius * Math.sin(angleParam * i);
    const left = particle + radius * Math.cos(angleParam * i);

    return {
      top: `${top}px`,
      left: `${left}px`,
    };
  });
};

export const calculateTurn: calculateTurnType = (...args) => {
  const [ind, direction, currentValue, listLength] = args;
  if (direction === 1) {
    // left side of the circle (2 and 3rd quarter)
    return ind < currentValue
      ? currentValue - ind
      : listLength - ind - currentValue;
  }

  // right side of the circle (1 and 4th quarter)
  return ind < currentValue
    ? currentValue - listLength - ind
    : currentValue - ind;
};

export const getCircleDirection: circleDirection = (
  clientWidth,
  innerWidth
) => {
  // direction === 1 ->left side of the circle (2 and 3rd quarter)
  // direction === -1 ->right side of the circle (1 and 4th quarter)
  return clientWidth > innerWidth / 2 ? -1 : 1;
};

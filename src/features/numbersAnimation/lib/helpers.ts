type dataListTypes = (listOfDatas: { year: string; description: string }[]) => {
  startYear: number;
  endYear: number;
};
export const getYears: dataListTypes = (listOfData) => {
  if (listOfData.length === 0) return { startYear: 0, endYear: 0 };
  const startYear = listOfData[0].year;
  const endYear = listOfData.at(-1)?.year;
  return { startYear: Number(startYear), endYear: Number(endYear) };
};

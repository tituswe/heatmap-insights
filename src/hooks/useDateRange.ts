const useDateRange = (formatName?: boolean) => {
  const start = new Date(Date.now());
  const end = new Date(Date.now());

  const startDate = formatName ? start.toLocaleDateString() : start;
  const endDate = formatName ? end.toLocaleDateString() : end;

  return { startDate, endDate };
};

export default useDateRange;

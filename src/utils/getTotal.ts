const getTotal = (obj: Record<number, number>) => {
  return Object.keys(obj).reduce(
    (acc, val) => acc + Number(val) * obj[Number(val)],
    0
  );
};

export { getTotal };

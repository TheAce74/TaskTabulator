const timeout = (callback: () => void) => {
  const timer = setTimeout(() => {
    callback();
    clearTimeout(timer);
  }, 5000);
};

export { timeout };

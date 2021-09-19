const screenIsSmall = (size) => {
  return size < 536;
};

export const checkScreenSize = (setSmallScreen) => () => {
  const height = window.innerHeight;
  setSmallScreen(screenIsSmall(height));
};

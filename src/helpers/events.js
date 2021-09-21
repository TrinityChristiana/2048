const screenIsSmall = (size) => {
  return size < 536;
};

export const checkScreenSize = (setSmallScreen, setScreenWidth) => {
  const height = window.innerHeight;
  const width = window.innerWidth;
  setScreenWidth(width);
  setSmallScreen(screenIsSmall(height));
};

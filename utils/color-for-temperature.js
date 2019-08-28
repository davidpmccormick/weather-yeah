export default temperature => {
  const t = Math.round(temperature);
  if (t < 10) {
    return "#26a7f5";
  } else if (t < 17) {
    return "#28be6e";
  } else if (t < 25) {
    return "#fda634";
  } else {
    return "#fd3d49";
  }
};

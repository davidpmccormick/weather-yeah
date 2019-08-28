export default (input, inputRange, outputRange) => {
  const [lowInput, highInput] = inputRange;
  const [lowOutput, highOutput] = outputRange;

  return Math.round(
    lowOutput +
      ((highOutput - lowOutput) / (highInput - lowInput)) * (input - lowInput)
  );
};

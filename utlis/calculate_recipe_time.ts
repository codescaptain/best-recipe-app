export const estimateRecipeTime = (instructions: string): number => {
  const steps = instructions.split('\r\n');

  const timeEstimates: { [key: string]: number } = {
    sift: 2,
    use: 1,
    add: 1,
    beat: 5,
    place: 5,
    knead: 10,
    refrigerate: 30,
    saute: 5,
    put: 5,
    melt: 2,
    cook: 15,
    remove: 1,
    preheat: 10,
    roll: 5,
    spoon: 3,
    brush: 2,
    bake: 30,
    slice: 5,
    default: 5
  };

  let totalTime = 0;

  steps.forEach((step) => {
    const words = step.toLowerCase().split(' ');
    let estimatedTime = timeEstimates.default;

    for (const word of words) {
      if (timeEstimates[word]) {
        estimatedTime = timeEstimates[word];
        break;
      }
    }

    totalTime += estimatedTime;
  });

  return totalTime;
};

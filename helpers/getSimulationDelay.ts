const getSimulationDelay = async (milliseconds: number = 3000) => {
  return await new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export default getSimulationDelay;

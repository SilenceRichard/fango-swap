export const getContractAddress = (
  contract:
    | "PoolManager"
    | "PositionManager"
    | "SwapRouter"
    | "DebugTokenA"
    | "DebugTokenB"
    | "DebugTokenC"
): `0x${string}` => {
  const isProd = process.env.NODE_ENV === "production";
  if (contract === "PoolManager") {
    return isProd
      ? "0x5FbDB2315678afecb367f032d93F642f64180aa3"
      : "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  }
  if (contract === "PositionManager") {
    return isProd
      ? "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
      : "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
  }
  if (contract === "SwapRouter") {
    return isProd
      ? "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"
      : "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
  }
  if (contract === "DebugTokenA") {
    return isProd
      ? "0x5FbDB2315678afecb367f032d93F642f64180aa3"
      : "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  }
  if (contract === "DebugTokenB") {
    return isProd
      ? "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
      : "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
  }
  if (contract === "DebugTokenC") {
    return isProd
      ? "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"
      : "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
  }
  throw new Error("Invalid contract");
};
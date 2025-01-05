import { getContractAddress } from "./utils/common";

export const TOKEN_LIST: {
  [key: string]: string;
} = {
  [getContractAddress("DebugTokenA")]: 'DTA',
  [getContractAddress("DebugTokenB")]: 'DTB',
  [getContractAddress("DebugTokenC")]: 'DTC',
};
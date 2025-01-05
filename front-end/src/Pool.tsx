import { AddPoolModal } from "./AddPoolModal";
import PoolTable from "./PoolTable";
import { useReadPoolManagerGetAllPools } from "@/utils/contracts";
import { getContractAddress } from "./utils/common";

export const Pool = () => {
  const { data = [], refetch } = useReadPoolManagerGetAllPools({
    address: getContractAddress("PoolManager"),
  });
  return (
    <>
      <AddPoolModal refetch={refetch} />
      <PoolTable tableData={data} />
    </>
  );
};

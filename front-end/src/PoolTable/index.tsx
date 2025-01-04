import { useReadPoolManagerGetAllPools } from "@/utils/contracts";
import { PoolList, columns } from "./columns";
import { DataTable } from "./data-table";
import { getContractAddress } from "@/utils/common";

//@
export default function PoolTable() {
  const { data = [], refetch } = useReadPoolManagerGetAllPools({
    address: getContractAddress("PoolManager"),
  });
  const datas =JSON.parse(JSON.stringify(data));
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={datas} />
    </div>
  );
}

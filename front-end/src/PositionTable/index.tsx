/* eslint-disable @typescript-eslint/no-explicit-any */
import { getContractAddress } from "@/utils/common";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useAccount } from "wagmi";
import { useToast } from "@/hooks/use-toast";

interface PositionTableProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tableData: any;
  collectPosition: any;
  burnPosition: any;
}

export default function PositionTable({
  tableData,
  collectPosition,
  burnPosition,
}: PositionTableProps) {
  const { address } = useAccount();
  const { toast } = useToast();
  const handleBurnPosition = async (positionId: bigint) => {
    await burnPosition({
      address: getContractAddress("PositionManager"),
      args: [positionId],
    });
    toast({
      title: "Burn success!",
    });
  };
  const handleCollectPosition = async (positionId: bigint) => {
    await collectPosition({
      address: getContractAddress("PositionManager"),
      args: [positionId, address],
    });
    toast({
      title: "Collect success!",
    });
  };

  return (
    <div className="container py-2">
      <DataTable
        columns={columns({
          burnPosition: handleBurnPosition,
          collectPosition: handleCollectPosition,
        })}
        data={tableData}
      />
    </div>
  );
}

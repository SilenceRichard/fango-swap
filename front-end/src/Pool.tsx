import { AddPoolModal } from "./AddPoolModal";
import { AddPositionModal } from "./AddPositionModal";
import PoolTable from "./PoolTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useReadPoolManagerGetAllPools,
  useReadPositionManagerGetAllPositions,
  useWritePositionManagerBurn,
  useWritePositionManagerCollect,
} from "@/utils/contracts";
import { getContractAddress } from "./utils/common";
import PositionTable from "./PositionTable";

export const Pool = () => {
  const { data = [], refetch } = useReadPoolManagerGetAllPools({
    address: getContractAddress("PoolManager"),
  });
  const { data: positionData = [], refetch: refecthPosition } = useReadPositionManagerGetAllPositions({
    address: getContractAddress("PositionManager"),
  });
  const { writeContractAsync: burnPosition } = useWritePositionManagerBurn();
  const { writeContractAsync: collectPosition } = useWritePositionManagerCollect();
  return (
    <>
      <Tabs defaultValue="pool" className="w-full">
        <TabsList className="mb-2">
          <TabsTrigger value="pool">Pools</TabsTrigger>
          <TabsTrigger value="position">Positions</TabsTrigger>
        </TabsList>
        <TabsContent value="pool">
          <AddPoolModal refetch={refetch} />
          <PoolTable tableData={data} />
        </TabsContent>
        <TabsContent value="position">
          <AddPositionModal refetch={refecthPosition} />
          <PositionTable tableData={positionData} burnPosition={burnPosition} collectPosition={collectPosition}  />
        </TabsContent>
      </Tabs>
    </>
  );
};

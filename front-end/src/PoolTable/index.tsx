
import { columns } from "./columns";
import { DataTable } from "./data-table";

interface PoolTableProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tableData: any;
}

export default function PoolTable({ tableData }: PoolTableProps) {

  return (
    <div className="container py-2">
      <DataTable columns={columns} data={tableData} />
    </div>
  );
}

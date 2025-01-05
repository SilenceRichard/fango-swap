
import { columns } from "./columns";
import { DataTable } from "./data-table";

interface PositionTableProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tableData: any;
}

export default function PositionTable({ tableData }: PositionTableProps) {

  return (
    <div className="container py-2">
      <DataTable columns={columns} data={tableData} />
    </div>
  );
}

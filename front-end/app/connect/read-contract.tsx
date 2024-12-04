import { useReadPoolFactory } from "@/utils/contracts";

export function ReadContract() {
    const { data, refetch } = useReadPoolFactory({
        address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
        args: [

        ],
    });
    console.log("get data", data);
    return (
        <>
            {data?.toString()}
            <button
                onClick={() => {
                    refetch();
                }}
            >
                refetch
            </button>
        </>
    );
}
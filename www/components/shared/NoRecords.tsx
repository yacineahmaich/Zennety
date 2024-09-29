import { AudioLinesIcon } from "lucide-react";

const NoRecords = ({ size = "lg" }: { size: "sm" | "md" | "lg" }) => {
  return (
    <div className={"flex flex-col items-center gap-3 py-20"}>
      <AudioLinesIcon size={50} className="text-muted-foreground" />
      <span className="text-muted-foreground">No records found.</span>
    </div>
  );
};

export default NoRecords;

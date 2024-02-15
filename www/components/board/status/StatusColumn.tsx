import StatusCard from "../card/StatusCard";
import StatusColumnWrapper from "./StatusColumnWrapper";
import StatusHeader from "./StatusHeader";

const StatusColumn = ({ status }: { status: App.Models.Status }) => {
  return (
    <div className="flex h-full w-72 flex-col space-y-4">
      <StatusHeader status={status} />
      <StatusColumnWrapper status={status}>
        {status?.cards?.map((card) => <StatusCard key={card.id} card={card} />)}
      </StatusColumnWrapper>
    </div>
  );
};
export default StatusColumn;

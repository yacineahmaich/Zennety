import { Skeleton } from "@/components/ui/skeleton";

const WorkspaceLoading = () => {
  return (
    <div className="-ml-4">
      <div className="flex w-full items-center justify-between border-b border-muted p-4">
        <div className="flex items-center gap-2 ">
          <Skeleton className="h-20 w-20 rounded-xl" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-[120px]" />
            <div className="flex gap-2">
              <Skeleton className="h-3 w-[50px]" />
              <Skeleton className="h-3 w-[50px]" />
            </div>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="mb-4 flex gap-2">
          <Skeleton className="h-6 w-6" />
          <Skeleton className="h-6 w-[70px]" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 9 }, (_, i) => (
            <Skeleton key={i} className="h-card rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkspaceLoading;

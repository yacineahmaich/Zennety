import { Skeleton } from "../ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="py-4">
      <section>
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-6 rounded" />
          <Skeleton className="h-6 w-28" />
        </div>

        <div className="border-muted pb-5 sm:ml-3 sm:border-l">
          {Array.from({ length: 2 }).map((_, key) => (
            <div key={key} className="pt-2 sm:p-4">
              <div className="mb-2 flex items-center justify-between sm:mb-4">
                <div className="flex items-center gap-2 sm:-ml-4">
                  <span className="hidden h-px w-4 bg-muted sm:block"></span>
                  <Skeleton className="h-6 w-6 rounded" />
                  <Skeleton className="h-6 w-20" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-9 w-9 md:w-28" />
                  <Skeleton className="h-9 w-9 md:w-28" />
                  <Skeleton className="h-9 w-9 md:w-28" />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                {Array.from({ length: 6 }, (_, i) => (
                  <Skeleton key={i} className="h-card rounded-lg" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

import { Skeleton } from "@/components/ui/skeleton";

export default function ShowCaseLoader() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
      <div className="space-y-2">
        <Skeleton className="h-4  min-h-[400px]" />
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[150px]" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4  min-h-[400px]" />
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[150px]" />
      </div>
    </div>
  );
}

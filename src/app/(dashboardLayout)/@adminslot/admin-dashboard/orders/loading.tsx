import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex h-[70vh] w-full flex-col items-center justify-center gap-4">
      {/* 🔄 Spinner Icon */}
      <Loader2 className="h-12 w-12 animate-spin text-primary" />

      {/* Optional: Chotto ekta message */}
      <p className="text-sm font-medium text-slate-500 animate-pulse">
        Loading Orders Data...
      </p>
    </div>
  );
}

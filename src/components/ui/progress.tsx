"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <div className="progress-wrapper">
    <ProgressPrimitive.Root
      ref={ref}
      className={cn("progress-container", className)}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="progress-fill"
        style={{ width: `${value}%` }} // ✅ Dynamically adjust width
      />
    </ProgressPrimitive.Root>
    {/* Round indicator dot */}
    <div className="progress-indicator" style={{ left: `${value}%` }} />
  </div>
));
Progress.displayName = "Progress";

export { Progress };

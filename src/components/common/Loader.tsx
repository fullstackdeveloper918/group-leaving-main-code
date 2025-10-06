import { useEffect, useState } from "react";

interface LoaderProps {
  loading: boolean;
}

export default function Loader({ loading }: LoaderProps) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      setWidth(0); // reset when loading starts
      interval = setInterval(() => {
        setWidth(prev => {
          if (prev < 90) return prev + Math.random() * 10; // slowly progress to 90%
          return prev;
        });
      }, 200);
    } else if (width > 0) {
      // finish to 100% smoothly
      setWidth(100);
      const timer = setTimeout(() => setWidth(0), 400); // reset after completion
      return () => clearTimeout(timer);
    }

    return () => clearInterval(interval);
  }, [loading]);

  if (width === 0) return null; // don't render if not started

  return (
    <div className="fixed inset-0 flex items-start justify-center z-50 pointer-events-none">
      <div className="w-full h-[3px] bg-white/30 backdrop-blur-sm relative overflow-hidden">
        <div
          className="progress-loader"
          style={{ width: `${width}%` }}
        ></div>
      </div>
    </div>
  );
}

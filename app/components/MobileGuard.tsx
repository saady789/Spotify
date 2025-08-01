"use client";

import { useEffect, useState } from "react";

export default function MobileGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobile, setIsMobile] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    setHasMounted(true);
    handleResize(); // Check on first render
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!hasMounted) return null; // Avoid hydration mismatch

  if (isMobile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full text-center">
          <h1 className="text-4xl font-bold text-gray-100 mb-4">
            This app is not compatible with mobile devices
          </h1>
          <p className="text-lg text-gray-300">
            Please use a desktop or laptop to access this website.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

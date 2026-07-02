"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { Vehicle } from "@/lib/types";

interface QuickViewContextValue {
  vehicle: Vehicle | null;
  open: (vehicle: Vehicle) => void;
  close: () => void;
}

const QuickViewContext = createContext<QuickViewContextValue | null>(null);

export function QuickViewProvider({ children }: { children: ReactNode }) {
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);

  return (
    <QuickViewContext.Provider value={{ vehicle, open: setVehicle, close: () => setVehicle(null) }}>
      {children}
    </QuickViewContext.Provider>
  );
}

export function useQuickView() {
  const ctx = useContext(QuickViewContext);
  if (!ctx) throw new Error("useQuickView must be used within a QuickViewProvider");
  return ctx;
}

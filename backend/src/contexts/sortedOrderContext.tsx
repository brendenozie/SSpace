import React, { Dispatch, SetStateAction } from "react";

export interface SortContextType {
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
}

// export String sort = "";
export type SortType = {
  activeTab: string; // Page label
  // activeTab: string;
  // slug: string; // Page slug
  // icon: string; // Material icons text content
};

const defaultSortContext: SortContextType = {
  activeTab: "pending",
  setActiveTab: () => {},
};

export const SortListContext = React.createContext<SortContextType>(defaultSortContext);

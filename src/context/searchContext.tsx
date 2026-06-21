"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface searchContextData {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
}

const searchContext = createContext<searchContextData | null>(null);

export const SearchContext = () => {
  const context = useContext(searchContext);
  if (!context)
    throw new Error("SearchContext deve estar dentro do searchProvider");
  return context;
};

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");

  return (
    <searchContext.Provider value={{ search, setSearch, query, setQuery }}>
      {children}
    </searchContext.Provider>
  );
};

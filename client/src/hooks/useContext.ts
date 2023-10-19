import { GlobalContext } from "@/context/store";
import { useContext } from "react";

export const useGlobalContext = () => useContext(GlobalContext); 
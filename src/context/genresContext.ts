import { IGenresResponse } from "@/interfaces/Interfaces";
import { createContext } from "react";

const GenresContext = createContext<IGenresResponse | undefined>(undefined);

export default GenresContext;

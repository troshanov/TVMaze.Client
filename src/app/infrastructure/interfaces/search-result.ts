import { IShow } from "./show";

export interface ISearchResult {
    totalCount: number 
    shows: IShow[],
}
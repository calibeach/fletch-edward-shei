import { DataType } from "../types/data";

export async function fetchData(): Promise<DataType[]> {
  const uri = "http://localhost:3001/data"
  return fetch(uri)
    .then((data: Response) => data.json());
}
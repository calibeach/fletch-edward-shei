import { DataType } from "../types/data";

type FetchFilteredDataType = {
    searchString: string;
    webAddress?: string;
}


export async function fetchFilteredData (searchString: string): Promise<DataType[]> {
  const uri = `http://localhost:3001/data?result.${searchString}`
  const data = await fetch(uri)
  .then((data: Response) => data.json());
  return data
}
  
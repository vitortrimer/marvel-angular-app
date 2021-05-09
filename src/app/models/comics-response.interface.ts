import Comic from "./comic.interface";

export default interface ComicsResponse {
  code: number;
  status: string;
  data: ResultData;
}

interface ResultData {
  count: number;
  limit: number;
  offset: number;
  results: Comic[];
}

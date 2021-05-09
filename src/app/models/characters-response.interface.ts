import Character from './character.interface';

export default interface CharactersResponse {
  code: number;
  status: string;
  data: Data;
}

interface Data {
  count: number;
  limit: number;
  offset: number;
  results: Character[];
}

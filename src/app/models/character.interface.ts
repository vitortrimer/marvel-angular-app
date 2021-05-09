export default interface Character {
  id: number;
  description: string;
  name: string;
  resourceURI: string;
  comics: CharacterComics;
  thumbnail: Thumbnail;
}

interface CharacterComics {
  returned: number;
  available: number;
  items: ComicItem[];
  collectionURI: string;
}

interface ComicItem {
  name: string;
  resourceURI: string;
}

interface Thumbnail {
  path: string;
  extension: string;
}

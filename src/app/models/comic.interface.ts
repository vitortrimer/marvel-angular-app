export default interface Comic {
  characters: Object;
  description: string;
  format: string;
  title: string;
  id: number;
  prices: Price[];
  images: Image[];
}

interface Image {
  path: string;
  extension: string;
}

interface Price {
  type: string;
  price: number;
}

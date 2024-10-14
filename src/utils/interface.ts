export type TFeedback = {
  email: string;
  message: string;
};
export type TImage = {
  url: string;
  id: string;
};
export type TProduct = {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock_quantity: number;
  image: TImage[];
  category: string;
  brand: string;
  rating: number;
};

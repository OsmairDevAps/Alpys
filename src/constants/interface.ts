export interface ISelectProps {
  // key: string;
  value: string;
  label: string;
}
export interface GraphicProps {
  modality: string;
  total_price: number;
}
export interface ICategory {
  id: number;
  category: string;
}
export interface IProduct {
  id: number;
  category: string;
  name: string;
  price: string;
  photo: string;
}
export interface IClient {
  id: number;
  name: string;
}
export interface IOrder {
  id: number;
  client_name: string;
  product_name: string;
  amount: number;
  price: number;
  isdelivery: boolean;
  deliveryfee: number;
  address: string;
  obs: string;
  order_data: Date;
  delivered: boolean;
}
export interface ITransaction {
  id: number;
  modality: string;
  kind: string;
  place: string;
  product_name: string;
  client_name: string;
  amount: number;
  price: number;
  datetransaction: string;
  ispaid: boolean;
}
export interface ITBuy {
  id: number;
  modality: string;
  place: string;
  kind: string;
  product_name: string;
  amount: string;
  price: string;
  datetransaction: string;
  ispaid: boolean;
}
export interface ITSale {
  id: number;
  product_name: string;
  client_name: string;
  modality: string;
  amount: string;
  price: string;
  datetransaction: string;
  ispaid: boolean;
}
export interface IDataTransaction {
  id: number;
  name: string;
  price: number;
  amount: number;
  modality: string;
  ispaid: boolean;
  created_at: Date;
  datetransaction: string;
}

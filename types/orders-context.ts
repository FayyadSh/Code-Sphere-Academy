import { TOrder } from "./order.types";

// Define the structure of the OrdersContext value.
export interface OrdersContextType {
  orders?: TOrder[]; // Array of orders.
  loading: boolean; // Loading state for fetching orders.
  error: Error | null; // Any errors that occur during fetching.
  createOrder: () => void; // Function to create a new order.
}
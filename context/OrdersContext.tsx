'use client'; 
// ------------ Context ----------------
import { createContext } from 'react';
// ------------ Hooks ----------------
import { use } from 'react';
import { useFetch } from '@/hooks';
import { useAuth } from './AuthContext';
import { useRouter } from 'next/navigation'; 
import { useCart } from './CartContext'; 
// ------------ Utils ----------------
import OrderApis from '@/app/_utils/OrderApis';
// ------------ Types ----------------
import { OrdersContextType, TOrder } from '@/types';
import { ReactNode } from 'react';

// Define the structure of orders data expected from the API.
interface OrdersData {
  orders?: TOrder[]; // Array of orders, which may be undefined initially.
}

// Define the props for the OrdersProvider component, which will wrap the children components.
interface OrdersProviderProps {
  children: ReactNode; // ReactNode allows any valid React element (components, elements, or text).
}

// Create the OrdersContext with an initial value of undefined.
const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

// The OrdersProvider component wraps child components that need access to order data.
const OrdersProvider: React.FC<OrdersProviderProps> = ({ children }) => {

  const router = useRouter(); // Next.js router to handle page redirects.
  
  const { user, userData, loading: authLoading } = useAuth(); // Access the authentication state from AuthContext.
  
  // Get necessary cart details from CartContext.
  const { totalPrice, cartCoursesIDs, clearCart } = useCart(); 
  
  // Fetch user's orders using the custom `useFetch` hook.
  const { data, loading, error, reload } = useFetch<OrdersData>(() => {
    // Skip fetching if no user or auth is loading
    if (!user || authLoading) {
      return Promise.resolve({ orders: [] });
    }
    return OrderApis.getUserOrders();
  }, [user, authLoading]);

  // Function to create a new order.
  const createOrder = async () => {

    if (!user) {
      return router.push('/auth/login'); // Redirect to the login page if the user is not authenticated.
    }
    // Prepare the order data.
    const orderData = {
      username: userData?.firstName + ' ' + userData?.lastName, // Full name of the user.
      courses: cartCoursesIDs ?? [], // List of course IDs in the cart.
      totalPrice, // Total price of the cart.
      date: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format.
    };

    try {
      // Call the API to create the order.
      await OrderApis.createOrder(orderData);
      clearCart(); // Clear the cart after the order is created.
      reload(); // Reload the orders list to fetch the new state.
    } catch (err) {
      console.error('Error creating order:', err); // Log any error that occurs during order creation.
    }
  }

  // Define the context value to be shared with child components.
  const value = {
    orders: data?.orders,
    loading,
    error,
    createOrder
  };

  // Return the context provider that will wrap the child components.
  return (
    <OrdersContext value={value}>
      {children}
    </OrdersContext>
  );
};

export default OrdersProvider;

// Custom hook to access the OrdersContext in child components.
export const useOrders = (): OrdersContextType => {
  const context = use(OrdersContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrdersProvider'); // Ensure the hook is used within an OrdersProvider.
  }
  return context;
};

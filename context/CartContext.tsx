'use client';
// ------------ React ----------------
import { createContext, ReactNode, use, useOptimistic, startTransition } from 'react';
// ------------ Custom Hooks ----------------
import { useFetch } from '@/hooks';
import { useAuth } from './AuthContext'; 
import { useRouter } from 'next/navigation';
// ------------ Utils ----------------
import CartApis from '@/app/_utils/CartApis';
// ------------ Types ----------------
import { CartContextType, TCartAction, TCourse } from '@/types';

// Define the structure of cart data returned by the API.
interface CartData {
  cart?: TCourse[]; // Array of courses in the cart.
}

// Define the props for the CartProvider component.
interface CartProviderProps {
  children: ReactNode; // ReactNode allows any valid React child (e.g., components, elements, or strings).
}

// Create the CartContext with an initial value of undefined.
const CartContext = createContext<CartContextType | undefined>(undefined);

// The CartProvider wraps child components that need access to cart data and functions.
const CartProvider: React.FC<CartProviderProps> = ({ children }) => {

  const router = useRouter(); // Next.js router for redirection.
  const { user, loading: authLoading, setCallbackUrl } = useAuth(); // Access user authentication data and loading state.

  // Fetch the user's cart using the custom `useFetch` hook.
  const { data, loading, error, reload, setLoading } = useFetch<CartData>(() => {
    // Only fetch cart if user is authenticated and auth is not loading
    if (user && !authLoading) {
      return CartApis.getUserCart();
    }
    // Return empty cart when no user or auth is loading
    return Promise.resolve({ cart: [] });
  }, [user, authLoading]); // Dependency array remains the same

  const [optimisticCart, setOptimisticCart ] = useOptimistic(data?.cart || []);

  // Calculate the total price of items in the cart.
  const totalPrice = optimisticCart.reduce((total, course) => total + (course.price || 0), 0) || 0;

  // Extract the IDs of all courses in the cart.
  const cartCoursesIDs = optimisticCart?.map((course) => course.id);

  // Function to add a course to the cart.
  const addToCart = (course: TCourse) => {
    if (!user) {
      setCallbackUrl(`/course/${course.title}`);
      return router.push('/auth/unauthenticated'); // Redirect to login page if the user is not authenticated.
    }
    
    setLoading(true);
    const requestData: TCartAction = {
      action: 'add', // Action type for adding a course.
      courseId: course?.id, // ID of the course to add.
    };

    try {
      startTransition(async() => {
        setOptimisticCart((prevCart) => [...prevCart, course])
        await CartApis.updateUserCart(requestData); // Call the API to update the cart.
        reload(); // Reload cart data after the update.
      })
    } catch (err) {
      console.error('Error adding to cart:', err); // Log any errors that occur.
    } finally {
      setLoading(false);
    }
  }

  // Function to remove a course from the cart.
  const removeFromCart = (course: TCourse) => {
    if (!user) {
      setCallbackUrl(`/course/${course.title}`);
      return router.push('/auth/unauthenticated'); // Redirect to login page if the user is not authenticated.
    }
    setLoading(true);
    const requestData: TCartAction = {
      action: 'remove', // Action type for removing a course.
      courseId: course.id, // ID of the course to remove.
    };

    try {
      startTransition( async () => {
        setOptimisticCart((prevCart) => prevCart?.filter(cartCourse => cartCourse.id !== course.id))
        await CartApis.updateUserCart(requestData); // Call the API to update the cart.
        reload(); // Reload cart data after the update.
      })
    } catch (err) {
      console.error('Error removing from cart:', err); // Log any errors that occur.
    } finally {
      setLoading(false);
    }
  }

  // Function to clear all items from the cart.
  const clearCart = () => {
    setLoading(true);
    const requestData: TCartAction = { action: 'clear' }; // Action type for clearing the cart.

    try {
      startTransition(async () => {
        setOptimisticCart([]);
        await CartApis.updateUserCart(requestData); // Call the API to clear the cart.
        reload(); // Reload cart data after the update.
      })
    } catch (err) {
      console.error('Error clearing cart:', err); // Log any errors that occur.
    } finally{
      setLoading(false);
    }
  }

  // Define the value provided by the CartContext.
  const value = {
    cart: optimisticCart, 
    loading, 
    error, 
    totalPrice,
    cartCoursesIDs,
    addToCart,
    removeFromCart,
    clearCart,
  };

  // Provide the cart data and functions to child components.
  return (
    <CartContext value={value}>
      {children}
    </CartContext>
  );
};

export default CartProvider;

// Custom hook to access the CartContext in child components.
export const useCart = (): CartContextType => {
  const context = use(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider'); // Ensure the hook is used within the CartProvider.
  }
  return context;
};
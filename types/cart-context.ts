import { TCourse } from "./course.types";

// Define the structure of the CartContext value.
export interface CartContextType {
  cart?: TCourse[]; // Array of courses in the cart.
  loading: boolean; // Indicates if cart data is still loading.
  error: Error | null; // Stores any errors that occur during cart operations.
  totalPrice: number; // Total price of the courses in the cart.
  cartCoursesIDs?: string[]; // IDs of the courses in the cart.
  addToCart: (course: TCourse) => void; // Function to add a course to the cart.
  removeFromCart: (course: TCourse) => void; // Function to remove a course from the cart.
  clearCart: () => void; // Function to clear all courses from the cart.
}
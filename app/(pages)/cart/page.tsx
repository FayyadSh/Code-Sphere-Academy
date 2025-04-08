'use client'
// ------------ Hooks ----------------
import { usePathname, useRouter } from "next/navigation";
import { useCart } from '../../../context/CartContext';
import { useAuth } from "../../../context/AuthContext";
// ------------ Components ----------------
import { Breadcrumb } from "../../../components/ui";
import { CartItemsList } from "../../../components/cart";
// ------------ Types ----------------
import { TCourse } from "../../../types";

const Cart = () => {

  // Getting the current pathname for the breadcrumb
  const path = usePathname();
  
  const { cart, totalPrice, loading, error, removeFromCart } = useCart();
  const { user } = useAuth();

  const router = useRouter();

  if(!user){
    router.push('/auth/unauthenticated');
  }
  
  return (
    <section className="pt-40 md:pt-24 bg-background-color dark:bg-background-dark-color"> {/* Main container */}

      <div className="px-6 sm:px-16 lg:px-40"> {/* Container for breadcrumb and title */}
        
        <Breadcrumb path={path} /> 
        <h1 className="text-xl font-bold text-light-color sm:text-3xl"> 
          Your Cart
        </h1>

        <CartItemsList 
          courses={cart as TCourse[]} 
          loading={loading} 
          error={error}
          total={totalPrice} 
          removeFromCart={removeFromCart}
        />
      </div>
    </section>
  );
};

export default Cart;

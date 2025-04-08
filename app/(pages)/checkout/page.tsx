'use client';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import { useCart } from '../../../context/CartContext';
import dynamic from 'next/dynamic';

// Dynamically import the CheckoutForm with SSR disabled
const CheckoutForm = dynamic(
  () => import('../../../components/checkout').then((mod) => mod.CheckoutForm),
  { ssr: false }
);

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHER_KEY || ''
);

const Checkout = () => {
  const { totalPrice } = useCart();

  const options: StripeElementsOptions = {
    mode: 'payment',
    currency: 'usd',
    amount: totalPrice > 0 ? Math.round(totalPrice * 100) : undefined,
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  );
};

export default Checkout;
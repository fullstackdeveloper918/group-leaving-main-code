"use client"
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
// import { GlobleContextProviderProps } from '@/context/actionTypes';
// const STRIPE_KEY = process.env.NEXT_PUBLIC_LIVE_STRIPE_KEY as string;
const STRIPE_KEY = process.env.NEXT_PUBLIC_STAGING_STRIPE_KEY as string;

const StripeElement = (props: any) => {
    const stripePromise = loadStripe(STRIPE_KEY);
    return (
        <Elements stripe={stripePromise}>
            {props.children}
        </Elements>
    );
};


export default StripeElement
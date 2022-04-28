import React, { useState, useEffect, useContext } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../CheckoutForm/CheckoutForm';
import { GlobalContext } from '../../GlobalContext/GlobalContext';

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  'pk_test_51KspgPGBaeIIP5yaLo9bmqTFkfFUljdASOfg04AYy3P9TKa2TGm4g5XcMGnjwfwZv1fJev9a9uEXPcfBUmF959GC00hIwLgLEi'
);

const Stripe = () => {
  const { cart } = useContext(GlobalContext);
  const [clientSecret, setClientSecret] = useState('');
  const { dataPayment, setDataPayment } = useContext(GlobalContext);
  let token = window.localStorage.getItem('tokenProp');
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch('https://prueba-google-auth.herokuapp.com' + '/pagos/checkout', {
      method: 'POST',
      headers: {
        api: `${import.meta.env.VITE_API}`,
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({ cart }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret),
          // data.cart,
          console.log('datafetch, secret.>> ', data);
      })
      .catch((error) => console.log('error desde el back', error));
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default Stripe;

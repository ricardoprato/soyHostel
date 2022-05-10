import React, { useState, useEffect, useContext } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../CheckoutForm/CheckoutForm';
import { GlobalContext } from '../../GlobalContext/GlobalContext';
import styles from './Stripe.module.css';
import Loader from '../Loader/LoaderDark';

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  'pk_test_51KspgPGBaeIIP5yaLo9bmqTFkfFUljdASOfg04AYy3P9TKa2TGm4g5XcMGnjwfwZv1fJev9a9uEXPcfBUmF959GC00hIwLgLEi'
);

const Stripe = ({ setPay, setLocalModal }) => {
  const { cart } = useContext(GlobalContext);
  const [clientSecret, setClientSecret] = useState('');
  const { dataPayment, setDataPayment, getAllRooms } =
    useContext(GlobalContext);
  let token = window.localStorage.getItem('tokenProp');

  let url = import.meta.env.VITE_APP_URL;
  let api = import.meta.env.VITE_API;

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch(`${url}` + '/pagos/checkout', {
      method: 'POST',
      headers: {
        api: `${api}`,
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({ cart }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret),
          // data.cart,
          console.log('secret.>> ', data);
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
  const handleClick = () => {
    setPay((prev) => !prev);
  };
  return (
    <div className={styles.stripeContainer}>
      {token ? (
        clientSecret ? (
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm setPay={handleClick} setLocalModal={setLocalModal} />
          </Elements>
        ) : (
          <Loader />
        )
      ) : (
        <div className={styles.noAuthorize}>
          <h2>You need to be login as a register user</h2>
        </div>
      )}
    </div>
  );
};
// {clientSecret && (
//   <Elements options={options} stripe={stripePromise}>
//     <CheckoutForm />
//   </Elements>
// )}

export default Stripe;

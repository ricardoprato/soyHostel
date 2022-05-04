import React, { useEffect, useState, useContext } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../GlobalContext/GlobalContext';
import styles from './CheckoutForm.module.css';
import swal from 'sweetalert';

export default function CheckoutForm({ setPay }) {
  const stripe = useStripe();
  const elements = useElements();
  let navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [button, setButton] = useState(false);
  const { cart, setCart, toBack, setToBack } = useContext(GlobalContext);
  const { dataPayment, setDataPayment } = useContext(GlobalContext);
  const handleFocus = (e) => {
    setButton(true);
  };

  // useEffect(() => {
  //   if (!stripe) {
  //     return;
  //   }

  //   const clientSecret = new URLSearchParams(window.location.search).get(
  //     'payment_intent_client_secret'
  //   );

  //   if (!clientSecret) {
  //     return;
  //   }

  //   stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
  //     setTimeout(() => {
  //       console.log('status????', paymentIntent);
  //     }, 4000);
  //     paymentIntent.receipt_email = 'luciano.leyria96@gmail.com';
  //   });
  // }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const mock = {
      fecha_ingreso: '2022-05-18',
      fecha_egreso: '2022-05-30',
      saldo: 6500,
      camas: ['5dsd54-15d', 'da45-41dsd153'],
      habitaciones: ['1', '6'],
    };

    const data = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
      // receipt_email: 'luciano.leyria96@gmail.com',
      confirmParams: {
        // Make sure to change this to your payment completion page
        receipt_email: 'luciano.leyria96@gmail.com',
        return_url: 'http://localhost:3000',
      },
    });
    // console.log('DATANEW', data);
    let infoPayment = data.paymentIntent;

    // setDataPayment(
    //   data.paymentIntent.id,
    //   data.paymentIntent.status,
    //   data.paymentIntent.receipt_email,
    //   data.paymentIntent.currency,
    //   data.paymentIntent.payment_method_types
    // );

    // ESPERANDO A VER Q LAS VARIABLES SEAN EN ESPAÑOL O INGLES. ESTE FETCH ES PARA MANDAR CART + PAYMENT DATA (EMAIL ID ETC) PA
    // ENVIAR EL MAIL DE CONFIRMACION DE PAGO
    let url = import.meta.env.VITE_APP_URL;
    let api = import.meta.env.VITE_API;

    // console.log('toback', toBack);
    let token = window.localStorage.getItem('tokenProp');
    // console.log('datapayment', dataPayment);
    fetch(`${url}` + '/reservas', {
      method: 'POST',
      headers: {
        api: `${api}`,
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({ toBack, infoPayment }),
    })
      .then((res) => res.json())

      .catch((error) => console.log('error desde el back', error));
    // console.log('infocheckout>> ', { toBack, infoPayment });
    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (!data.error) {
      swal('Payment Successfull');
      setCart([]);
      return navigate('/');
    }
    if (
      data.error.type === 'card_error' ||
      data.error.type === 'validation_error'
    ) {
      setMessage(data.error.message);
    } else {
      setMessage('An unexpected error occured.');
    }
    setIsLoading(false);
  };

  return (
    <>
      <button onClick={setPay} className={styles.buttonicon}>
        <i className={`${styles.icon} bi bi-arrow-left-square-fill`}></i>
      </button>
      <form id="payment-form" onSubmit={handleSubmit} className={styles.form}>
        <PaymentElement onFocus={handleFocus} id="payment-element" />
        {button ? (
          <button
            disabled={isLoading || !stripe || !elements}
            id="submit"
            className={styles.payment}
          >
            <span id="button-text">
              {isLoading ? (
                <div className="spinner" id="spinner"></div>
              ) : (
                <>
                  <i className="bi bi-credit-card-2-front"></i> Pay and confirm
                  reserve
                </>
              )}
            </span>
          </button>
        ) : null}
        {/* Show any error or success messages */}
        {message === 'Tu tarjeta ha sido rechazada.'
          ? 'Your card has been declined'
          : message}
      </form>
    </>
  );
}

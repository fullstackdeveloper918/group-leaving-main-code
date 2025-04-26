// components/GooglePayButton.tsx
import React, { useEffect, useState } from 'react';

const GooglePayButton: React.FC = () => {
  const [isReadyToPay, setIsReadyToPay] = useState(false);

  useEffect(() => {
    const paymentsClient = new google.payments.api.PaymentsClient({ environment: 'TEST' });

    const request:any = {
      apiVersion: 2,
      apiVersionMinor: 0,
      merchantInfo: {
        merchantId: '6091-5100-8089', // Your Merchant ID
        merchantName: 'Vedametric',   // Your Merchant Name
      },
      transactionInfo: {
        totalPriceStatus: 'FINAL',
        totalPrice: '10.00', // Set your total price
        currencyCode: 'INR',
        countryCode: 'IN',
      },
      paymentMethodData: {
        type: 'UPI',
        parameters: {
          allowedPaymentMethods: [
            {
              type: 'UPI',
              parameters: {
                payeeVpa: 'as3794768-2@okicici', // Replace with the UPI ID to receive payment
                payeeName: 'Vedametric', // Payee name
              },
            },
          ],
        },
      },
    };

    paymentsClient.isReadyToPay(request)
      .then((response) => {
        setIsReadyToPay(response.result);
      })
      .catch((err) => {
        console.error('Error determining readiness to pay', err);
      });
  }, []);

  const onGooglePayClicked = async () => {
    const paymentsClient = new google.payments.api.PaymentsClient({ environment: 'TEST' });

    const paymentDataRequest:any = {
      apiVersion: 2,
      apiVersionMinor: 0,
      merchantInfo: {
        merchantId: '6091-5100-8089', // Your Merchant ID
        merchantName: 'Vedametric',   // Your Merchant Name
      },
      transactionInfo: {
        totalPriceStatus: 'FINAL',
        totalPrice: '10.00', // Set your total price
        currencyCode: 'INR',
        countryCode: 'IN',
      },
      paymentMethodData: {
        type: 'UPI',
        parameters: {
          allowedPaymentMethods: [
            {
              type: 'UPI',
              parameters: {
                payeeVpa: 'as3794768-2@okicici', // Replace with the UPI ID to receive payment
                payeeName: 'Vedametric', // Payee name
              },
            },
          ],
        },
      },
    };

    try {
      const paymentData = await paymentsClient.loadPaymentData(paymentDataRequest);
      processPayment(paymentData); // Process payment here
    } catch (error) {
      console.error('Error loading payment data', error);
    }
  };

  const processPayment = (paymentData: any) => {
    console.log('Payment Data:', paymentData);
    // Send the payment data to your backend for processing if needed
  };

  return (
    <>
      {/* {isReadyToPay && ( */}
        <button onClick={onGooglePayClicked}>
          Pay with Google Pay UPI
        </button>
      {/* )} */}
    </>
  );
};

export default GooglePayButton;

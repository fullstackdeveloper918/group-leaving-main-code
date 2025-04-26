"use client";
import henceofrthEnums from "@/utils/cybersifyEnum";
import { Grid } from "antd";
import { useEffect, useState } from "react";

export const GooglePayWithCDN = (props: any) => {
  const baseRequest = {
    apiVersion: 2,
    apiVersionMinor: 0,
  };

  const allowedCardNetworks = [
    "AMEX",
    "DISCOVER",
    "INTERAC",
    "JCB",
    "MASTERCARD",
    "VISA",
  ];
  const allowedCardAuthMethods = ["PAN_ONLY", "CRYPTOGRAM_3DS"];
  let paymentsClient: any = null;

  const tokenizationSpecification = {
    type: "PAYMENT_GATEWAY",
    parameters: {
      gateway: "stripe",
      "stripe:version": process.env.NEXT_PUBLIC_STRIPE_VERSION as string,
      "stripe:publishableKey": process.env
        .NEXT_PUBLIC_STAGING_STRIPE_KEY as string,
    },
  };

  const baseCardPaymentMethod = {
    type: "UPI",
    parameters: {
      allowedAuthMethods: allowedCardAuthMethods,
      allowedCardNetworks: allowedCardNetworks,
    },
  };

  const cardPaymentMethod = {
    ...baseCardPaymentMethod,
    tokenizationSpecification,
  };

  function getGoogleIsReadyToPayRequest() {
    return {
      ...baseRequest,
      allowedPaymentMethods: [baseCardPaymentMethod],
    };
  }

  function getGooglePaymentDataRequest() {
    return {
      ...baseRequest,
      allowedPaymentMethods: [cardPaymentMethod],
      transactionInfo: getGoogleTransactionInfo(),
      merchantInfo: {
        merchantId: process.env.NEXT_PUBLIC_GOOGLEPAY_MERCHANT_ID as string,
        merchantName: process.env.NEXT_PUBLIC_GOOGLEPAY_MERCHANT_NAME as string,
      },
    };
  }

  function getGooglePaymentsClient() {
    if (
      typeof google !== "undefined" &&
      google.payments &&
      google.payments.api
    ) {
      if (paymentsClient == null) {
        // paymentsClient =new google.payments.api.PaymentsClient({

        // })
        paymentsClient = new google.payments.api.PaymentsClient({
          environment: "TEST",
        });
      }
      return paymentsClient;
    } else {
      console.error("Google Pay library not loaded");
      return null;
    }
  }

  function onGooglePayLoaded() {
    const paymentsClient = getGooglePaymentsClient();
    paymentsClient
      ?.isReadyToPay(getGoogleIsReadyToPayRequest())
      .then((response: any) => {
        if (response.result) {
          addGooglePayButton();
        }
      })
      .catch((err: any) => {
        console.error(err);
      });
  }

  const [isGooglePayButtonAppended, setIsGooglePayButtonAppended] =
    useState(false);

  function addGooglePayButton() {
    const paymentsClient = getGooglePaymentsClient();
    if (!isGooglePayButtonAppended) {
      const button = paymentsClient.createButton({
        onClick: onGooglePaymentButtonClicked,
        allowedPaymentMethods: [baseCardPaymentMethod],
      });
      (document as any).getElementById("container").appendChild(button);
      setIsGooglePayButtonAppended(true);
    }
  }

  function getGoogleTransactionInfo() {
    return {
      totalPriceStatus: "FINAL",
      totalPriceLabel: "Total",
      totalPrice: `${props?.totalPrice}`,
      currencyCode: props?.currencyCode,
      countryCode: props?.countryCode,
    };
  }

  function onGooglePaymentButtonClicked() {
    const paymentDataRequest = getGooglePaymentDataRequest();
    const paymentsClient = getGooglePaymentsClient();
    paymentsClient
      .loadPaymentData(paymentDataRequest)
      .then((paymentData: any) => {
        processPayment(paymentData);
      })
      .catch((err: any) => {
        console.error(err);
      });
  }

  function processPayment(paymentData: any) {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          let paymentToken =
            paymentData.paymentMethodData.tokenizationData.token;
          let _paymentToken = JSON.parse(paymentToken);
          let tokenId = _paymentToken?.id;
          console.log(tokenId, "tokenId");
          console.log(_paymentToken, "_paymentToken");

          await props?.handleSocialBuy(
            tokenId,
            henceofrthEnums.PaymentType.googlePay
          );
          resolve({});
        } catch (error) {
          console.error("Payment processing error:", error);
          reject(error);
        }
      }, 3000);
    });
  }

  useEffect(() => {
    const loadGooglePayLibrary = () => {
      const script = document.createElement("script");
      script.src = "https://pay.google.com/gp/p/js/pay.js";
      script.async = true;
      script.onload = () => {
        console.log("Google Pay library loaded");
        onGooglePayLoaded();
      };
      document.body.appendChild(script);
    };

    loadGooglePayLibrary();

    return () => {
      const scripts = document.querySelectorAll(
        'script[src="https://pay.google.com/gp/p/js/pay.js"]'
      );
      scripts.forEach((script) => script.remove());
    };
  }, []);

  const screens = Grid.useBreakpoint();

  return (
    <>
      {/* <h2 className={`mb-3 fw-semibold ${screens.md ? 'fs-20' : 'fs-18'}`}>Google Pay</h2> */}
      <div className="text-center" id="container"></div>
    </>
  );
};

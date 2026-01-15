"use client";
import React from "react";
import GooglePayButton from "@google-pay/button-react";
import henceofrthEnums from "@/utils/cybersifyEnum";

interface Props {
  totalPrice: string | number;
  currencyCode?: string;
  countryCode?: string;
  handleSocialBuy: (tokenId: string, paymentType: string) => Promise<void>;
}

export default function GooglePay(props: any) {

  const processPayment = async (paymentData: any) => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const paymentToken =
          paymentData.paymentMethodData.tokenizationData.token;
        const _paymentToken = JSON.parse(paymentToken);
        const tokenId = _paymentToken?.id;
        await props.handleSocialBuy(
          tokenId,
          henceofrthEnums.PaymentType.googlePay
        );
        resolve();
      } catch (error) {
        console.error("Payment processing error:", error);
        reject(error);
      }
    });
  };

  const onPaymentAuthorized = (paymentData: any): Promise<any> => {
    return new Promise((resolve) => {
      processPayment(paymentData)
        .then(() => {
          resolve({ transactionState: "SUCCESS" });
        })
        .catch(() => {
          resolve({
            transactionState: "ERROR",
            error: {
              intent: "PAYMENT_AUTHORIZATION",
              message: "Insufficient funds",
              reason: "PAYMENT_DATA_INVALID",
            },
          });
        });
    });
  };

  const totalPrice =
    typeof props.totalPrice === "number"
      ? props.totalPrice.toFixed(2)
      : parseFloat(props.totalPrice).toFixed(2);
  if (isNaN(parseFloat(totalPrice))) {
    console.error("Invalid totalPrice:", props.totalPrice);
    throw new Error("Invalid totalPrice");
  }

  const currencyCode = props.currencyCode || "USD";
  const countryCode = props.countryCode || "US";

  return (
    <div className="text-center">
      <GooglePayButton
        environment={"TEST"}
        buttonSizeMode="fill"
        buttonType="buy"
        paymentRequest={{
          apiVersion: 2,
          apiVersionMinor: 0,
          allowedPaymentMethods: [
            {
              type: "CARD",
              parameters: {
                allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                allowedCardNetworks: [
                  "AMEX",
                  "DISCOVER",
                  "INTERAC",
                  "JCB",
                  "MASTERCARD",
                  "VISA",
                ],
              },
              tokenizationSpecification: {
                type: "PAYMENT_GATEWAY",
                parameters: {
                  gateway: "stripe",
                  "stripe:version": process.env
                    .NEXT_PUBLIC_STRIPE_VERSION as string,
                  "stripe:publishableKey": process.env
                    .NEXT_PUBLIC_LIVE_STRIPE_KEY as string,
                },
              },
            },
          ],
          merchantInfo: {
            merchantId: process.env.NEXT_PUBLIC_GOOGLEPAY_MERCHANT_ID as string,
            merchantName: process.env
              .NEXT_PUBLIC_GOOGLEPAY_MERCHANT_NAME as string,
          },
          transactionInfo: {
            totalPriceStatus: "FINAL",
            totalPriceLabel: "Total",
            totalPrice: totalPrice,
            currencyCode: currencyCode,
            countryCode: countryCode,
          },
        }}
        onLoadPaymentData={onPaymentAuthorized}
        existingPaymentMethodRequired={false}
      />
    </div>
  );
}

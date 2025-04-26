"use client"
// import henceforthApi from "src/utils/henceforthApi";
import React, { useContext, useState } from "react";


// import { GlobalContext } from "src/context/Provider";
// import { Spinner } from "../common/BootstrapCompo";
// import { toast } from "react-toastify";
import {
    CardElement,
    useStripe,
    AddressElement,
    useElements
} from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import add from "../../assets/images/icons/add.svg"
// import { GlobalContext } from "@/context/Provider";
// import henceforthApi from "@/utils/henceforthApi";
import { Button, Form } from "antd";

const AddCardElement = ({ initialiseCard, addOrder, isExpended, setIsExpended, langProps }: any) => {
    // const { Toast, loading, setLoading, isDarkMode, userInfo } = React.useContext(GlobalContext)
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [isSaved, setIsSaved] = useState(false);
    // const stripe = useStripe();
    const router = useRouter()
    // const elements: any = useElements();

    const CARD_ELEMENT_OPTIONS = {
        style: {
            base: {
                border: "1px solid red",
                borderRadius: 40,
                color: "#fff",
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                fontSmoothing: "antialiased",
                fontSize: "16px",
                "::placeholder": {
                    color: "#fff",
                },
                iconColor: "#fff",
            },
            invalid: {
                color: "#fa755a",
                iconColor: "#333",
            },
        },
    };


    const selectCard = async (name: string, data: any) => {
        console.log(name, data, "nameData");

        // const oldQuery = router.query
        // oldQuery[name] = data._id
        // router.replace({ query: { ...oldQuery } })
    };

    const handleChange = async (event: any) => {
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    };
    // const handleSubmit = async (ev: any) => {
    //      
    //     ev.preventDefault();
    //     setProcessing(true);
    //     const cardElement = elements.getElement(CardElement)
    //     const payload = await stripe?.createPaymentMethod({
    //         type: 'card',
    //         card: cardElement,
    //     });

    //     if (payload?.error) {
    //         setProcessing(false);
    //     } else {
    //         setError(null);
    //         const item = {
    //             payment_method: payload?.paymentMethod.id,
    //             is_saved: router.pathname === "/account/card" ? true : isSaved
    //         }
    //         try {
    //             let apiRes = await henceforthApi.Card.add(item)
    //             setError(null);
    //             cardElement.clear();


    //         } catch (error: any) {
    //             setError(null);
    //         } finally {

    //             setProcessing(false);
    //         }
    //     }
    // }

    return (
        <div>
            <Form className="form-section mb-2" id="payment-form" >
                <CardElement className="Addcard border border-white p-3 rounded-pill mt-2 " options={CARD_ELEMENT_OPTIONS} onChange={handleChange} />
                {/* const addressElement = elements.create('address', options); */}
                {/* <AddressElement options={{ mode: 'billing', autocomplete: { mode: "google_maps_api", apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY as string } }} /> */}
                {/* {router.pathname === "/checkout/card" && */}
                    <div className="mt-3 save-card-text ">
                        <label>
                            <input type={'checkbox'} className="form-check-input shadow-none rounded-0 mt-0" checked={isSaved} onChange={(e) => setIsSaved(e.target.checked)} />
                        </label>
                    </div>
                    {/* } */}
                <div className="pt-2">
                    {error && (
                        <div className="card-error invalid-error-class" role="alert">
                            {error}
                        </div>
                    )}
                    <div className="flex-center justify-content-end gap-2 flex-wrap">
                        {/* <Button type="primary" htmlType="submit" className="text-white"
                                disabled={processing}
                                id="submit">
                                Add
                            </Button> */}
                    </div>
                </div>
            </Form>
        </div>
    )

}
export default AddCardElement
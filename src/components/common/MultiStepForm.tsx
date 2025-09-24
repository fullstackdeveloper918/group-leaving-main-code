"use client";
import validation from "@/utils/validation";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import checkSvg from "../../assets/images/check.svg";
import api from "@/utils/api";
import { cookies } from "next/dist/client/components/headers";
import { toast, ToastContainer } from "react-toastify";
import nookies, { parseCookies, destroyCookie } from "nookies";
import { useAccessToken } from "@/app/context/AccessTokenContext";
const MultiStepForm = ({ params }: any) => {
  const router = useRouter();

  const [step, setStep] = useState(1);
  console.log(step, "jjjkljkl");

  const [recipientName, setRecipientName] = useState("");
  const [loading, setLoading] = useState(false);
  const [senderName, setSenderName] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");
  const [cardType, setCardType] = useState<any>("later");
  const [error, setError] = useState("");
  const [senderError, setSenderError] = useState("");
  const [emailError, setEmailError] = useState("");
  // console.log(recipientName, "recipientName");
  // console.log(senderName, "senderName");
  // console.log(cardType, "cardType");
  // console.log(params, "params");
  const [userInfo, setUserInfo] = useState<any>(null);
  const [uuid, setUuid] = useState<string | null>(null);
  const [currencyError,setCurrencyError] = useState<string>("")
  console.log(uuid, "uuidforcheck");
  useEffect(() => {
    const cookies = document.cookie.split("; ");
    const userInfoCookie = cookies.find((cookie) =>
      cookie.startsWith("userInfo=")
    );

    if (userInfoCookie) {
      const cookieValue = userInfoCookie.split("=")[1];
      try {
        const parsedUserInfo = JSON.parse(decodeURIComponent(cookieValue));
        setUserInfo(parsedUserInfo);

        // Extracting the UUID from the parsed userInfo object
        if (parsedUserInfo && parsedUserInfo.uuid) {
          setUuid(parsedUserInfo.uuid);
          console.log("UUID:", parsedUserInfo.uuid);
        }
      } catch (error) {
        console.error("Error parsing userInfo cookie", error);
      }
    }
  }, []);

  const cookies = parseCookies();
  const { accessToken, setAccessToken } = useAccessToken();
  console.log(accessToken, "accessToken");

  useEffect(() => {
    const cookies = parseCookies();
    console.log(cookies, "cookies");

    const token = cookies.auth_token;
    console.log(typeof token, "iooioio");

    if (token) {
      setAccessToken(token);
    } else {
      // alert("nothing")
    }
  }, []);

  // console.log(recipientName,"recipientName");
  // console.log(recipientName,"recipientName");
  const [selectedDate, setSelectedDate] = useState(""); // to store date value
  // const [selectedTime, setSelectedTime] = useState(""); // to store time value
  const handleLogin = () => {
    toast.error("Please login");
    router.push("/login");
  };
  const handleNext = () => {


    if(step === 3 && !selectedOption){
      setCurrencyError("Please Select Contributions Currency.")
      return;
    }
    // setCurrencyError
    if (!recipientName) {
      setError("Recipient name is required.");
      return; // Stop submission if validation fails
    }

    if (!recipientEmail) {
      setEmailError("Recipient Email is required.");
      return; // Stop submission if validation fails
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(recipientEmail)) {
      // If email is missing '@' symbol
      if (!recipientEmail.includes("@")) {
        setEmailError("@ symbol is required.");
        return;
      }

      // If email contains '@' but no domain or ends with '@' (like 'example@')
      const parts = recipientEmail.split("@");
      if (parts.length === 2 && !parts[1]) {
        setEmailError("Domain (e.g., gmail.com) is required.");
        return;
      }

      // If email contains '@' but the domain is incomplete or malformed
      if (parts.length === 2 && parts[1].length < 3) {
        // Basic domain check
        setEmailError("Invalid domain. Example: gmail.com");
        return;
      }

      // If email is in an incomplete format like 'skjfhdkjsd@'
      if (
        recipientEmail.indexOf("@") > -1 &&
        recipientEmail.split("@").length === 2
      ) {
        setEmailError("Invalid email format. Example: user@example.com");
        return;
      }

      // Catch all for any invalid email format
      setEmailError("Invalid email format.");
      return;
    }

    // Clear the email error if validation passes
    setEmailError("");
    setStep((prev) => prev + 1);
 
  };

  const handlePrevious = () => {
    setStep((prev) => prev - 1);
  };
  const [selectedOption, setSelectedOption] = useState("");
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setCurrencyError("")
    setSelectedOption(value);

  };
  // console.log(selectedDate, "selectedDate");
  // console.log(selectedTime, "selectedTime");
  // console.log(cardType, "cardType");
  // const [loading1,setLoading]=useState(false)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
   if (!senderName) {
      setSenderError("Please enter your name.");
      return; // Stop submission if validation fails
    }
    try {
      let item = {
        user_uuid: uuid,
        card_uuid: params,
        currency_type: "INR",
        recipient_name: recipientName,
        recipient_email: recipientEmail,
        sender_name: senderName,
        do_it_late: cardType === "later" ? true : false,
        delivery_date: selectedDate,
        // delivery_time: selectedTime,
        allow_private: false,
        add_confetti: false,
      };

      setLoading(true);
      console.log(item, "item");
      // return;
      // Make the fetch POST request
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/cart/add-cart`,
        {
          // replace '/api/cart' with the correct endpoint
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },

          body: JSON.stringify(item),
        }
      );

      // Check if the request was successful
      console.log("objectres", response);
      // if (!response.ok) {
      //   throw new Error('Failed to add item to cart');
      // }

      const data = await response.json(); // Assuming the response returns JSON
      if (response.status === 200) {
        toast.success("Cart Added Successfully");
      }

      if (response.status === 400) {
        toast.error(data?.error, { autoClose: 1000 });
        // router.push('/card/farewell')
      }
      console.log("datamultistepform", data);
      // Optionally reset form values or error states
      // setError("");
      // setRecipientName("");

      if (response.status === 401 && response.statusText === "Unauthorized") {
        toast.error("token is expire");
        router.replace("/login");
        destroyCookie(null, "auth_token");
        window.location.reload();
        // cookies.remove("auth_token")
      }

      router.push(`/card/pay/${data.data.cart_uuid}`);
      console.log("Final submission", { recipientName, recipientEmail });
    } catch (err: any) {
      setLoading(false);
      // console.error("Error during submissionss", error);
      console.log("fsdfsdf", err);
      // toast.error(err.message);
    }
  };
  return (
    <>
      <div className="flex space-x-8 mb-8 absolute top-10">
        <ToastContainer />

        {/* count steps  */}
        <div className="text-center after_line disabled">
          <div className={step >= 1 ? "step_count" : "step_count1"}>1</div>
          <p className="md:text-md text-sm font-medium mb-0">
            Choose a Template
          </p>
        </div>

        <div className="text-center  before_line">
          <div className={step >= 2 ? "step_count" : "step_count1"}>2</div>
          <p className="md:text-md text-sm font-medium mb-0">
            Fill in the Details
          </p>
        </div>

        <div className={step > 3 ? "text-center before_line" : ""}>
          <div className={step >= 3 ? "step_count" : "step_count1"}>3</div>
          <p className="md:text-md text-sm font-medium mb-0">
            Complete Payment & Share
          </p>
        </div>
        {step > 3 ? (
          <div className="text-center">
            <div className="submit_svg ">
              <img src={checkSvg.src} alt="imgccheck" />
            </div>
            <p className="md:text-md text-sm font-medium mb-0">Submit</p>
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="bg-white shadow-lg rounded-lg p-10 w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-6">
          {step === 1
            ? "Who will receive this card?"
            : step === 2
            ? "When would you like us to send the card to the recipient?"
            : step === 3
            ? "Would you like to gather contributions for a gift card?"
            : "Who is sending this card?"}
        </h2>
        <form
          // loading={loading}
          onSubmit={handleSubmit}
          aria-disabled={false}
          className="space-y-6"
        >
          {step === 1 && (
            <>
              <div>
                <label
                  htmlFor="recipientName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Recipient’s Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="recipientName"
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {!recipientName && error && (
                  <p
                    className="text-red-500 text-sm mt-2"
                    style={{ color: "red" }}
                  >
                    {error}
                  </p>
                )}
              </div>

              <div     className="block mt-3 mb-3">
                <label
                  htmlFor="recipientEmail"
                  className="block mt-2 text-sm font-medium text-gray-700"
                >
                  Recipient’s Email Address
                </label>
                <input
                  id="recipientEmail"
                  type="email"
                  required
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {emailError && (
                  <p
                    className="text-red-500 text-sm mt-2"
                    style={{ color: "red" }}
                  >
                    {emailError}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={!accessToken ? handleLogin : handleNext}
                className="w-full bg-[#558ec9] mt-2 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-700"
              >
                Continue
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <div>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="cardType"
                    value="date"
                    checked={cardType === "date"}
                    onChange={() => setCardType("date")}
                    className="mr-2"
                  />
                  <span className="text-lg">Choose a delivery date</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="cardType"
                    value="later"
                    checked={cardType === "later"}
                    onChange={() => setCardType("later")}
                    className="mr-2"
                  />
                  <span className="text-lg">I’ll decide later</span>
                </label>

                {cardType === "date" && (
                  <>
                    <p className="mt-3">
                      This is based on the timezone your computer is set to.
                    </p>
                    <div className="gap-3">
                      <input
                        type="date"
                        value={selectedDate}
                        min={new Date().toISOString().split("T")[0]}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="ml-auto text-gray-500"
                        placeholder="Date"
                      />
                      {/* <input
                        type="time"
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        className="ml-auto text-gray-500"
                        placeholder="Time"
                      /> */}
                    </div>
                  </>
                )}
              </div>

              <button
                type="button"
                onClick={handlePrevious}
                style={{background:"#8080804d"}}
                className="w-full bg-gray-300 text-black py-2 px-4 rounded-md shadow-sm hover:bg-gray-400"
              >
                Back
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="w-full bg-[#558ec9] mt-2 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-700"
              >
              Continue  → 
              </button>
            </>
          )}

          {step === 3 && (
            <>
              <div>
                <label
                  htmlFor="selectOption"
                  className="block text-sm font-medium text-gray-700 mt-4"
                >
                  Please choose an option{" "}
                  <span className="text-red-500">*</span>
                </label>
                <select
                  id="selectOption"
                  value={selectedOption}
                  onChange={handleSelectChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="">Don’t collect contributions</option>
                  <option value="inr">INR</option>
                  <option value="gbp">GBP</option>
                  <option value="usd">USD</option>
                  <option value="aud">AUD</option>
                  <option value="eur">EUR</option>
                </select>
                {currencyError &&      <p
                    className="text-red-500 text-sm mt-2"
                    style={{ color: "red" }}
                  >
                    {currencyError}
                  </p>}
              </div>

              <button
                type="button"
                       style={{background:"#8080804d"}}
                onClick={handlePrevious}
                className="w-full bg-gray-300 text-black py-2 px-4 rounded-md shadow-sm hover:bg-gray-400"
              >
                Back
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="w-full bg-[#558ec9] mt-2 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-700"
              >
                Next
              </button>
            </>
          )}

          {step === 4 && (
            <>
              <div>
                <input
                  id="senderName"
                  type="text"
                  value={senderName}
                  placeholder="Your Name"
                  onChange={(e) => setSenderName(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {!senderName && senderError && (
                  <p
                    className="text-red-500 text-sm mt-2"
                    style={{ color: "red" }}
                  >
                    {senderError}
                  </p>
                )}
              </div>

              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="flexSwitchCheckChecked"
                />
                <label
                  className="form-check-label"
                  htmlFor="flexSwitchCheckChecked"
                >
                  Include confetti in this card
                </label>
              </div>

              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="flexSwitchCheckChecked"
                />
                <label
                  className="form-check-label"
                  htmlFor="flexSwitchCheckChecked"
                >
                  Allow private messages
                </label>
              </div>

              <button
                     style={{background:"#8080804d"}}
                type="button"
                onClick={handlePrevious}
                className="w-full bg-gray-300 text-black py-2 px-4 rounded-md shadow-sm hover:bg-gray-400"
              >
                Back
              </button>

              <button
                type="submit"
                className="w-full bg-blueBg mt-2 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-700"
              >
                Submit
              </button>
            </>
          )}
        </form>
        {/* Pagination Dots */}
        <div className="flex space-x-2 mt-6 items-center justify-center d-none">
          <div
            className={`w-3 h-3 ${
              step >= 1 ? "bg-blue-600" : "bg-gray-300"
            } rounded-full`}
          ></div>
          <div
            className={`w-3 h-3 ${
              step >= 2 ? "bg-blue-600" : "bg-gray-300"
            } rounded-full`}
          ></div>
          <div
            className={`w-3 h-3 ${
              step >= 3 ? "bg-blue-600" : "bg-gray-300"
            } rounded-full`}
          ></div>
          <div
            className={`w-3 h-3 ${
              step >= 4 ? "bg-blue-600" : "bg-gray-300"
            } rounded-full`}
          ></div>
        </div>
      </div>
    </>
  );
};

export default MultiStepForm;

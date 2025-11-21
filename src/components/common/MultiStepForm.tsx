"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import checkSvg from "../../assets/images/check.svg";
import { toast, ToastContainer } from "react-toastify";
import { parseCookies, destroyCookie } from "nookies";
import { useAccessToken } from "@/app/context/AccessTokenContext";

interface MultiStepFormProps {
  params: { card_uuid: string };
}

interface UserInfo {
  uuid: string;
}

const MultiStepForm: React.FC<MultiStepFormProps> = ({ params }) => {
  const router = useRouter();
  const { accessToken, setAccessToken } = useAccessToken();
  const [step, setStep] = useState(1);
  const [recipientName, setRecipientName] = useState("");
  const [loading, setLoading] = useState(false);
  const [senderName, setSenderName] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [cardType, setCardType] = useState<"date" | "later">("later");
  const [error, setError] = useState("");
  const [senderError, setSenderError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [uuid, setUuid] = useState<string | null>(null);
  const [currencyError, setCurrencyError] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [countBundle, setCountBundle] = useState<number>(0);
  const [showCardChoiceModal, setShowCardChoiceModal] = useState(false);
  const [cartUuid, setCartUuid] = useState<string | null>(null);

  // Initialize cookies
  useEffect(() => {
    const cookies = parseCookies();
    const token = cookies.auth_token;
    if (token) setAccessToken(token);

    const userInfoCookie = cookies.userInfo;
    if (userInfoCookie) {
      try {
        const parsedUserInfo: UserInfo = JSON.parse(
          decodeURIComponent(userInfoCookie)
        );
        if (parsedUserInfo?.uuid) setUuid(parsedUserInfo.uuid);
      } catch (error) {
        console.error("Error parsing userInfo cookie:", error);
      }
    }
  }, [setAccessToken]);

  // Fetch user's bundle count
  useEffect(() => {
    const fetchBundleCount = async () => {
      if (!accessToken) return;

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/user/profile`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);

        const result = await response.json();
        const bundleCount = result?.data?.bundle_card_count ?? 0;
        setCountBundle(bundleCount);
      } catch (error) {
        console.error("Error fetching bundle count:", error);
        // toast.error("Failed to fetch profile data");
      }
    };

    fetchBundleCount();
  }, [accessToken]);

  // Login redirect
  const handleLogin = () => {
    toast.error("Please login");
    router.push("/login");
  };

  // Email validation
  const validateEmail = (email: string): string => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "Recipient email is required.";
    if (!emailRegex.test(email)) return "Invalid email format.";
    return "";
  };

  // Step navigation
  const handleNext = () => {
    if (step === 1) {
      if (!recipientName) {
        setError("Recipient name is required.");
        return;
      }
      const emailValidationError = validateEmail(recipientEmail);
      if (emailValidationError) {
        setEmailError(emailValidationError);
        return;
      }
      setError("");
      setEmailError("");
    } else if (step === 3 && !selectedOption) {
      setCurrencyError("Please select contributions currency.");
      return;
    }
    setStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setStep((prev) => prev - 1);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
    setCurrencyError("");
  };

  // Form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!senderName) {
      setSenderError("Please enter your name.");
      return;
    }
    setSenderError("");

    if (!uuid || !accessToken) {
      toast.error("User authentication required.");
      router.push("/login");
      return;
    }
    try {
      setLoading(true);
      const item = {
        user_uuid: uuid,
        card_uuid: params,
        currency_type: selectedOption || "INR",
        recipient_name: recipientName,
        recipient_email: recipientEmail,
        sender_name: senderName,
        do_it_late: cardType === "later",
        delivery_date: selectedDate,
        allow_private: false,
        add_confetti: false,
        is_remove_from_cart: countBundle === 0 ? 0 : 1,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/cart/add-cart`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(item),
        }
      );

      const data = await response.json();

      if (response.status === 200) {
        toast.success("Cart added successfully");
        setCartUuid(data.data.cart_uuid);

        // Only show modal if user has bundle cards available
        if (countBundle > 0) {
          setShowCardChoiceModal(true);
        } else {
          // Redirect directly to payment if no bundle cards
          router.push(`/card/pay/${data.data.cart_uuid}?cardId=${params}`);
        }
      } else if (response.status === 400) {
        toast.error(data?.error || "Invalid request");
      } else if (response.status === 401) {
        toast.error("Session expired. Please log in again.");
        destroyCookie(null, "auth_token");
        router.replace("/login");
      } else {
        toast.error(data?.error || "Something went wrong");
      }
    } catch (err: any) {
      console.error("Error during submission:", err);
      toast.error(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="flex space-x-8 mb-8 absolute top-10">
        <div className="text-center after_line disabled">
          <div className={step >= 1 ? "step_count" : "step_count1"}>1</div>
          <p className="md:text-md text-sm font-medium mb-0 text-center">
            Choose a Template
          </p>
        </div>
        <div className="text-center before_line">
          <div className={step >= 2 ? "step_count" : "step_count1"}>2</div>
          <p className="md:text-md text-sm font-medium mb-0 text-center">
            Fill in the Details
          </p>
        </div>
        <div className={step > 3 ? "text-center before_line" : ""}>
          <div className={step >= 3 ? "step_count" : "step_count1"}>3</div>
          <p className="md:text-md text-sm font-medium mb-0 text-center">
            Complete Payment & Share
          </p>
        </div>
        {step > 3 && (
          <div className="text-center">
            <div className="submit_svg">
              <img src={checkSvg.src} alt="check" />
            </div>
            <p className="md:text-md text-sm font-medium mb-0">Submit</p>
          </div>
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

        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 && (
            <>
              <div>
                <label
                  htmlFor="recipientName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Recipient&apos;s Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="recipientName"
                  type="text"
                  value={recipientName}
                  onChange={(e) => {
                    setRecipientName(e.target.value);
                    setError("");
                  }}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              </div>

              <div>
                <label
                  htmlFor="recipientEmail"
                  className="block text-sm font-medium text-gray-700"
                >
                  Recipient&apos;s Email Address{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  id="recipientEmail"
                  type="email"
                  value={recipientEmail}
                  onChange={(e) => {
                    setRecipientEmail(e.target.value);
                    setEmailError("");
                  }}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {emailError && (
                  <p className="text-red-500 text-sm mt-2">{emailError}</p>
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
                  <span className="text-lg">I&apos;ll decide later</span>
                </label>

                {cardType === "date" && (
                  <>
                    <p className="mt-3">
                      This is based on the timezone your computer is set to.
                    </p>
                    <div className="flex gap-3">
                      <input
                        type="date"
                        value={selectedDate}
                        min={new Date().toISOString().split("T")[0]}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="Date"
                      />
                    </div>
                  </>
                )}
              </div>

              <button
                type="button"
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
                Continue →
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
                  className="mt-1 block w-full px-3 textContribution py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="">Don&apos;t collect contributions</option>
                  <option value="inr">INR</option>
                  <option value="gbp">GBP</option>
                  <option value="usd">USD</option>
                  <option value="aud">AUD</option>
                  <option value="eur">EUR</option>
                </select>
                {currencyError && (
                  <p className="text-red-500 text-sm mt-2">{currencyError}</p>
                )}
              </div>

              <button
                type="button"
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
                  onChange={(e) => {
                    setSenderName(e.target.value);
                    setSenderError("");
                  }}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {senderError && (
                  <p className="text-red-500 text-sm mt-2">{senderError}</p>
                )}
              </div>

              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="flexSwitchCheckConfetti"
                />
                <label
                  className="form-check-label"
                  htmlFor="flexSwitchCheckConfetti"
                >
                  Include confetti in this card
                </label>
              </div>

              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="flexSwitchCheckPrivate"
                />
                <label
                  className="form-check-label"
                  htmlFor="flexSwitchCheckPrivate"
                >
                  Allow private messages
                </label>
              </div>

              <button
                type="button"
                onClick={handlePrevious}
                className="w-full bg-gray-300 text-black py-2 px-4 rounded-md shadow-sm hover:bg-gray-400"
              >
                Back
              </button>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#558ec9] mt-2 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </>
          )}
        </form>

        <div className="flex space-x-2 mt-6 items-center justify-center">
          {[1, 2, 3, 4].map((dot) => (
            <div
              key={dot}
              className={`w-3 h-3 ${
                step >= dot ? "bg-blue-600" : "bg-gray-300"
              } rounded-full`}
            />
          ))}
        </div>
      </div>

      {/* Card choice modal */}
      {showCardChoiceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-10 w-[500px] h-[20rem] items-center flex justify-center text-center relative">
            <div>
              <button
                onClick={() => setShowCardChoiceModal(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl font-bold"
              >
                &times;
              </button>

              <h2 className="text-2xl font-semibold mb-4">
                Cards available in bundle
              </h2>
              <p className="mb-6 text-xl">
                {` You have  ${countBundle} available cards in your bundle. Do you want to use
                them now ?`}
              </p>
              <div className="flex justify-between gap-4 mt-2">
                <button
                  onClick={async () => {
                    setShowCardChoiceModal(false);
                    if (!accessToken || !uuid) return;
                    const useCardRes = await fetch(
                      `${process.env.NEXT_PUBLIC_API_URL}/cart/use-card/${uuid}`,
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${accessToken}`,
                        },
                      }
                    );
                    const useCardData = await useCardRes.json();
                    if (useCardData) {
                      router.push(`/successfull?cart_uuid=${cartUuid}`);
                    } else {
                      toast.error(useCardData?.error || "Failed to use card");
                    }
                  }}
                  className="flex-1 text-lg bg-heroBg text-white py-2 px-4 rounded-md"
                >
                  YES
                </button>
                <button
                  onClick={() => {
                    setShowCardChoiceModal(false);
                    router.push(`/card/pay/${cartUuid}?cardId=${params}`);
                  }}
                  className="flex-1   bg-blueBg text-lg text-white py-2 px-4 rounded-md"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MultiStepForm;

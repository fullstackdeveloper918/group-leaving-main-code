"use client";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
// import { cookies } from 'next/headers';
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const AccountEmailprefrence = ({ userInfo, data }: any) => {
  const router = useRouter();
  console.log(data, "datadatadata");
  const gettoken = Cookies.get("auth_token");
  // const gettoken:any = cookiesList.get('auth_token');

  const [cardReminders, setCardReminders] = useState<boolean>(
    data?.data?.card_remainders
  );
  const [eventReminders, setEventReminders] = useState<boolean>(
    data?.data?.event_remainders
  );
  const [paidCardUpdates, setPaidCardUpdates] = useState<boolean>(
    data?.data?.paid_card_updates
  );
  const [marketingEmails, setMarketingEmails] = useState<boolean>(
    data?.data?.marketing_email_and_discounts
  );

  const token = "your_token_here";
  const submit = async () => {
    try {
      const requestData = {
        user_uuid: data?.data?.uuid,
        card_remainders: cardReminders,
        event_remainders: eventReminders,
        paid_card_updates: paidCardUpdates,
        marketing_email_and_discounts: marketingEmails,
      };

      let res = await fetch(
        "https://dating.goaideme.com/user/email-preferences",
        {
          method: "POST", // Method set to POST
          headers: {
            "Content-Type": "application/json", // Indicates that you're sending JSON
            Authorization: `Bearer ${gettoken}`, // Send the token in the Authorization header
          },
          body: JSON.stringify(requestData), // Stringify the data you want to send in the body
        }
      );

      // Parse the response JSON
      let posts = await res.json();
      // console.log(posts.message, "sds");
      if (posts?.status === 200) {
        // console.log(posts.status, "sds");
        toast.success(posts?.message, { autoClose: 2000 });
        // toast.success("Preferences Updated Successfully");
      } else if (
        posts?.statusCode === 401 &&
        posts?.message === "Token is expire"
      ) {
        Cookies.remove("auth_token");
        Cookies.remove("COOKIES_USER_ACCESS_TOKEN");
        router.replace("/login");
        window.location.reload();
      }
    } catch (error) {}
  };
  return (
    <>
      <ToastContainer />
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Email Settings</h2>
        <div className="space-y-4">
          {/* Card Reminders */}
          <div className="form-check form-switch items-center justify-between">
            <input
              type="checkbox"
              id="card-reminders"
              checked={cardReminders}
              onChange={() => setCardReminders(!cardReminders)}
              className="form-check-input"
            />
            <label htmlFor="card-reminders" className="text-sm font-medium">
              Greeting Reminders
            </label>
          </div>
          <p className="text-xs text-gray-500 pl-4">
            Get reminders about greetings you&apos;ve started, such as a prompt
            to finish a greeting you began.
          </p>

          {/* Event Reminders */}
          <div className="form-check form-switch items-center justify-between">
            <label htmlFor="event-reminders" className="text-sm font-medium">
              Event Notifications
            </label>
            <input
              type="checkbox"
              id="event-reminders"
              checked={eventReminders}
              onChange={() => setEventReminders(!eventReminders)}
              className="form-check-input"
            />
          </div>
          <p className="text-xs text-gray-500 pl-4">
            Receive notifications for events you set up on our reminders page.
          </p>

          {/* Paid Card Updates */}
          <div className="form-check form-switch items-center justify-between">
            <label htmlFor="paid-updates" className="text-sm font-medium">
              Paid Greeting Updates
            </label>
            <input
              type="checkbox"
              id="paid-updates"
              checked={paidCardUpdates}
              onChange={() => setPaidCardUpdates(!paidCardUpdates)}
              className="form-check-input"
            />
          </div>
          <p className="text-xs text-gray-500 pl-4">
            Get updates about your paid greetings, like a notice before they are
            sent.
          </p>

          {/* Marketing Emails */}
          <div className="form-check form-switch items-center justify-between">
            <label htmlFor="marketing-emails" className="text-sm font-medium">
              Product News & Offers
            </label>
            <input
              type="checkbox"
              id="marketing-emails"
              checked={marketingEmails}
              onChange={() => setMarketingEmails(!marketingEmails)}
              className="form-check-input"
            />
          </div>
          <p className="text-xs text-gray-500 pl-4">
            Occasionally receive updates about new features, special events, and
            exclusive discounts.
          </p>
        </div>

        {/* Informational Section */}
        <div className="bg-blue-100 p-3 mt-4 rounded-md text-sm text-blue-700">
          <p>
            We&apos;ll always send you important emails about your purchases, such as
            receipts, notifications when your greeting is sent, and thank you
            notes from recipients.
          </p>
        </div>

        {/* Update Button */}
        <button
          onClick={submit}
          className="w-full mt-6 bg-blue-600 text-black border-2 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Save Preferences
        </button>
      </div>
    </>
  );
};

export default AccountEmailprefrence;

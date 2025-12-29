import Faq from "@/components/Faq";
import React from "react";

const ContactUs = () => {
  return (
    <section className="about-us mt-8 mb-20 px-4">
      <div className="container">
        <h1 className="text-3xl font-bold mb-6">Contact Us</h1>

        <p className="mb-4">
          Many common questions can be answered by visiting our{" "}
          <span className="font-medium">Frequently Asked Questions</span> page,
          where we cover helpful information about using GroupWish.
        </p>

        <p className="mb-4">
          If you still need assistance, please feel free to contact us by email
          at{" "}
          <a
            href="mailto:hello@groupwish.in"
            className="text-blue-600 underline"
          >
            help@groupwish.in
          </a>
          .
        </p>

        <p className="mb-4">
          Our team aims to respond to all emails within{" "}
          <strong>24 hours, Monday to Friday</strong>. In many cases, card
          updates and changes can be made by logging into your account, so we
          recommend checking there first.
        </p>

        <p>
          We’re here to ensure your experience with GroupWish is smooth and
          enjoyable, and we’re always happy to help if you need support.
        </p>
      </div>

      <div className="max-w-7xl mx-auto py-8">
        <Faq />
      </div>
    </section>
  );
};

export default ContactUs;

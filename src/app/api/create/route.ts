import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

// Define Razorpay instance with your credentials
const razorpay = new Razorpay({
    key_id: "rzp_test_NPDqhJnbXJi072",
    key_secret: "g2IhJGjc85qyGtRtBlMMssod",
});

export async function POST(request: NextRequest) {
  try {
    const amount = 100 * 100; // Amount in paise (100 INR)

    // Create a Razorpay order
    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: "receipt_" + Math.random().toString(36).substring(7),
      notes: {
        escrow: "true", // Custom note indicating escrow
      },
    });

    console.log("Order created successfully:", order);
let data={
    account: "P1gOu6pIR43T4d", // Replace with the actual beneficiary Razorpay account ID
    amount,
    currency: "INR",
    notes: {
      purpose: "escrow",
    },
    linked_account_notes: ["beneficiary_name"],
    on_hold: 1, // Funds are placed on hold (escrow)
    on_hold_until: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60, // Hold for 7 days
  }
    // Create a transfer with the on-hold flag (escrow)
    const transfer = await razorpay.transfers.create(data);

    console.log("Transfer created successfully:", transfer);

    // Return the relevant data to the frontend, including the hold amount
    return NextResponse.json({
      orderId: order.id,
      transferId: transfer.id, // Accessing transfer ID properly after awaiting
      holdAmount: amount,
      // Assuming transfer.recipient or another property contains account info, adjust accordingly
      beneficiaryAccount: transfer.recipient || 'Unknown account', // Use appropriate property
    }, { status: 200 });

  } catch (error: any) {
    // Capture and log the error from Razorpay
    console.error("Error creating escrow order:", error.message || error);
    return NextResponse.json(
      { error: error.message || "Error creating escrow order" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay"

const razorpay = new Razorpay({
    key_id:"rzp_test_NPDqhJnbXJi072",
    key_secret:"g2IhJGjc85qyGtRtBlMMssod",
});

export async function POST(request:NextRequest){
    try {
        const body = await request.json();
        const { amount } = body; // amount in paise

        if (!amount || isNaN(amount) || amount < 100) {
            return NextResponse.json(
                { error: "Invalid or missing amount" },
                { status: 400 }
            );
        }

        const order =await razorpay.orders.create({
            amount: amount, // use dynamic amount from frontend
            currency:"INR",
            receipt:"receipt_" + Math.random().toString(36).substring(7),
        });
        return NextResponse.json({orderId:order.id}, {status:200});
    } catch (error) {
        console.log(error,"Error creating order");
        return NextResponse.json(
            {error:"Error creating order"},
            {status:500}
        )
        
    }
}
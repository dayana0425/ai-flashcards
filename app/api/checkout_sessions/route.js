import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

const formatAmountForStripe = (amount, currency) => {
  return Math.round(amount * 100);
};

export async function POST(req) {
  // CREATE A CHECKOUT SESSION
  try {
    const params = {
      mode: "subscription", // recurring payment
      payment_method_types: ["card"], // only card payments
      line_items: [ // the product(s) being purchased (in this case, a subscription)
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Pro subscription",
            },
            unit_amount: formatAmountForStripe(1, "usd"), // $1.00
            recurring: {
              interval: "month",
              interval_count: 1,
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${req.headers.get(
        "Referer"
      )}result?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get(
        "Referer"
      )}result?session_id={CHECKOUT_SESSION_ID}`,
    };

    // Create a new checkout session
    const checkoutSession = await stripe.checkout.sessions.create(params);

    // Return the checkout session to the client
    return NextResponse.json(checkoutSession, {
      status: 200,
    });

  } catch (error) {
    console.error("Error creating checkout session:", error);
    return new NextResponse(
      JSON.stringify({ error: { message: error.message } }),
      { status: 500 }
    );
  }
}

export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;
  // Extract the session ID from the query string
  const session_id = searchParams.get("session_id");

  try {
    if (!session_id) {
      throw new Error("Session ID is required");
    }
    // Retrieve the checkout session using Stripe's API
    const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);

    return NextResponse.json(checkoutSession);
  } catch (error) {
    console.error("Error retrieving checkout session:", error);
    return NextResponse.json(
      { error: { message: error.message } },
      { status: 500 }
    );
  }
}

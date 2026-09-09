import Stripe from "stripe";
import dotenv from "dotenv";
import Product from "../models/Product.js";
import Users from "../models/Users.js";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createPaymentIntent = async (req, res) => {
  try {
    const { currency = "usd" } = req.body;

    const user = await Users.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    let totalAmount = 0;

    for (const itemId in user.cartData) {
      const quantity = user.cartData[itemId];

      if (quantity > 0) {
        const product = await Product.findOne({
          id: itemId,
        });

        if (product) {
          totalAmount += product.new_price * quantity;
        }
      }
    }

    if (totalAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalAmount * 100),
      currency,

      metadata: {
        userId: user._id.toString(),
      },

      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never",
      },
    });

    res.status(200).json({
      status: "success",
      message: "Create Payment Intent Successfully!",
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      amount: totalAmount,
      status: paymentIntent.status,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      error: error.message,
      statusCode: 500,
    });
  }
};

export { createPaymentIntent };

import express from "express";
import multer from "multer";
import path from "path";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import jwt from "jsonwebtoken";
import Order from "./models/Order.js";
dotenv.config();

import fetchUser from "./middleware/fetchUser.js";
import paymentRoute from "./routes/PaymentRoute.js";
import Product from "./models/Product.js";
import Users from "./models/Users.js";

import Stripe from "stripe";

const app = express();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

stripe.accounts
  .retrieve()
  .then((account) => {
    console.log("Backend Stripe account:", account.id);
  })
  .catch((error) => {
    console.log("Stripe connection error:", error.message);
  });
// WEBHOOK
app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    console.log("WEBHOOK HIT");

    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET,
      );
    } catch (error) {
      console.log("Webhook signature verification failed:", error.message);

      return res.sendStatus(400);
    }

    console.log("Event type:", event.type);

    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object;

      console.log("Payment successful");

      const userId = paymentIntent.metadata.userId;

      const user = await Users.findById(userId);

      if (!user) {
        console.log("User not found");
        return res.sendStatus(200);
      }

      const items = [];

      for (const itemId in user.cartData) {
        const quantity = user.cartData[itemId];

        if (quantity > 0) {
          items.push({
            productId: Number(itemId),
            quantity: quantity,
          });
        }
      }

      const order = new Order({
        userId: userId,
        items: items,
        amount: paymentIntent.amount / 100,
        paymentId: paymentIntent.id,
        status: "paid",
      });

      await order.save();

      let emptyCart = {};

      for (let i = 0; i < 300; i++) {
        emptyCart[i] = 0;
      }

      user.cartData = emptyCart;

      await user.save();

      console.log("Order created:", order._id);
      console.log("Cart cleared");
    }

    res.json({
      received: true,
    });
  },
);

// NORMAL MIDDLEWARE
app.use(express.json());
app.use(cors());

// MONGODB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err.message));

// MULTER
const storage = multer.diskStorage({
  destination: "./upload/images",

  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`,
    );
  },
});

const upload = multer({
  storage: storage,
});

// PAYMENT ROUTES
app.use("/", paymentRoute);

// IMAGES
app.use("/images", express.static("upload/images"));

// UPLOAD
app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:4000/images/${req.file.filename}`,
  });
});

// ADD PRODUCT
app.post("/addproduct", async (req, res) => {
  let products = await Product.find({});

  let id;

  if (products.length > 0) {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];

    id = last_product.id + 1;
  } else {
    id = 1;
  }

  const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });

  console.log(product);

  await product.save();

  console.log("saved");

  res.json({
    success: true,
    name: req.body.name,
  });
});

// REMOVE PRODUCT
app.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({
    id: req.body.id,
  });

  console.log("removed");

  res.json({
    success: true,
    name: req.body.name,
  });
});

// ALL PRODUCTS
app.get("/allproducts", async (req, res) => {
  let products = await Product.find({});

  res.send(products);
});

// SIGNUP
app.post("/signup", async (req, res) => {
  let check = await Users.findOne({
    email: req.body.email,
  });

  if (check) {
    return res.status(400).json({
      success: false,
      error: "Email Already Used",
    });
  }

  let cart = {};

  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }

  const user = new Users({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
  });

  await user.save();

  const data = {
    user: {
      id: user.id,
    },
  };

  const token = jwt.sign(data, "secret_ecom");

  res.send({
    success: true,
    token,
  });
});

// LOGIN
app.post("/login", async (req, res) => {
  let user = await Users.findOne({
    email: req.body.email,
  });

  if (user) {
    const passCompare = req.body.password === user.password;

    if (passCompare) {
      const data = {
        user: {
          id: user.id,
        },
      };

      const token = jwt.sign(data, "secret_ecom");

      res.json({
        success: true,
        token,
      });
    } else {
      res.json({
        success: false,
        error: "Wrong Password",
      });
    }
  } else {
    res.json({
      success: false,
      error: "Wrong Email Id",
    });
  }
});

// NEW COLLECTIONS
app.get("/newcollections", async (req, res) => {
  let products = await Product.find({});

  let newCollection = products.slice(1).slice(-8);

  console.log("new collection fetched");

  res.send(newCollection);
});

// POPULAR IN WOMEN
app.get("/popularinwomen", async (req, res) => {
  let products = await Product.find({
    category: "women",
  });

  let popular_in_women = products.slice(0, 4);

  console.log("popular_in_women fetched");

  res.send(popular_in_women);
});

// ADD TO CART
app.post("/addtocart", fetchUser, async (req, res) => {
  let userData = await Users.findOne({
    _id: req.user.id,
  });

  userData.cartData[req.body.itemId] += 1;

  await Users.findOneAndUpdate(
    {
      _id: req.user.id,
    },
    {
      cartData: userData.cartData,
    },
  );

  res.send("Added");
});

// REMOVE FROM CART
app.post("/removefromcart", fetchUser, async (req, res) => {
  let userData = await Users.findOne({
    _id: req.user.id,
  });

  if (userData.cartData[req.body.itemId] > 0) {
    userData.cartData[req.body.itemId] -= 1;
  }

  await Users.findOneAndUpdate(
    {
      _id: req.user.id,
    },
    {
      cartData: userData.cartData,
    },
  );

  res.send("Removed");
});

// GET CART
app.post("/getcart", fetchUser, async (req, res) => {
  let usersData = await Users.findOne({
    _id: req.user.id,
  });

  res.json(usersData.cartData);
});

// SERVER
app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});

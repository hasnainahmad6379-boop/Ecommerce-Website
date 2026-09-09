import express from "express";
import { createPaymentIntent } from "../controllers/PaymentController.js";
import fetchUser from "../middleware/fetchUser.js";

const router = express.Router();

router.post("/create-payment-intent", fetchUser, createPaymentIntent);

export default router;

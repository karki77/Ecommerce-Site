import express from "express";
import { addOrder, changeOrderStatus, getMyOrders, getOrderById, getOrders } from "../controller/order.controller.js";
import { checkAdmin, checkAuth } from "../middleware/auth.middleware.js";
import { deleteProduct } from "../controller/product.contoller.js";


const router = express.Router();

router.get("/", checkAuth, checkAdmin, getOrders);
router.get("/myorders", checkAuth, getMyOrders);
router.post("/addorder", checkAuth, addOrder);
router.put("/:id/changestatus", checkAuth, checkAdmin, changeOrderStatus);
router.get("/:id", checkAuth, getOrderById );


export default router;
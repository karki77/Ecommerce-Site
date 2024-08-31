import express from "express";
import cookieParser from "cookie-parser";
import notFoundHandler from "./middleware/notFoundMiddleware.js";
import errorHandler from "./middleware/errorMiddleware.js";
import logger from './middleware/logger.js';
// router imports
import userRouter from './routes/user.router.js';
import productRouter from "./routes/product.router.js";
import orderRouter  from "./routes/order.router.js"
import uploadRouter from "./routes/upload.router.js";
import path from "path";


// initialize express app

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/uploads", express.static(path.join(path.resolve(), 'uploads')));
app.use(cookieParser());
app.use(logger);

// routes

app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/orders", orderRouter);
app.use( "/api/v1/image",uploadRouter);

// error handlers
app.use(notFoundHandler);
app.use(errorHandler);

export { app };


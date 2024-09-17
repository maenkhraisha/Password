import express from "express";
import DBConn from "./config/DB_conn.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import verifyJWT from "./middleware/verifyJWT.js";
import { userRouter } from "./routes/userRoute.js";
import { passwordRouter } from "./routes/passwordRoute.js";
import { categoryRouter } from "./routes/categoryRoute.js";
import { refreshRouter } from "./routes/refreshRoute.js";
dotenv.config();
const app = express();

app.use(
    cors({
        origin: ["http://localhost:3000"],
        credentials: true,
    })
);
app.use(cookieParser());

app.use(express.json());
app.use("/auth", userRouter);
app.use("/refresh", refreshRouter);

app.use(verifyJWT);
app.use("/password", passwordRouter);
app.use("/category", categoryRouter);

app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
});

DBConn();

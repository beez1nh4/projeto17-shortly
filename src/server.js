import express from "express";
import usersRoutes from "./routes/users.routes.js"
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(usersRoutes);

const port = process.env.PORT;
app.listen(4000, () => console.log(`Server running in port: 4000`));
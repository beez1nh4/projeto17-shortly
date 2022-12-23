import express from "express";
import usersRoutes from "./routes/users.routes.js"
import urlsRoutes from "./routes/urls.routes.js"
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(usersRoutes);
app.use(urlsRoutes);

const port = process.env.PORT;
app.listen(port, () => console.log(`Server running in port: ${port}`));
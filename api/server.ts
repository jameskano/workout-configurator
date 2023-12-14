import express from "express";
import process from "process";

const app = express();
const port = process.env.PORT;

app.listen(port, () => console.log("Server running on port" + port));

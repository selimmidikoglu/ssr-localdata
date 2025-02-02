import express from "express";
import compression from "compression";
import ssr from "./routes/ssr";

const app = express();

app.use(compression());
app.use(express.static("public"));

app.use("/", ssr);


// const port = process.env.PORT || 3030;
const port = 6006
app.listen(port, function listenHandler() {
  console.info(`Running on ${port}...`);
});
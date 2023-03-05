import colors from "colors";
import express from "express";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import router from "./routers/index.js";

const __dirname = fileURLToPath(dirname(import.meta.url));
const app = express();
app.set("view engine", "ejs");
app.set("views", join(__dirname, "views"));

app.use(express.static(join(__dirname, "public")));

app.use("/", (req, res, next) => {
  const error = new Error("Not found");
  error.status = 500;
  if (Object.keys(req.query).length > 0) return next(error);
  next();
});

app.use("/", router);

app.use("/", (req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use("/", (err, req, res, next) => {
  res.render("error.ejs", { errStatus: err.status });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is listening at ${PORT}`));

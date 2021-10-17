require("dotenv").config();
const express = require("express");
const colors = require("colors");
const cors = require("cors");
const { json, urlencoded } = require("body-parser");
const morgan = require("morgan");

/* -------------------------------------------------------------------------- */
const server = express();
const port = process.env.PORT || 4001;

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerOptions = require("../swagger-config");
const swaggerDocs = swaggerJsDoc(swaggerOptions);

const connect = require("./db/db");
const { verifyAuth } = require("./controllers/auth.controller");

const authRouter = require("./routes/auth.router");
// const testRouter = require("./routes/test.router");
const productRouter = require("./routes/product.router");
const categoryRouter = require("./routes/category.router");
const cartRouter = require("./routes/cart.router");
const orderRouter = require("./routes/order.router");
/* -------------------------------------------------------------------------- */

server.disable("x-powered-by");

server.use(cors());
server.use(json());
server.use(urlencoded({ extended: true }));
// server.use(morgan("dev"));
server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

server.use("/api/auth", authRouter);
// server.use("/api", verifyAuth);
server.use("/api/product", productRouter);
server.use("/api/category", categoryRouter);
server.use("/api/cart", cartRouter);
server.use("/api/order", orderRouter);

// server.use("/api/test", testRouter);

server.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

server.use((error, req, res, next) => {
  res.status(error.status || 500).json({ error: { message: error.message } });
});

startServer();

async function startServer() {
  await connect();
  server.listen(port, (err) => {
    if (err) console.log(`❌ Unable to connect the server:  ${err}`.red);
    console.log(`🌍 Server listening on port ${port}`.green);
    console.log(`REST API on http://localhost:${port}/api`);
  });
}

import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(cors({ origin: [`http://localhost:5173`], credentials: true }));
app.use(express.json());
app.use(cookieParser());

const customLogger = {
  log: console.log,
  debug: console.debug,
  info: console.info,
  warn: console.warn,
  error: console.error,
};
app.use((req, res, next) => {
  console.log(`[Gateway] ${req.method} ${req.originalUrl}`);
  next();
});
console.log("AUTH_SERVICE =", process.env.AUTH_SERVICE);

// AUTH SERVICE
app.use(
  "/auth",
  createProxyMiddleware({
    target: process.env.AUTH_SERVICE,
    changeOrigin: true,
    pathRewrite: { "^/auth": "" },
    logger: customLogger,
  })
);

// PRODUCT SERVICE
app.use(
  "/products",
  createProxyMiddleware({
    target: process.env.PRODUCT_SERVICE,
    changeOrigin: true,
    pathRewrite: { "^/products": "" },
    logger: customLogger,
  })
);

// FAVORITE SERVICE
app.use(
  "/favorites",
  createProxyMiddleware({
    target: process.env.FAVORITE_SERVICE,
    changeOrigin: true,
    pathRewrite: { "^/favorites": "" },
    logger: customLogger,
  })
);

// Start the Gateway
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`API Gateway is running at http://localhost:${PORT}`);
});

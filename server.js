/**
 * @requires import express
 */
const express = require("express");

/**
 * @requires import dotenv
 */
const dotenv = require("dotenv");

/**
 * @requires import colors
 */
const colors = require("colors");

/**
 * @requires import cors
 */
const cors = require("cors");

/**
 * @requires import morgan (pencatat setiap request)
 */
const morgan = require("morgan");

/**
 * @requires import dotenv
 * @important bikin file .env dulu sebelum import dotenv
 * */
dotenv.config({ path: "./config/config.env" });

/**
 * @requires import database
 */
const { initDB } = require("./config/database");
initDB();
/**
 * @implements panggil express
 */
const app = express();

/**
 * @implements body-parser express
 */
app.use(express.json());

/**
 * @implements cors express
 */
app.use(cors());

/**
 * @implements menginisiasi morgan
 */
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

/**
 * @implements menginisiasi PORT
 */
const PORT = process.env.PORT || 5000;

/**
 * @implements menghubungkan server
 */
app.listen(
  PORT,
  console.log(
    `Server berjalan mode ${process.env.NODE_ENV} di port ${PORT}`.yellow.bold
  )
);

/**
 * @implements router
 * @public router registrasi
 * @public router login
 * @private router produk
 * @private router pembelian
 */
const registrasi = require("./routes/register");
app.use("/api/v1/register", registrasi);
const login = require("./routes/login");
app.use("/api/v1/login", login);
const produk = require("./routes/produk");
app.use("/api/v1/produk", produk);
const pembelian = require("./routes/pembelian");
app.use("/api/v1/pembelian", pembelian);

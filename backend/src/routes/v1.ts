import express from "express";
import { fibRouter } from "./fib";

const v1Router = express.Router();
v1Router.use('/fib', fibRouter);

export { v1Router };
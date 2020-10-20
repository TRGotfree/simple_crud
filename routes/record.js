const express = require("express");
const router = express.Router();

//TODO: Написать обработчики
router.get("/records");
router.get("/records/:id");
router.post("/records");
router.put("/records/:id");
router.delete("/records/:id")

const express = require("express");
const Model = require("./Model/model");

const router = express.Router();

// post method
router.post("/post", (req, res) => {
  res.send("Post API");
});

// get method
router.get("/get", (req, res) => {
  res.send("Get API");
});

// get by ID method
router.get("/get/:id", (req, res) => {
  res.send(req.params.id);
});

// update by ID method
router.patch("/update/:id", (req, res) => {
  res.send("Update by ID API");
});

// delete by ID method
router.delete("/delete/:id", (req, res) => {
  res.send("Delete by ID API");
});

module.exports = router;

const express = require("express");

const route = express.Router();

// data base
const data = require("./database");

// payload vaildation
const Joi = require("joi");

const threadSchema = Joi.object().keys({
  title: Joi.string().min(3).max(1000).required(),
  body: Joi.string().min(10).max(2013).required(),
  name: Joi.string().min(1).max(250),
});

route.get("/threads", (req, res) => {
  const userId = req.query.userId;
  if (userId) {
    return res.json(data.filter((video) => video.userId === Number(userId)));
  }
  return res.json({ data });
});

route.get("/threads/:id", (req, res) => {
  const videoId = req.params.id;
  return res.json(data.find((video) => video.id === Number(videoId)));
});

route.post("/threads", (req, res) => {
  const payload = req.body;
  const result = threadSchema.validate(payload);
  console.log({ result });
  if (result.error) {
    return res.json({ success: false, error: result.error.details[0].message });
  }
  return res.json({ success: true });
});
module.exports = route;

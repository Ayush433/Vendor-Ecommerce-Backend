const express = require("express");
const joi = require("joi");
const router = express.Router();

const ProductSchema = joi.object({
  title: joi.string().min(5).max(40),
  price: joi.number().required(),
  urlKey: joi.string().required(),
  description: joi.string().required(),
  tags: joi.string().required(),
  category: joi.string(),
  volume: joi.object({
    height: joi.number().required(),
    weight: joi.number().required(),
    length: joi.number().required(),
  }),

  order: joi.string().required(),
  image: joi.string().required(),
  video: joi.array().items(
    joi.object({
      caption: joi.string().required(),
    })
  ),
});

module.express = router;

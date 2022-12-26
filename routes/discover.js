const { Router } = require("express");
const route = Router();
const CategoryModel = require("../models/category");
const GalleryModel = require("../models/gallery");

route.get("/discover/:category", async (req, res, next) => {
  try {
    const category = req.params.category;
    if (!category) {
      res.status(400).send("Bad Request");
    }
    const galleryDetails = await GalleryModel.find({
      category: { $in: [category] },
    });

    res.json(galleryDetails);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = route;

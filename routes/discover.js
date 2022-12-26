const { Router } = require("express");
const route = Router();
const CategoryModel = require("../models/category");
const GalleryModel = require("../models/gallery");

route.get("/discover/:category", async (req, res, next) => {
  try {
    const category = req.params.category;
    const shuffle = req.params.shuffle;
    const sortByDate = req.query.sortByDate;
    const filterByLike = req.query.filterByLike;

    if (!category) {
      res.status(400).send("Bad Request");
    }

    let sort = 1;
    let skip = parseInt(shuffle) || 0;

    if (sortByDate) {
      if (sortByDate == "asc") {
        sort = 1;
      } else if (sortByDate == "desc") {
        sort = -1;
      }
    }

    let filter = {};
    if (filterByLike) {
      filter = { likes: 1 };
    }

    const galleryDetails = await GalleryModel.find({
      category: { $in: [category] },
      ...filter,
    })
      .sort({ createdAt: sort }).skip(skip).limit(4);

    res.json(galleryDetails);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = route;

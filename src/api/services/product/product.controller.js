const httpStatus = require("http-status");
const csv = require("csv-parser");
const fs = require("fs");
const path = require("path");
const Product = require("./product.model");

const filePath = path.join(__dirname, "handphone.csv");
const maxThumbnailsNr = 11;
const maxCategoriesNr = 4;

exports.findAll = (req, res) => {
  let results = [];
  let product = new Product();

  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", data => {
      product = new Product();
      product.url = data["Url"];
      product.name = data["Name"];
      product.price = data["Price"];
      product.description = data["Description"];
      product.weight = data["Weight"];
      product.condition = data["Condition"];
      product.min_order = data["Min Order"];
      product.sold = data["Sold"];
      product.views = data["Views"];
      product.rating = data["Rating"];
      product.rating_by = data["Rating By"];
      product.categories = [];
      product.thumbnails = [];

      for (let index = 1; index < maxThumbnailsNr; index++) {
        let item = "Thumbnail " + index;
        if (data[item] !== "") {
          product.thumbnails.push(data[item]);
        }
      }

      for (let index = 1; index < maxCategoriesNr; index++) {
        let item = "Cat " + index;
        if (data[item] !== "") {
          product.categories.push(data[item]);
        }
      }

      results.push(product);
    })
    .on("end", () => {
      results.forEach(product => {
        Product.findOneAndUpdate(
          { name: product.name },
          product,
          { upsert: true, setDefaultsOnInsert: true },
          function(err) {
            if (err) {
              console.log(product.name + " Product already exists");
            } else {
              console.log("Product data has been saved: " + product.name);
            }
          }
        );
        console.log(product.name);
      });
      res.send(results);
    });

  //
};

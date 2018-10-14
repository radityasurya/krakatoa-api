const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true
    },
    name: String,
    price: {
      type: String
    },
    thumbnails: {
      type: Array
    },
    description: {
      type: String
    },
    weight: {
      type: String
    },
    condition: {
      type: String
    },
    min_order: {
      type: String
    },
    categories: {
      type: Array
    },
    sold: {
      type: String
    },
    views: {
      type: String
    },
    rating: {
      type: String
    },
    rating_by: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

ProductSchema.method({
  transform() {
    const transformed = {};
    const fields = [
      "id",
      "url",
      "name",
      "price",
      "thumbnails",
      "description",
      "weight",
      "condition",
      "min_order",
      "categories",
      "sold",
      "views",
      "rating",
      "rating_by",
      "createdAt"
    ];

    fields.forEach(field => {
      transformed[field] = this[field];
    });

    return transformed;
  }
});

module.exports = mongoose.model("Product", ProductSchema);

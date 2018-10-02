const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    cost: { type: Number, get: getPrice, set: setPrice },
    currency: String,
    customer_name: String,
    customer_phone: String,
    date: Date,
    expiration: Date,
    invoice: String,
    notes: String,
    product: String,
    product_link: String,
    revenues: { type: Number, get: getPrice, set: setPrice },
    shipping: String,
    shipping_cost: { type: Number, get: getPrice, set: setPrice },
    shop: String,
    status: String,
    supplier: String,
    supplier_cost: { type: Number, get: getPrice, set: setPrice },
    supplier_shipping_cost: { type: Number, get: getPrice, set: setPrice },
    supplier_total_cost: { type: Number, get: getPrice, set: setPrice },
    total: Number,
    total_cost: { type: Number, get: getPrice, set: setPrice },
    tracking: String
  },
  {
    timestamps: true
  }
);

OrderSchema.method({
  transform() {
    const transformed = {};
    const fields = [
      "id",
      "cost",
      "currency",
      "customer_name",
      "customer_phone",
      "date",
      "expiration",
      "invoice",
      "notes",
      "product",
      "product_link",
      "revenues",
      "shipping",
      "shipping_cost",
      "shop",
      "status",
      "supplier",
      "supplier_cost",
      "supplier_shipping_cost",
      "supplier_total_cost",
      "total",
      "total_cost",
      "tracking",
      "createdAt"
    ];

    fields.forEach(field => {
      transformed[field] = this[field];
    });

    return transformed;
  }
});

function getPrice(num) {
  return (num / 100).toFixed(2);
}

function setPrice(num) {
  return num * 100;
}
module.exports = mongoose.model("Order", OrderSchema);

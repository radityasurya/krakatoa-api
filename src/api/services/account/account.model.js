const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema(
  {
    email: String,
    marketplace: String,
    name: String,
    password: String,
    phone: String
  },
  {
    timestamps: true
  }
);

AccountSchema.method({
  transform() {
    const transformed = {};
    const fields = [
      "id",
      "email",
      "marketplace",
      "name",
      "phone",
      "password",
      "createdAt"
    ];

    fields.forEach(field => {
      transformed[field] = this[field];
    });

    return transformed;
  }
});

module.exports = mongoose.model("Account", AccountSchema);

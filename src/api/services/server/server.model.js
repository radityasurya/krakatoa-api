const mongoose = require("mongoose");

const ServerSchema = new mongoose.Schema(
  {
    name: String,
    provider: String,
    ip: String,
    cost: Number,
    location: String,
    username: String,
    password: String
  },
  {
    timestamps: true
  }
);

ServerSchema.method({
  transform() {
    const transformed = {};
    const fields = [
      "id",
      "name",
      "provider",
      "ip",
      "location",
      "username",
      "password",
      "createdAt"
    ];

    fields.forEach(field => {
      transformed[field] = this[field];
    });

    return transformed;
  }
});

module.exports = mongoose.model("Server", ServerSchema);

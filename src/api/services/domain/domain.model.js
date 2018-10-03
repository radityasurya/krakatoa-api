const mongoose = require("mongoose");

const status = ["ready", "used", "deindex"];

const DomainSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true
    },
    expiration: Date,
    da: {
      type: String
    },
    pa: {
      type: String
    },
    registar: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: status,
      default: "ready"
    }
  },
  {
    timestamps: true
  }
);

DomainSchema.method({
  transform() {
    const transformed = {};
    const fields = [
      "id",
      "url",
      "expiration",
      "da",
      "pa",
      "registrar",
      "status",
      "createdAt"
    ];

    fields.forEach(field => {
      transformed[field] = this[field];
    });

    return transformed;
  }
});

module.exports = mongoose.model("Domain", DomainSchema);

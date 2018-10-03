const httpStatus = require("http-status");
const Order = require("./order.model");

exports.findAll = (req, res) => {
  Order.find()
    .then(orders => {
      res.send(orders);
    })
    .catch(err => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        message: "Error retrieving orders list"
      });
    });
};

exports.create = (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({
      message: "Order content can not be empty"
    });
  }

  const order = new Order({
    cost: req.body.cost,
    currency: req.body.currency,
    customer_name: req.body.customer_name,
    customer_phone: req.body.customer_phone,
    date: req.body.date,
    expiration: req.body.expiration,
    invoice: req.body.invoice,
    notes: req.body.notes,
    product: req.body.product,
    product_link: req.body.product_link,
    revenue: req.body.revenue,
    shipping: req.body.shipping,
    shipping_cost: req.body.shipping_cost,
    shop: req.body.shop,
    status: req.body.status,
    supplier: req.body.supplier,
    supplier_cost: req.body.supplier_cost,
    supplier_shipping_cost: req.body.supplier_shipping_cost,
    supplier_total_cost: req.body.supplier_total_cost,
    total: req.body.total,
    total_cost: req.body.total_cost,
    tracking: req.body.tracking
  });

  order
    .save()
    .then(data => {
      res.status(httpStatus.CREATED).send(data);
    })
    .catch(err => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        message: err.message || "Some error occurred while creating the order."
      });
    });
};

exports.get = (req, res) => {
  Order.findById(req.params.orderId)
    .then(order => {
      if (!order) {
        return res.status(httpStatus.NOT_FOUND).send({
          message: "Order not found with id " + req.params.orderId
        });
      }

      res.send(order);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(httpStatus.NOT_FOUND).send({
          message: "Order not found with id " + req.params.orderId
        });
      }

      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        message: "Error retrieving order with id " + req.params.orderId
      });
    });
};

exports.update = (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(httpStatus.BAD_REQUEST).send({
      message: "Order content can not be empty"
    });
  }

  // find order and update it with request body
  Order.findByIdAndUpdate(req.params.orderId, { $set: req.body })
    .then(order => {
      if (!order) {
        return res.status(httpStatus.NOT_FOUND).send({
          message: "Order not found with id " + req.params.orderId
        });
      }

      res.send({
        message: "Order updated successfully!"
      });
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(httpStatus.NOT_FOUND).send({
          message: "Order not found with id " + req.params.orderId
        });
      }

      return res.status(httpStatus.BAD_REQUEST).send({
        message: "Error updating Order with id " + req.params.orderId
      });
    });
};

exports.remove = (req, res) => {
  Order.findByIdAndRemove(req.params.orderId)
    .then(order => {
      if (!order) {
        return res.status(httpStatus.NOT_FOUND).send({
          message: "Order not found with id " + req.params.orderId
        });
      }

      res.send({
        message: "Order deleted successfully!"
      });
    })
    .catch(err => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(httpStatus.NOT_FOUND).send({
          message: "Order not found with id " + req.params.orderId
        });
      }
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        message: "Could not delete order with id " + req.params.orderId
      });
    });
};

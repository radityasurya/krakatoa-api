const httpStatus = require("http-status");
const Account = require("./account.model");

exports.findAll = (req, res) => {
  Account.find()
    .then(accounts => {
      res.send(accounts);
    })
    .catch(err => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        message: "Error retrieving accounts list"
      });
    });
};

exports.create = (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({
      message: "Account content can not be empty"
    });
  }

  const account = new Account({
    name: req.body.name,
    email: req.body.email,
    marketplace: req.body.marketplace,
    password: req.body.password,
    phone: req.body.phone
  });

  account
    .save()
    .then(data => {
      res.status(httpStatus.CREATED).send(data);
    })
    .catch(err => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        message:
          err.message || "Some error occurred while creating the account."
      });
    });
};

exports.get = (req, res) => {
  Account.findById(req.params.accountId)
    .then(account => {
      if (!account) {
        return res.status(httpStatus.NOT_FOUND).send({
          message: "Account not found with id " + req.params.accountId
        });
      }

      res.send(account);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(httpStatus.NOT_FOUND).send({
          message: "Account not found with id " + req.params.accountId
        });
      }

      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        message: "Error retrieving account with id " + req.params.accountId
      });
    });
};

exports.update = (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(httpStatus.BAD_REQUEST).send({
      message: "Account content can not be empty"
    });
  }

  // find server and update it with request body
  Account.findByIdAndUpdate(req.params.accountId, { $set: req.body })
    .then(account => {
      if (!account) {
        return res.status(httpStatus.NOT_FOUND).send({
          message: "Account not found with id " + req.params.accountId
        });
      }

      res.send({
        message: "Account updated successfully!"
      });
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(httpStatus.NOT_FOUND).send({
          message: "Account not found with id " + req.params.accountId
        });
      }

      return res.status(httpStatus.BAD_REQUEST).send({
        message: "Error updating Account with id " + req.params.accountId
      });
    });
};

exports.remove = (req, res) => {
  Account.findByIdAndRemove(req.params.accountId)
    .then(account => {
      if (!account) {
        return res.status(httpStatus.NOT_FOUND).send({
          message: "Account not found with id " + req.params.accountId
        });
      }

      res.send({
        message: "Account deleted successfully!"
      });
    })
    .catch(err => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(httpStatus.NOT_FOUND).send({
          message: "Account not found with id " + req.params.accountId
        });
      }
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        message: "Could not delete account with id " + req.params.accountId
      });
    });
};

const httpStatus = require("http-status");
const Domain = require("./domain.model");

exports.findAll = (req, res) => {
  Domain.find()
    .then(domains => {
      res.send(domains);
    })
    .catch(err => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        message: "Error retrieving domains list"
      });
    });
};

exports.create = (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({
      message: "Domain content can not be empty"
    });
  }

  const domain = new Domain({
    url: req.body.url,
    expiration: req.body.expiration,
    da: req.body.da,
    pa: req.body.pa,
    registar: req.body.registrar,
    status: req.body.status
  });

  domain
    .save()
    .then(data => {
      res.status(httpStatus.CREATED).send(data);
    })
    .catch(err => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        message: err.message || "Some error occurred while creating the domain."
      });
    });
};

exports.get = (req, res) => {
  Domain.findById(req.params.domainId)
    .then(domain => {
      if (!domain) {
        return res.status(httpStatus.NOT_FOUND).send({
          message: "Domain not found with id " + req.params.domainId
        });
      }

      res.send(domain);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(httpStatus.NOT_FOUND).send({
          message: "Domain not found with id " + req.params.domainId
        });
      }

      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        message: "Error retrieving domain with id " + req.params.domainId
      });
    });
};

exports.update = (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(httpStatus.BAD_REQUEST).send({
      message: "Domain content can not be empty"
    });
  }

  // find server and update it with request body
  Domain.findByIdAndUpdate(req.params.domainId, { $set: req.body })
    .then(domain => {
      if (!domain) {
        return res.status(httpStatus.NOT_FOUND).send({
          message: "Domain not found with id " + req.params.domainId
        });
      }

      res.send({
        message: "Domain updated successfully!"
      });
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(httpStatus.NOT_FOUND).send({
          message: "Domain not found with id " + req.params.domainId
        });
      }

      return res.status(httpStatus.BAD_REQUEST).send({
        message: "Error updating domain with id " + req.params.domainId
      });
    });
};

exports.remove = (req, res) => {
  Domain.findByIdAndRemove(req.params.domainId)
    .then(account => {
      if (!account) {
        return res.status(httpStatus.NOT_FOUND).send({
          message: "Domain not found with id " + req.params.domainId
        });
      }

      res.send({
        message: "Domain deleted successfully!"
      });
    })
    .catch(err => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(httpStatus.NOT_FOUND).send({
          message: "Domain not found with id " + req.params.domainId
        });
      }
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        message: "Could not delete account with id " + req.params.domainId
      });
    });
};

const httpStatus = require("http-status");
const Server = require("./server.model");

exports.findAll = (req, res) => {
  Server.find()
    .then(servers => {
      res.send(servers);
    })
    .catch(err => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        message: "Error retrieving server list"
      });
    });
};

exports.get = (req, res) => {
  Server.findById(req.params.serverId)
    .then(server => {
      if (!server) {
        return res.status(httpStatus.NOT_FOUND).send({
          message: "Server not found with id " + req.params.serverId
        });
      }

      res.send(server);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(httpStatus.NOT_FOUND).send({
          message: "Server not found with id " + req.params.serverId
        });
      }

      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        message: "Error retrieving server with id " + req.params.serverId
      });
    });
};

exports.create = (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({
      message: "Server content can not be empty"
    });
  }

  const server = new Server({
    name: req.body.name,
    provider: req.body.provider,
    ip: req.body.ip,
    location: req.body.location,
    username: req.body.username,
    password: req.body.password
  });

  server
    .save()
    .then(data => {
      res.status(httpStatus.CREATED).send(data);
    })
    .catch(err => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        message:
          err.message || "Some error occurred while creating the servers."
      });
    });
};

exports.update = (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(httpStatus.BAD_REQUEST).send({
      message: "Server content can not be empty"
    });
  }

  // find server and update it with request body
  Server.findByIdAndUpdate(req.params.serverId, { $set: req.body })
    .then(server => {
      if (!server) {
        return res.status(httpStatus.NOT_FOUND).send({
          message: "Server not found with id " + req.params.serverId
        });
      }

      res.send({
        message: "Server updated successfully!"
      });
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(httpStatus.NOT_FOUND).send({
          message: "Server not found with id " + req.params.serverId
        });
      }

      return res.status(httpStatus.BAD_REQUEST).send({
        message: "Error updating server with id " + req.params.serverId
      });
    });
};

exports.remove = (req, res) => {
  Server.findByIdAndRemove(req.params.serverId)
    .then(server => {
      if (!server) {
        return res.status(httpStatus.NOT_FOUND).send({
          message: "Server not found with id " + req.params.serverId
        });
      }

      res.send({
        message: "Server deleted successfully!"
      });
    })
    .catch(err => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(httpStatus.NOT_FOUND).send({
          message: "Server not found with id " + req.params.serverId
        });
      }
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        message: "Could not delete server with id " + req.params.serverId
      });
    });
};

const httpStatus = require("http-status");
// const service = require("./server.service");
const Server = require("./server.model");

exports.findAll = (req, res) => {
  Server.find()
    .then(servers => {
      res.send(servers);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving servers."
      });
    });
};

exports.create = (req, res) => {
  console.log(req.body);
  if (!req.body) {
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

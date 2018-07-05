const express = require('express');

const router = express.Router();


router.get('/healthz',
    (req, res) => res.json({
        "code": res.statusCode,
        "message": "Healthy",
    }));

module.exports = router;
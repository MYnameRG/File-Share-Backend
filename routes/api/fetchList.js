const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const Storage = require('../../models/storage');

router.get('/:storeId', (req, res) => {
    Storage.findById(req.params.storeId, (err, storage) => {
        return res.status(200).json({ storage: storage })
    });
});

module.exports = router;
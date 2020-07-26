const express = require('express');
const router = express.Router();
const Storage = require('../../models/storage');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
});
const upload = multer({ storage: storage });

router.post('/:id', upload.single('uploaded_file'),(req, res) => {
    Storage.findById(req.params.id, function (err, storage) {
        const arr = storage.uploaded;
        arr.push(req.file);
        Storage.findByIdAndUpdate(req.params.id, {
            uploaded: arr
        }, () => {
            const location = req.file.path;
            return res.status(200).json({ msg: `Get link to download: http://localhost:2000/api/upload/${location}` });
        });
    });
    //console.log( , req.file);
});

module.exports = router;
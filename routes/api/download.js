const express = require('express');
const router = express.Router();
const Storage = require('../../models/storage');

const id = '5f1c1a4fd2c12b5ec40f9389';
router.get('/:data', (req, res) => {
        Storage.findById(id, (err, storage) => {
            const data = req.params.data;
            const arr = storage.downloaded;
            const arr1 = storage.uploaded;
            arr1.forEach((element) => {
                if(data.localeCompare(element.filename) == 0)
                {
                    arr.push(element);
                    res.setHeader('Content-type',`${element.mimetype}`);
                }
            });
            Storage.findByIdAndUpdate(id, {
                downloaded: arr
            }, () => {
                return res.status(200).download('/media/rohit/HD-B1/E/Projects/FileShare In NodeJS & ReactJS/uploads/' + req.params.data);            
        });
    });
});

module.exports = router;
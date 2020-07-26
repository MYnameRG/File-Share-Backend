const mongoose = require('mongoose');
const dburl = 'mongodb+srv://rg_1997:rohit1997@cluster0.ttany.mongodb.net/fileshare?retryWrites=true&w=majority';

module.exports = mongoose.connect(dburl,{
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
    }).then(()=>{
        console.log('MongoDB connected...')
    }).catch((err)=>{
        console.log(err);
    });
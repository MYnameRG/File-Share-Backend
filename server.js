const express = require('express');
const connectDB = require('./dbserver');

const app = express();
connectDB;

const bodyParser = express.json({ extended: false });
app.use(bodyParser);

app.get('/', (req,res) => {
    res.send('API Running');
});

app.use('/api/users', require('./routes/api/register'));
app.use('/api/login', require('./routes/api/logged'));
app.use('/api/upload', require('./routes/api/upload'));
app.use('/api/upload/uploads', require('./routes/api/download'));
app.use('/api/list', require('./routes/api/fetchList'));

const port = process.env.PORT || 2000;

app.listen(port, ()=>{
    console.log(`Server started on port ${port}`);
});
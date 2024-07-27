const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const port = 5000;

const userRouter = require('./routes/userRoutes');
app.use('/api/data', userRouter);

mongoose.connect('mongodb+srv://srikanththanniru2244:abc%40123@cluster0.kqedozf.mongodb.net/MongoConnection?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('Error:', err));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

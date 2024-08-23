require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectToMongo = require('./db');

const app = express();
const port = process.env.PORT || 5000;
const clientURL = process.env.CLIENT_URL || 'http://localhost:3000';

app.use(cors({
    origin: clientURL,
    credentials: true,
}));
app.use(express.json());

connectToMongo().then(() => {
    app.use('/api', require('./Routes/CreateUser'));
    app.use('/api', require('./Routes/DisplayData'));
    app.use('/api', require('./Routes/OrderData'));

    app.get('/', (req, res) => {
        res.send('Hello World!');
    });

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch(err => {
    console.error('Failed to connect to MongoDB:', err);
});

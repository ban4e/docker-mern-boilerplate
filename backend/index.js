require('dotenv').config();
const server = require('./server.js');
const PORT = process.env.PORT || 5000;

// routes
const userRoutes = require('./routes/user.routes');

server.use('/api/user', userRoutes);

server.get('/api/:what', (req, res) => {
    console.log(req);
    res.json(process.env.MONGO_URI);
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

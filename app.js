const express = require('express');
const app = express();
const productRoutes = require('./productRoutes'); 
const PORT = 3040;

app.use(express.json());

app.use('/products', productRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
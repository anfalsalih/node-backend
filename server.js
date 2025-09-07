const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let products = [];
let idCounter = 1;

app.get('/products', (req, res) => {
res.status(200).json(products);
});



app.post('/products', (req, res) => {
const { name, price } = req.body;

if (!name || price === undefined) {
    return res.status(400).json({ error: "اسم المنتج والسعر مطلوبان." });
}

  const newProduct = {
    id: idCounter++,
    name,
    price
  };

  products.push(newProduct);

  res.status(201).json(newProduct);
});


app.delete('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const productIndex = products.findIndex(p => p.id === productId);
  if (productIndex === -1) {
    return res.status(404).json({ error: "المنتج غير موجود." });
  }

  products.splice(productIndex, 1);
  res.status(200).json({ message: "تم حذف المنتج بنجاح." });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
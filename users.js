const express = require('express');
const router = express.Router();

let products = [];
let idCounter = 1;

router.get('/', (req, res) => {
    res.status(200).json(products);
});

router.post('/', (req, res) => {
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

router.delete('/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const productIndex = products.findIndex(p => p.id === productId);
    if (productIndex === -1) {
        return res.status(404).json({ error: "المنتج غير موجود." });
    }

    products.splice(productIndex, 1);
    res.status(200).json({ message: "تم حذف المنتج بنجاح." });
});

module.exports = router;
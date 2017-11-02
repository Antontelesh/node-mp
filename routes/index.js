import express, { Router } from "express";

const nextID = (() => {
  let count = 0;
  return () => ++count;
})();

const Product = ({ name } = {}) => ({
  id: nextID(),
  name
});

const ProductReview = ({ productId, reviewer } = {}) => ({
  id: nextID(),
  productId,
  reviewer
});

const User = ({ name } = {}) => ({
  id: nextID(),
  name
});

const router = Router();

const products = [
  Product({ name: "Tomato" }),
  Product({ name: "Onion" }),
  Product({ name: "Cucumber" })
];

const productReviews = [
  ProductReview({ productId: 1, reviewer: "Anton Telesh" }),
  ProductReview({ productId: 1, reviewer: "John Smith" }),
  ProductReview({ productId: 2, reviewer: "John Smith" })
];

const users = [User({ name: "Anton Telesh" }), User({ name: "John Smith" })];

const getProduct = id => products.find(p => String(p.id) === String(id));

const getProductReviews = productId =>
  productReviews.filter(r => String(r.productId) === String(productId));

router
  .route("/products")
  .get((req, res, next) => {
    res.json(products);
  })
  .post((req, res, next) => {
    const product = Product(req.body);
    products.push(product);
    res.json(product);
  });

router.route("/products/:id").get((req, res, next) => {
  const product = getProduct(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.sendStatus(404);
  }
});

router.route("/products/:id/reviews").get((req, res) => {
  const reviews = getProductReviews(req.params.id);
  res.json(reviews);
});

router.route("/users").get((req, res) => {
  res.json(users);
});

export default router;

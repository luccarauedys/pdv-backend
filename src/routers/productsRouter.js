import express from 'express';
import { verifyJWT } from '../middlewares/tokenMiddleware.js';
import {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productsController.js';

const productsRouter = express.Router();

productsRouter.use(verifyJWT);

productsRouter.post('/products', createProduct);
productsRouter.get('/products', getAllProducts);
productsRouter.get('/products/:id', getProduct);
productsRouter.put('/products/:id', updateProduct);
productsRouter.delete('/products/:id', deleteProduct);

export default productsRouter;

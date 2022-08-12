import { Router } from 'express';
import * as booksController from '../controllers/books.controller';

const router = Router();

export const API_PATH = "/api/books";

router.post(API_PATH, booksController.createBook);
router.get(API_PATH, booksController.getAll);
router.get(API_PATH + "/:isbn", booksController.getBook);
router.delete(API_PATH + "/:isbn", booksController.deleteBook);
router.put(API_PATH + "/:isbn", booksController.updateBook);

export default router;
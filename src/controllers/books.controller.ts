import { RequestHandler, Response } from 'express';
import { toJSON } from 'flatted';
import BookModel, { IBook } from '../models/Book';

export const createBook: RequestHandler = async (req, res) => {
    await BookModel.findOne({ isbn: req.body.isbn })
        .then(async (bookFound) => {
            if (bookFound) return res.status(303).json(bookFound);

            const { isbn, author, title, description } = req.body;
            const newBook: IBook = new BookModel({ isbn, author, title, description });
            const savedBook = await newBook.save();
            return res.status(200).json(savedBook);
        })
        .catch((error) => {
            console.error({ Error: toJSON(error.message).toString() });
            return res.status(400).json();
        });
};

export const getAll: RequestHandler = async (req, res) => {
    try {
        const books = await BookModel.find();

        return res.status(200).json(books);
    } catch (error) {
        return res.status(500).json(toJSON(error));
    }
};

export const getBook: RequestHandler = async (req, res) => {
    await BookModel.findOne({ isbn: req.params.isbn })
        .then(async (bookFoundByISBN) => {
            if (!bookFoundByISBN) return res.status(204).json();
            return res.status(200).json(await BookModel.findById(bookFoundByISBN._id));
        })
        .catch((error) => {
            console.error({ Error: toJSON(error.message).toString() });
            return res.status(400).json();
        });
};

export const updateBook: RequestHandler = async (req, res): Promise<Response> => {
    const bookUpdated = await BookModel.findOne({ isbn: req.params.isbn })
        .then(async (bookFoundByISBN) => {
            if (!bookFoundByISBN) return res.status(204).json();
            return res.status(200).json(
                await BookModel.findByIdAndUpdate(bookFoundByISBN._id, req.body, { new: true })
            );
        })
        .catch((error) => {
            console.error({ Error: toJSON(error.message).toString() });
            return res.status(400).json();
        });
    return bookUpdated;
};

export const deleteBook: RequestHandler = async (req, res) => {
    await BookModel.findOne({ isbn: req.params.isbn })
        .then(async (bookFoundByISBN) => {
            if (!bookFoundByISBN) return res.status(204).json();
            return res.status(200).json(
                await BookModel.findByIdAndDelete(bookFoundByISBN._id)
            );
        })
        .catch((error) => {
            console.error({ Error: toJSON(error.message).toString() });
            return res.status(400).json();
        });
};
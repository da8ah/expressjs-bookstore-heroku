import { Schema, model, Document } from 'mongoose';

export interface IBook extends Document {
    isbn: String,
    author: String
    title: String,
    description: String,
}

const bookSchema = new Schema(
    {
        isbn: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        author: {
            type: String,
            required: true,
            trim: true
        },
        title: {
            type: String,
            trim: true
        },
        description: {
            type: String,
            trim: true
        }
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

export default model<IBook>('Book', bookSchema);
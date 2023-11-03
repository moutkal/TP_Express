import mongoose, { Schema, Document } from 'mongoose';
import { Status, Format } from './enums';

// Define the Book schema
interface IBook extends Document {
    title: string;
    author: string;
    pages: number;
    status: Status;
    price: number;
    pagesRead: number;
    format: Format;
    suggestedBy: string;
    finished: boolean;
}

const bookSchema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    pages: { type: Number,min: 0, required: true },
    status: { type: String, enum: Object.values(Status), required: true },
    price: { type: Number,min: 0, required: true },
    pagesRead: { type: Number,min: 0,validate: {
        validator: function (this: any, val: number): boolean {
            return val <= this.pages;
        },
    }, required: true },
    format: { type: String, enum: Object.values(Format), required: true },
    suggestedBy: { type: String, required: false },
    finished: { type: Boolean,default: function (this: any, val: boolean): boolean {return this.PagesRead == this.pages;}, required: false }
});

const BookModel = mongoose.model<IBook>('Book', bookSchema);

export default BookModel;

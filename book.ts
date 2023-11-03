import { Status, Format } from "./enums";
import BookModel from './Ibook';

class Book {
    title: string;
    author: string;
    pages: number;
    status: Status;
    price: number;
    pagesRead: number;
    format: Format;
    suggestedBy: string;
    finished: boolean;

    constructor(
        title: string,
        author: string,
        pages: number,
        status: Status,
        price: number,
        pagesRead: number,
        format: Format,
        suggestedBy: string,
        finished: boolean
    ) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
        this.price = price;
        if (pagesRead <= pages) {
            this.pagesRead = pagesRead;
        } else {
            throw new Error("The number of pages read cannot exceed the total number of pages.");
        }
        this.format = format;
        this.suggestedBy = suggestedBy;
        this.finished = finished;
    }
    currentlyAt(): string {
        const percentage = (this.pagesRead / this.pages) * 100;
        return ` ${percentage.toFixed(2)}%  (${this.pagesRead} / ${this.pages}).`;
    }
    
    deleteBook(): void {
        BookModel.deleteOne(this);
        console.log(`Deleting book: ${this.title} by ${this.author}`);
    }
}
module.exports = Book;

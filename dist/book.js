"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Ibook_1 = __importDefault(require("./Ibook"));
class Book {
    constructor(title, author, pages, status, price, pagesRead, format, suggestedBy, finished) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
        this.price = price;
        if (pagesRead <= pages) {
            this.pagesRead = pagesRead;
        }
        else {
            throw new Error("The number of pages read cannot exceed the total number of pages.");
        }
        this.format = format;
        this.suggestedBy = suggestedBy;
        this.finished = finished;
    }
    currentlyAt() {
        const percentage = (this.pagesRead / this.pages) * 100;
        return ` ${percentage.toFixed(2)}%  (${this.pagesRead} / ${this.pages}).`;
    }
    deleteBook() {
        Ibook_1.default.deleteOne(this);
        console.log(`Deleting book: ${this.title} by ${this.author}`);
    }
}
module.exports = Book;

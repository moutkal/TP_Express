"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const db_1 = require("./db");
const Ibook_1 = __importDefault(require("./Ibook"));
const app = (0, express_1.default)();
const port = 3000;
// Connect to the database
(0, db_1.connectDB)().catch((err) => console.log(err));
// Set the view engine and the views directory
app.engine('html', require('ejs').renderFile); // Use the 'ejs' package to render HTML files
app.set('view engine', 'html');
app.set('views', path_1.default.join(__dirname, 'views'));
// Serve static files from the public directory
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
// Parse incoming requests with JSON payloads
app.use(express_1.default.json());
// Parse incoming requests with URL-encoded payloads
app.use(express_1.default.urlencoded({ extended: false }));
// Routes
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield Ibook_1.default.find({});
        res.render('listing.html', { books }); // Render the HTML listing view
    }
    catch (error) {
        console.error('Error fetching books', error);
        res.status(500).send('Internal Server Error');
    }
}));
app.get('/register', (req, res) => {
    res.render('register.html'); // Render the HTML register view
});
// ...
// Route to handle adding a book to the database
app.post('/add', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("begin saving");
    try {
        const { title, author, pages, status, price, pagesRead, format, suggestedBy, finished } = req.body;
        const newBook = new Ibook_1.default({
            title,
            author,
            pages,
            status,
            price,
            pagesRead,
            format,
            suggestedBy,
            finished
        });
        yield newBook.save();
        console.log("book saved", newBook);
        res.redirect('/'); // Redirect to the listing page after adding the book
    }
    catch (error) {
        console.error('Error adding book', error);
        res.status(500).send('Internal Server Error');
    }
}));
// ...
// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

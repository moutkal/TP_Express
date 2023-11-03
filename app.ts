import express from 'express';
import path from 'path';
import { connectDB } from './db';
import BookModel from './Ibook';

const app = express();
const port = 3000;

// Connect to the database
connectDB().catch((err) => console.log(err));

// Set the view engine and the views directory
app.engine('html', require('ejs').renderFile); // Use the 'ejs' package to render HTML files
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Parse incoming requests with JSON payloads
app.use(express.json());

// Parse incoming requests with URL-encoded payloads
app.use(express.urlencoded({ extended: false }));

// Routes
app.get('/', async (req, res) => {
  try {
    const books = await BookModel.find({});
    res.render('listing.html', { books }); // Render the HTML listing view
  } catch (error) {
    console.error('Error fetching books', error);
    res.status(500).send('Internal Server Error');
  }
});



app.get('/register', (req, res) => {
  res.render('register.html'); // Render the HTML register view
});


// ...

// Route to handle adding a book to the database
app.post('/add', async (req, res) => {
  console.log("begin saving");
  try {
    const { title, author, pages, status, price, pagesRead, format, suggestedBy, finished } = req.body;
    const newBook = new BookModel({
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
    await newBook.save();
    console.log("book saved", newBook);
    res.redirect('/'); // Redirect to the listing page after adding the book
  } catch (error) {
    console.error('Error adding book', error);
    res.status(500).send('Internal Server Error');
  }
});

// ...

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

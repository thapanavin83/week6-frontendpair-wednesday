import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddBookPage = () => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    isbn: "",
    publisher: "",
    genre: "",
    available: true,
    dueDate: "",
    borrower: ""
  });

  const navigate = useNavigate();

  // Async function to send POST request to the backend
  const addBook = async (newBook) => {
    try {
      const res = await fetch("/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBook),
      });
      if (!res.ok) throw new Error("Failed to add book");
    } catch (error) {
      console.error(error);
    }
  };

  const submitForm = (e) => {
    e.preventDefault();

    // Construct the payload to match the backend expected JSON schema
    const newBook = {
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      publisher: book.publisher,
      genre: book.genre,
      availability: {
        isAvailable: book.available,
        dueDate: book.dueDate || null,
        borrower: book.borrower || "",
      },
    };

    addBook(newBook);
    navigate("/");
  };

  return (
    <div className="create">
      <h2>Add a New Book</h2>
      <form onSubmit={submitForm}>
        <label>Book Title:</label>
        <input
          type="text"
          required
          value={book.title}
          onChange={(e) => setBook({ ...book, title: e.target.value })}
        />

        <label>Author:</label>
        <input
          type="text"
          required
          value={book.author}
          onChange={(e) => setBook({ ...book, author: e.target.value })}
        />

        <label>ISBN:</label>
        <input
          type="text"
          required
          value={book.isbn}
          onChange={(e) => setBook({ ...book, isbn: e.target.value })}
        />

        <label>Publisher:</label>
        <input
          type="text"
          required
          value={book.publisher}
          onChange={(e) => setBook({ ...book, publisher: e.target.value })}
        />

        <label>Genre:</label>
        <input
          type="text"
          required
          value={book.genre}
          onChange={(e) => setBook({ ...book, genre: e.target.value })}
        />

        <label>Available:</label>
        <select
          value={book.available}
          onChange={(e) => setBook({ ...book, available: e.target.value === "true" })}
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>

        <label>Due Date:</label>
        <input
          type="date"
          value={book.dueDate}
          onChange={(e) => setBook({ ...book, dueDate: e.target.value })}
        />

        <label>Borrower:</label>
        <input
          type="text"
          value={book.borrower}
          onChange={(e) => setBook({ ...book, borrower: e.target.value })}
        />

        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBookPage;
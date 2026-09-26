import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const BookPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`/api/books/${id}`);

        if (!res.ok) {
          throw new Error("Could not fetch book details");
        }

        const data = await res.json();
        setBook(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const deleteBook = async (bookId) => {
    try {
      const res = await fetch(`/api/books/${bookId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete book");
      }
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const onDeleteClick = async (bookId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );

    if (!confirmDelete) {
      return;
    }

    await deleteBook(bookId);
    navigate("/");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!book) {
    return <div>Book not found</div>;
  }

  return (
    <div className="book-preview">
      <h2>{book.title}</h2>

      <p>Author: {book.author}</p>

      <p>ISBN: {book.isbn}</p>

      <p>Publisher: {book.publisher}</p>

      <p>Genre: {book.genre}</p>

      <p>
        Available: {book.availability?.isAvailable ? "Yes" : "No"}
      </p>

      {book.availability?.dueDate && (
        <p>
          Due Date:{" "}
          {new Date(book.availability.dueDate).toLocaleDateString()}
        </p>
      )}

      {book.availability?.borrower && (
        <p>Borrower: {book.availability.borrower}</p>
      )}

      <br />

      <button onClick={() => navigate(`/edit-book/${book._id}`)}>
        Edit
      </button>

      {" "}

      <button onClick={() => onDeleteClick(book._id)}>
        Delete
      </button>

      <br />
      <br />

      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default BookPage;
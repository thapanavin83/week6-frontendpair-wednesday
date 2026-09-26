import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const BookPage = () => {
  const { id } = useParams();
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!book) return <div>Book not found</div>;

  return (
    <div className="book-preview">
      <h2>{book.title}</h2>
      <p>Author: {book.author}</p>
      <p>ISBN: {book.isbn}</p>
      <p>Publisher: {book.publisher}</p>
      <p>Genre: {book.genre}</p>
      <p>Available: {book.availability?.isAvailable ? "Yes" : "No"}</p>
      {book.availability?.dueDate && (
        <p>Due Date: {new Date(book.availability.dueDate).toLocaleDateString()}</p>
      )}
      {book.availability?.borrower && (
        <p>Borrower: {book.availability.borrower}</p>
      )}
      <br />
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default BookPage;
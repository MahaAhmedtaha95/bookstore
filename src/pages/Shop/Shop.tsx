import React, { useState } from 'react';
import { Container, Row, Col,Form } from 'react-bootstrap';
import BookCard from '../../components/BookCard/BookCard';
import BookCover from '../../assets/bookCover.png';
import Filters from './Filters';
import './Shop.css'

interface Store {
    id: number;
    name: string;
    price: string;
    isSold: boolean;
  }
interface Book {
  id: number;
  title: string;
  author: string;
  cover: string; // URL for the book cover image
  stores: Store[];
}

const initialBooks: Book[] = [
  {
    id: 1,
    title: 'To Kill a Mockingbird',
    author: 'F. Scott Fitzgerald',
    cover: BookCover,
    stores: [{name:"Store A",price:"50$",id:1,isSold: false},{name:"Store B",price:"51$",id:2,isSold: false}],
  },
  {
    id: 2,
    title: 'Women Of The Immortals',
    author: 'George Orwell',
    cover: BookCover,
    stores: [{name:"Store C",price:" 16$",id:3,isSold: false}],
  },
  {
    id: 3,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    cover: BookCover,
    stores: [{name:"Store A",price:"50$",id:1,isSold: false},{name:"Store D",price:"51$",id:4,isSold: false}],
  },
];

const ShopPage: React.FC = () => {
    const [columnFilters, setColumnFilters] = useState(
        []
    )
    const[searchTerm,setsearchTerm]=useState("")
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const handleSell = (bookId: number, storeId: number) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === bookId
          ? {
              ...book,
              stores: book.stores.map((store) =>
                store.id === storeId ? { ...store, isSold: true } : store
              ),
            }
          : book
      )
    );
  };

  const renderFilteration = () => {
    return (
        <Row>
            <Col md={1} spacing={3}>
                {" "}
                <h6 className="filter-text">Filter By</h6>
            </Col>
            <Filters
                columnFilters={columnFilters}
                setColumnFilters={setColumnFilters}
            />
        </Row>
    );
};

  return (
    <Container>
     <Row className='mb-2'>
     <Col md={9}> <h3 className='page-title'>Browse Books</h3></Col>
     <Col md={3} spacing={3}>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Control
            type="text"
            placeholder="search"
            value={searchTerm}
            onChange={(e) => setsearchTerm( e.target.value)}
          />
        </Form.Group>
      </Col>
     </Row>
      {renderFilteration()}
      <Row>
        {books.map((book) => (
          <Col key={book.id} md={4}>
            <BookCard book={book} onSell={handleSell} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ShopPage;

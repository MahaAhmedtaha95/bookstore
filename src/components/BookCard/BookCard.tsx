import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import './BookCard.css';
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
    cover: string; 
    stores: Store[];
}

interface BookCardProps {
    book: Book;
    onSell: (bookId: number, storeId: number) => void;
  }
const BookCard: React.FC<BookCardProps> = ({ book, onSell }) => {
    return (
        <Card>
            <Row noGutters>
                {/* Book Cover Section */}
                <Col xs={4}>
                    <div className="book-cover-wrapper">
                        <Card.Img src={book.cover} alt={book.title} className="book-cover-image" />
                        <div className="book-title-overlay">
                            <Card.Title className="book-title">{book.title}</Card.Title>
                        </div>
                    </div>
                </Col>

                {/* Book Details Section */}
                <Col xs={8}>
                    <Card.Body>
                        <Card.Text className='book_title'> {book.title}</Card.Text>
                        <Card.Text className='book_auther'>by {book.author}</Card.Text>
                        <Card.Text>
                            <Row style={{justifyContent:"space-between"}}>
                                <span className='stores-title'>stores:</span><b />
                                {book.stores.map((store, index) => {
                                    return (
                                        <Col lg="5" className='store_container' key={index}>
                                            <p>{store.name}</p>
                                            <p className='book_price'>{store.price}</p>
                                            <Button
                                                variant="primary"
                                                onClick={() => onSell(book.id, store.id)}
                                                disabled={store.isSold}
                                                className='sell-book-btn'
                                            >
                                                {store.isSold ? 'Sold' : 'Sell'}
                                            </Button>
                                        </Col>

                                    )
                                })}
                            </Row>
                        </Card.Text>

                    </Card.Body>
                </Col>
            </Row>
        </Card>
    );
};

export default BookCard;

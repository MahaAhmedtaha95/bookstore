import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Row, Col } from 'react-bootstrap';
import './Authers.css';
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import { MdDone } from "react-icons/md";
import {authers} from '../../data/authers.json';
import  PaginationComponent  from '../../components/Pagination/Pagination'
interface Author {
    id: number;
    first_name: string;
    last_name:string;
    email:string;
    nanationality:string
  }
  


const Authors: React.FC = () => {
  const [authors, setAuthors] = useState(authers);
  const [selectedAuthors, setSelectedAuthors] = useState<number[]>([]);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [editName, setEditName] = useState<string>('');
  const [showModal, setShowModal] = useState(false);
  const [newAuthorName, setNewAuthorName] = useState<string>('');
  const[searchTerm,setsearchTerm]=useState("")
  const[page,setPage]=useState(0)
  const [totalRecords,setTotalRecords]=useState(authers.length)
  const[limit,setLimit]=useState(10)
  // Toggle the selection of an author
  const handleSelectAuthor = (id: number) => {
    setSelectedAuthors((prev) =>
      prev.includes(id) ? prev.filter((authorId) => authorId !== id) : [...prev, id]
    );
  };

  // Select or unselect all authors
  const handleSelectAll = () => {
    if (selectedAuthors.length === authors.length) {
      setSelectedAuthors([]);
    } else {
      setSelectedAuthors(authors.map((author) => author.id));
    }
  };

  // Inline edit actions
  const handleEdit = (id: number, name: string) => {
    setIsEditing(id);
    setEditName(name);
  };

  const handleSaveEdit = (id: number) => {
    setAuthors((prevAuthors) =>
      prevAuthors.map((author) =>
        author.id === id ? { ...author, name: editName } : author
      )
    );
    setIsEditing(null);
  };

  // Delete an author
  const handleDelete = (id: number) => {
    setAuthors((prevAuthors) => prevAuthors.filter((author) => author.id !== id));
    setSelectedAuthors((prev) => prev.filter((authorId) => authorId !== id));
  };

  // Add a new author
  const handleAddAuthor = () => {
    const newAuthor: Author = {
      id: authors.length + 1,
      first_name: newAuthorName.split(" ")[0],
      last_name: newAuthorName.split(" ")[1] || '', // Handle cases where only one name is provided
      email: "",
      nationality: ""
    };
  
    setAuthors([newAuthor, ...authors]); // Prepend the new author to the beginning of the array
    setShowModal(false);
    setNewAuthorName('');
  };
  
  const onPageChange = (page) => {
    setPage(page);
  };
  return (
    <div>
      <Row className='mb-2'>
     <Col md={9} style={{display:"flex"}}>
      <h3 className='page-title'>Browse Books</h3>
      <Form.Group className="mb-3 ml-5" controlId="formGroupEmail">
          <Form.Control
            type="text"
            placeholder="search"
            value={searchTerm}
            onChange={(e) => setsearchTerm( e.target.value)}
          />
        </Form.Group>
      </Col>
     <Col md={3} spacing={3}>
     <Button className='add-auther-btn' onClick={() => setShowModal(true)}>
        Add New Author
      </Button>
      </Col>
     </Row>

      {/* Table for Authors */}
      <Table  bordered>
        <thead>
          <tr>
            <th className='select-cell'>
              <Form.Check
                type="checkbox"
                checked={selectedAuthors.length === authors.length}
                onChange={handleSelectAll}
              />
              <span style={{marginLeft:'5px'}}>Author ID</span>
            </th>
            <th> Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {authors.slice(0,10).map((author) => (
            <tr key={author.id}>
              <td className='select-cell'>
                <Form.Check
                  type="checkbox"
                  checked={selectedAuthors.includes(author.id)}
                  onChange={() => handleSelectAuthor(author.id)}
                />
                <span style={{marginLeft:'5px'}}># {author.id}</span> 
              </td>
              
    
              <td>
                {isEditing === author.id ? (
                  <Form.Control
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                ) : (
                  author.first_name +' '+author.last_name 
                )}
              </td>
              <td>
                {isEditing === author.id ? (
                  <Button className='add-auther-btn' onClick={() => handleSaveEdit(author.id)}>
                    <MdDone/>
                  </Button>
                ) : (
                  <Button  className='add-auther-btn' onClick={() => handleEdit(author.id, author.name)}>
                    <FaPen/>
                  </Button>
                )}{' '}
                <Button className='add-auther-btn' onClick={() => handleDelete(author.id)}>
                  <MdDelete/>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <PaginationComponent  
          activeItem={page + 1}
          onPageChange={onPageChange}
          totalRecords={totalRecords}
          limit={limit}/>
      {/* Add New Author Button */}
      

      {/* Add Author Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title> New Author</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="newAuthorName">
              <Form.Label>Author Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter author full name"
                value={newAuthorName}
                onChange={(e) => setNewAuthorName(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className='cancel-btn' onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button className='save-btn' onClick={handleAddAuthor}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Authors;

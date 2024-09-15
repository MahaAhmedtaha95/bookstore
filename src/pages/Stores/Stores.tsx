import React, { useState } from 'react';
import { Table, Button, Modal, Form, Row, Col } from 'react-bootstrap';
import './Stores.css';
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import { MdDone } from "react-icons/md";
import {storesData} from '../../data/stores.json';
import  PaginationComponent  from '../../components/Pagination/Pagination'
interface Store {
    id: number;
    name: string;
    address_1:string;
    address_2:string;
    city:string;
    state:string;
    zip:string
  }
  


const Stores: React.FC = () => {
  const [stores, setStores] = useState(storesData);
  const [selectedstores, setSelectedstores] = useState<number[]>([]);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [editName, setEditName] = useState<string>('');
  const [showModal, setShowModal] = useState(false);
  const [newStoreName, setnewStoreName] = useState<string>('');
  const [newStoreAddress, setnewStoreAddress] = useState<string>('');

  const[searchTerm,setsearchTerm]=useState("")
  const[page,setPage]=useState(0)
  const [totalRecords,setTotalRecords]=useState(stores.length)
  const[limit,setLimit]=useState(10)
  // Toggle the selection of an store
  const handleSelectStore = (id: number) => {
    setSelectedstores((prev) =>
      prev.includes(id) ? prev.filter((storeId) => storeId !== id) : [...prev, id]
    );
  };

  // Select or unselect all stores
  const handleSelectAll = () => {
    if (selectedstores.length === stores.length) {
      setSelectedstores([]);
    } else {
      setSelectedstores(stores.map((store) => store.id));
    }
  };

  // Inline edit actions
  const handleEdit = (id: number, name: string) => {
    setIsEditing(id);
    setEditName(name);
  };

  const handleSaveEdit = (id: number) => {
    setStores((prevstores) =>
      prevstores.map((store) =>
        store.id === id ? { ...store, name: editName } : store
      )
    );
    setIsEditing(null);
  };

  // Delete an store
  const handleDelete = (id: number) => {
    setStores((prevstores) => prevstores.filter((store) => store.id !== id));
    setSelectedstores((prev) => prev.filter((storeId) => storeId !== id));
  };

  // Add a new store
  const handleAddStore = () => {
    const newStore: Store = {
      id: stores.length + 1,
      name: newStoreName,
      address_1:newStoreAddress.split+(',')[0],
      address_2:newStoreAddress.split(',')[1],
    };
  
    setStores([newStore, ...stores]); // Prepend the new store to the beginning of the array
    setShowModal(false);
    setnewStoreName('');
    setnewStoreAddress('')
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
     <Button className='add-store-btn' onClick={() => setShowModal(true)}>
        Add New store
      </Button>
      </Col>
     </Row>

      {/* Table for stores */}
      <Table  bordered>
        <thead>
          <tr>
            <th className='select-cell'>
              <Form.Check
                type="checkbox"
                checked={selectedstores.length === stores.length}
                onChange={handleSelectAll}
              />
              <span style={{marginLeft:'5px'}}>store ID</span>
            </th>
            <th> Name</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {stores.slice(0,10).map((store) => (
            <tr key={store.id}>
              <td className='select-cell'>
                <Form.Check
                  type="checkbox"
                  checked={selectedstores.includes(store.id)}
                  onChange={() => handleSelectStore(store.id)}
                />
                <span style={{marginLeft:'5px'}}># {store.id}</span> 
              </td>
              
    
              <td>
                {isEditing === store.id ? (
                  <Form.Control
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                ) : (
                  store.name 
                )}
              </td>
              <td>
                {isEditing === store.id ? (
                  <Form.Control
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                ) : (
                  store.address_1+","+store.address_2 
                )}
              </td>
              <td>
                {isEditing === store.id ? (
                  <Button className='add-auther-btn' onClick={() => handleSaveEdit(store.id)}>
                    <MdDone/>
                  </Button>
                ) : (
                  <Button  className='add-auther-btn' onClick={() => handleEdit(store.id, store.name)}>
                    <FaPen/>
                  </Button>
                )}{' '}
                <Button className='add-auther-btn' onClick={() => handleDelete(store.id)}>
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
      {/* Add New store Button */}
      

      {/* Add store Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title> New store</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="newStoreName">
              <Form.Label>store Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter store full name"
                value={newStoreName}
                onChange={(e) => setnewStoreName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="newStoreName">
              <Form.Label>store Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter store Address"
                value={newStoreName}
                onChange={(e) => setnewStoreAddress(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className='cancel-btn' onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button className='save-btn' onClick={handleAddStore}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Stores;

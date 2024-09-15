import React from 'react';
import { Nav } from 'react-bootstrap';
import Logo from '../../assets/logo.png';
import './Sidebar.css';
import { SideNavs } from './SidbarLinks'
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
    return (
        <div className="bg-light p-3 vh-100 sidebar">
            <Nav className="flex-column">
                <Nav.Link className='bookStore_logo_link p-0'><img src={Logo} alt="Book store logo" className='bookStore_logo' /> <span> <strong>BOOK</strong> WORLD</span></Nav.Link>
                {
                    SideNavs.items.map((sideNav, index) => {
                        console.log("sideNav:",sideNav)
                        return (
                            <Link to={{ pathname: sideNav.url }} key={index}>
                                <i className={sideNav.icon} ></i>
                                <span onClick={() => {
                                    
                                }}>{sideNav.name}</span>&nbsp;&nbsp;&nbsp;

                            </Link>
                        )
                    })
                }
            </Nav>
        </div>
    );
};

export default Sidebar;

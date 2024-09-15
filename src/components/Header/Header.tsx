import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import PP from '../../assets/profile.png';
import './Header.css'
function Header() {
  const user={firstName:"Maha",lastName:"Taha",ProfilePicture:"",id:""}

  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">BreadCrumb Component </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <img src={user.ProfilePicture?user.ProfilePicture:PP} alt="user profile picture" className='profile_picture px-2'/>
            {user.firstName} {user.lastName}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
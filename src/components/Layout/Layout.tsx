import React , { Suspense }from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import AllRoutes from '../../routes';
import { Route, Routes } from 'react-router-dom';



const Layout: React.FC = () => {
  return (
    <div>
      <Header />
      <Container fluid>
        <Row>
          <Col xs={12} md={2} className="p-0">
            <Sidebar />
          </Col>
          <Col xs={12} md={10} className="p-4">
          <Suspense fallback={<div>Loading...</div>}>

          <Routes>
            {AllRoutes.map((route, idx) => {
              return route.Element ? (
                <Route
                  key={idx}
                  element={<route.Element />}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                >
                </Route>) : (null);
            },
            )}
            
          </Routes>
          </Suspense>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Layout;

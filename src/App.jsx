
import { Container, Row, Col } from 'react-bootstrap';
import Header from './components/Header/Header';
import MainTable from './components/Table/Table';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import DataAnalysis from './components/DataAnalysis/DataAnalysis';

function App() {

  return (
    <>
   
      <Header />
    <ErrorBoundary>
        <Container fluid>
          <Row>
            <Col>
              <MainTable />
            </Col>
            <Col>
              <DataAnalysis />
            </Col>
          </Row>
        </Container>

      </ErrorBoundary>
      </>
  );
}

export default App;

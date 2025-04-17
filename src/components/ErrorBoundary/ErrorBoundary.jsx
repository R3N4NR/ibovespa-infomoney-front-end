import React from "react";
import { Alert, Button, Container, Collapse } from "react-bootstrap";
import './ErrorBoundary.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      showDetails: false
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Erro capturado pelo ErrorBoundary:", error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReload = () => {
    window.location.reload();
  };

  toggleDetails = () => {
    this.setState(prev => ({ showDetails: !prev.showDetails }));
  };

  render() {
    if (this.state.hasError) {
      return (
        <Container className="mt-5 error-boundary">
          <Alert  >
            <Alert.Heading>Algo deu errado.</Alert.Heading>

            <p>
              Encontramos um problema ao carregar esta parte do sistema. Você pode tentar recarregar a página.
            </p>
            <hr />
            
            <div className="d-flex justify-content-between align-items-center">

              <Button variant="outline-light" onClick={this.handleReload}>
                Recarregar página
              </Button>
              <Button variant="outline-danger" onClick={this.toggleDetails}>
                {this.state.showDetails ? "Esconder detalhes" : "Mostrar detalhes"}
              </Button>
            </div>
            <Collapse in={this.state.showDetails}>
              <div>
                <pre className="mt-3 text-light bg-dark p-3 rounded" style={{ whiteSpace: 'pre-wrap' }}>
                  {this.state.error?.toString()}
                  {"\n"}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </div>
            </Collapse>
          </Alert>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

import { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { error: false }
    }

    static getDerivedStateFromError(err) {
        return { error: true };
    }

    componentDidCatch(error, errorInfo) {
        // log error service 
    }
    
    render() {
        if (this.state.error) {
            return <h1>Something went wrong while processing your request.!</h1>
        }
        return this.props.children;
    }
}

export default ErrorBoundary;

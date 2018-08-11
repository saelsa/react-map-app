import React, {Component} from 'react';

export class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    componentDidCatch(error, info) {
      // Display fallback UI
      this.setState({ hasError: true });
    }
  
    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return <div style="padding:20px; border:1px solid red"><h2>Error message</h2><p>Sorry, but there was an unexpected error. Please refer to the console for more information or try to refresh the page.  </p></div>;
      }
      return this.props.children;
    }
  }

  export default ErrorBoundary;

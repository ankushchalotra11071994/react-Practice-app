import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Send to Sentry / App Insights / your logger here
    console.error('ErrorBoundary caught:', error, errorInfo.componentStack);
    this.props.onError?.(error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    this.props.onReset?.();
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback via prop, if provided
      if (this.props.fallback) {
        return typeof this.props.fallback === 'function'
          ? this.props.fallback({ error: this.state.error, reset: this.handleReset })
          : this.props.fallback;
      }

      return (
        <div role="alert" style={{ padding: 24, textAlign: 'center' }}>
          <h2>Something went wrong.</h2>
          {process.env.NODE_ENV === 'development' && (
            <pre style={{ color: 'crimson', whiteSpace: 'pre-wrap', textAlign: 'left' }}>
              {this.state.error?.message}
            </pre>
          )}
          <button onClick={this.handleReset}>Try again</button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
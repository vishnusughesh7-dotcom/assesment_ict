import React from "react";
import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, message: "" };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, message: error?.message || "An unexpected interface error occurred." };
  }

  componentDidCatch(error, info) {
    console.error("Venuora interface error:", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main style={{ maxWidth: 760, margin: "60px auto", padding: 24, fontFamily: "system-ui, sans-serif", color: "#1c2738" }}>
          <h1 style={{ fontSize: 28 }}>Venuora could not display this page</h1>
          <p>The app encountered a frontend error. Refresh the page after checking the error below.</p>
          <pre style={{ whiteSpace: "pre-wrap", overflowWrap: "anywhere", background: "#fff1f2", border: "1px solid #fecdd3", padding: 16, borderRadius: 8 }}>{this.state.message}</pre>
          <button onClick={() => window.location.reload()} style={{ padding: "10px 14px", cursor: "pointer" }}>Reload page</button>
        </main>
      );
    }
    return this.props.children;
  }
}

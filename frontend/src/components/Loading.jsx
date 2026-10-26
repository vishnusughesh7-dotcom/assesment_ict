import React from "react";
export default function Loading() {
  return (
    <div className="loading-state">
      <span className="spinner" />
      <span>Loading events...</span>
    </div>
  );
}
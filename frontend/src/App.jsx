import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import EventForm from "./pages/EventForm";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-event" element={<EventForm />} />
        <Route path="/edit/:id" element={<EventForm />} />
      </Routes>
    </Layout>
  );
}
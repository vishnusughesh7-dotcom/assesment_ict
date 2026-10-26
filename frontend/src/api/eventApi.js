import axios from "axios";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  timeout: 10000
});

export const fetchEvents = () => client.get("/events");
export const fetchEvent = (id) => client.get(`/events/${id}`);
export const createEvent = (data) => client.post("/events", data);
export const updateEvent = (id, data) => client.put(`/events/${id}`, data);
export const deleteEvent = (id) => client.delete(`/events/${id}`);
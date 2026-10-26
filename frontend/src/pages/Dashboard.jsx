import React from "react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { deleteEvent, fetchEvents } from "../api/eventApi";
import Loading from "../components/Loading";

function formatDate(value) {
  if (!value || Number.isNaN(new Date(value).getTime())) return "Date unavailable";
  return new Date(value).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}

export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const [busy, setBusy] = useState(true);
  const [notice, setNotice] = useState("");

  const load = async () => {
    try {
      setBusy(true);
      const { data } = await fetchEvents();
      const list = Array.isArray(data) ? data : data?.events;
      if (!Array.isArray(list)) {
        throw new Error("The API returned an unexpected response. Check the backend route and database connection.");
      }
      setEvents(list);
      setNotice("");
    } catch (error) {
      setNotice(error.response?.data?.message || "Could not connect to the server.");
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const registrations = useMemo(
    () => events.reduce((sum, item) => sum + Number(item.totalRegistrations || 0), 0),
    [events]
  );

  const upcoming = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return events.filter((item) => new Date(item.date) >= today).length;
  }, [events]);

  const remove = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this event?");
    if (!confirmed) return;

    try {
      await deleteEvent(id);
      setEvents((current) => current.filter((item) => item._id !== id));
    } catch (error) {
      setNotice(error.response?.data?.message || "Could not delete the event.");
    }
  };

  return (
    <>
      <section className="page-header">
        <div>
          <span className="section-label">ADMIN PANEL</span>
          <h1>Dashboard</h1>
          <p>Manage your events and view registration details.</p>
        </div>
        <Link className="button button-primary" to="/add-event">
          <span>+</span> Add Event
        </Link>
      </section>

      {notice && <div className="alert">{notice}</div>}

      <section className="stat-grid" aria-label="Event summary">
        <article className="stat-card">
          <div>
            <span>Total Events</span>
            <strong>{events.length}</strong>
          </div>
          <div className="stat-icon blue">▦</div>
        </article>

        <article className="stat-card">
          <div>
            <span>Total Registrations</span>
            <strong>{registrations}</strong>
          </div>
          <div className="stat-icon green">♙</div>
        </article>

        <article className="stat-card">
          <div>
            <span>Upcoming Events</span>
            <strong>{upcoming}</strong>
          </div>
          <div className="stat-icon orange">◷</div>
        </article>
      </section>

      <section className="panel">
        <div className="panel-head">
          <div>
            <h2>Events</h2>
            <p>All events stored in your registration system.</p>
          </div>
          <span className="event-count">{events.length} total</span>
        </div>

        {busy ? (
          <Loading />
        ) : events.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">+</div>
            <h3>No events found</h3>
            <p>Start by creating your first event.</p>
            <Link className="button button-primary" to="/add-event">Create Event</Link>
          </div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Event ID</th>
                  <th>Event Name</th>
                  <th>Event Date</th>
                  <th>Venue</th>
                  <th>Total Registrations</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.map((item) => (
                  <tr key={item._id || `${item.name}-${item.date}`}>
                    <td>
                      <span className="event-id">{String(item._id || "NO-ID").slice(-7).toUpperCase()}</span>
                    </td>
                    <td>
                      <div className="event-title">{item.name}</div>
                      <div className="event-subtitle">{item.description}</div>
                    </td>
                    <td>{formatDate(item.date)}</td>
                    <td>{item.venue}</td>
                    <td>
                      <span className="registration-number">
                        {item.totalRegistrations}
                      </span>
                    </td>
                    <td>
                      <div className="action-group">
                        <Link className="button button-edit" to={`/edit/${item._id}`}>
                          Update
                        </Link>
                        <button
                          className="button button-delete"
                          onClick={() => remove(item._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}
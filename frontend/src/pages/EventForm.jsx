import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createEvent, fetchEvent, updateEvent } from "../api/eventApi";

const blank = {
  name: "",
  description: "",
  date: "",
  venue: ""
};

export default function EventForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const editing = Boolean(id);

  const [form, setForm] = useState(blank);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(editing);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!editing) return;

    const load = async () => {
      try {
        const { data } = await fetchEvent(id);
        setForm({
          name: data?.name || "",
          description: data?.description || "",
          date: data?.date && !Number.isNaN(new Date(data.date).getTime())
            ? new Date(data.date).toISOString().slice(0, 10)
            : "",
          venue: data?.venue || ""
        });
      } catch (err) {
        setError(err.response?.data?.message || "Could not load this event.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [editing, id]);

  const change = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const submit = async (event) => {
    event.preventDefault();
    setError("");

    if (Object.values(form).some((value) => !value.trim())) {
      setError("Please complete every field.");
      return;
    }

    try {
      setSaving(true);
      if (editing) {
        await updateEvent(id, form);
      } else {
        await createEvent(form);
      }
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Could not save the event.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="form-loading">Loading event...</div>;
  }

  return (
    <section className="form-page">
      <div className="page-header form-header">
        <div>
          <span className="section-label">EVENT MANAGEMENT</span>
          <h1>{editing ? "Update Event" : "Add Event"}</h1>
          <p>{editing ? "Edit the details of an existing event." : "Create a new event for registration."}</p>
        </div>
        <Link className="back-link" to="/">← Dashboard</Link>
      </div>

      <form className="form-card" onSubmit={submit}>
        {error && <div className="alert">{error}</div>}

        <div className="field">
          <label htmlFor="name">Event Name</label>
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={change}
            placeholder="Enter event name"
            maxLength="100"
            required
          />
        </div>

        <div className="field">
          <label htmlFor="description">Event Description</label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={change}
            placeholder="Enter a short description"
            rows="5"
            maxLength="500"
            required
          />
        </div>

        <div className="field-row">
          <div className="field">
            <label htmlFor="date">Event Date</label>
            <input id="date" name="date" type="date" value={form.date} onChange={change} required />
          </div>

          <div className="field">
            <label htmlFor="venue">Venue</label>
            <input
              id="venue"
              name="venue"
              value={form.venue}
              onChange={change}
              placeholder="Enter venue"
              maxLength="120"
              required
            />
          </div>
        </div>

        <div className="form-footer">
          <Link className="button button-secondary" to="/">Cancel</Link>
          <button className="button button-primary" disabled={saving}>
            {saving ? "Saving..." : editing ? "Save Changes" : "Create Event"}
          </button>
        </div>
      </form>
    </section>
  );
}
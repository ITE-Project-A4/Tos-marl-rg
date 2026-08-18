import { useState } from "react";
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // No backend endpoint yet — this just confirms the form works client-side.
    setSent(true);
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-16 sm:px-6">
      <h1 className="mb-2 font-display text-4xl tracking-wide text-paper">Contact</h1>
      <p className="mb-6 text-sm text-muted">Questions, feedback, or bug reports — send them here.</p>

      {sent ? (
        <p className="rounded-md border border-marquee/40 bg-marquee/10 p-4 text-sm text-marquee">
          Thanks — your message was noted.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input id="name" name="name" label="Name" value={form.name} onChange={handleChange} required />
          <Input
            id="email"
            name="email"
            type="email"
            label="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <div className="flex flex-col gap-1.5">
            <label htmlFor="message" className="text-xs font-semibold uppercase tracking-wider text-muted">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={form.message}
              onChange={handleChange}
              required
              className="rounded-md border border-line bg-surface px-3 py-2 text-paper placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-marquee"
            />
          </div>
          <Button type="submit" className="self-start">
            Send message
          </Button>
        </form>
      )}
    </div>
  );
}

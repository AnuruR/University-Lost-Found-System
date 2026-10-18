import { useState } from "react";
import axios from "axios";

const Found = () => {
  const [formData, setFormData] = useState({
    Topic: "",
    description: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("/api/found", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess(res.data.message || "Found submitted successfully");
      setFormData({ Topic: "", description: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Found submission failed");
    }
  };

  return (
    <div className="flex flex-1 items-center justify-center px-5 py-12 sm:px-8">
      <section className="w-full max-w-2xl rounded-[2rem] border border-white/80 bg-white/70 p-7 shadow-2xl shadow-teal-950/10 backdrop-blur-xl sm:p-10">
        <span className="inline-flex rounded-full bg-teal-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-teal-800">
          Found item
        </span>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          Help it find its owner
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
          Post what you found and where it can be safely claimed.
        </p>
        {error && (
          <p role="alert" className="mt-6 rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </p>
        )}
        {success && (
          <p role="status" className="mt-6 rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            {success}
          </p>
        )}
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="topic">
              Item name
            </label>
            <input
              className="w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
              id="topic"
              type="text"
              name="Topic"
              value={formData.Topic}
              onChange={handleChange}
              placeholder="e.g. Blue water bottle"
              required
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="description">
              Details
            </label>
            <textarea
              className="min-h-32 w-full resize-y rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Where did you find it? Share any details that will help the owner identify it."
              required
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-2xl bg-teal-700 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-teal-900/15 transition hover:-translate-y-0.5 hover:bg-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
          >
            Submit found item
          </button>
        </form>
      </section>
    </div>
  );
};

export default Found;

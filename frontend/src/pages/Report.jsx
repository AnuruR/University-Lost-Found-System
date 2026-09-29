import { useState } from "react";
import axios from "axios";

const Report = () => {
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
      const res = await axios.post("/api/lost", formData);
      setSuccess(res.data.message || "Report submitted successfully");
      setFormData({ Topic: "", description: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Report submission failed");
    }
  };

  return (
    <div
      className="min-h-screen flex items-start
        justify-start bg-teal-100 p-4"
    >
      <div
        className="bg-gray-100 p-8 rounded-lg shadow-md
        w-full max-w-lg text-center
        hover:shadow-lg transition-shadow
        duration-300"
      >
        <h1 className="text-2xl font-bold mb-6">Report a Lost Item</h1>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        {success && <p className="text-green-700 mb-4">{success}</p>}
        <form onSubmit={handleSubmit}>
          <label className="block text-left mb-2" htmlFor="topic">
            Topic
          </label>
          <input
            className="w-full p-3 border border-gray-300 rounded-md mb-4"
            id="topic"
            type="text"
            name="Topic"
            value={formData.Topic}
            onChange={handleChange}
            required
          />
          <label className="block text-left mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-md mb-4"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600"
          >
            Submit report
          </button>
        </form>
      </div>
    </div>
  );
};

export default Report;

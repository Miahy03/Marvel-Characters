import React, { useEffect, useState } from "react";
import axios from "axios";

const characterImages = {
  1: "https://images.hdqwalls.com/wallpapers/peter-parker-spiderman-ps5-l0.jpg",
  2: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5S0I7PmC6u28lQJ6Q4QNmKFwOnW1GaOOikA&s",
  3: "https://images8.alphacoders.com/112/thumb-1920-1120619.jpg",
  4: "https://wallpaperbat.com/img/886038-pinterest.jpg",
  5: "https://wallpapersok.com/images/high/t-challa-the-black-panther-keeping-the-city-of-wakanda-safe-vo2yoswsxmqi3tgy.jpg",
  6: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb_ZAObjKbbWDb__sRpOUGEiX-hPD_UtX7Jw&s",
  7: "https://images.alphacoders.com/106/thumb-1920-1065270.jpg",
  8: "https://wallpapers.com/images/high/4k-hulk-marvel-super-war-wpaqv8lyemtuaeh6.webp",
};

export default function App() {
  const API_URL = "http://localhost:3000/characters";

  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({ name: "", realName: "", universe: "Earth-616" });
  const [editingId, setEditingId] = useState(null);

  const [darkMode, setDarkMode] = useState(false);

  // Fetch characters from backend
  const fetchCharacters = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL);
      setCharacters(res.data);
      setError(null);
    } catch {
      setError("Erreur lors du chargement");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, form);
        setEditingId(null);
      } else {
        await axios.post(API_URL, form);
      }
      setForm({ name: "", realName: "", universe: "Earth-616" });
      fetchCharacters();
    } catch {
      setError("Erreur lors de la sauvegarde");
    }
  };

  const handleEdit = (char) => {
    setForm({ name: char.name, realName: char.realName, universe: char.universe });
    setEditingId(char.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer ce personnage ?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchCharacters();
    } catch {
      setError("Erreur lors de la suppression");
    }
  };

  return (
    <div
      className={`min-h-screen font-sans transition-colors duration-500 ${
        darkMode ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex justify-between items-center mb-12">
          <h1
            className={`text-5xl font-extrabold tracking-tight ${
              darkMode ? "text-gray-100" : "text-gray-900"
            }`}
          >
            Marvel Characters
          </h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle light/dark mode"
            className={`py-2 px-4 rounded-full font-semibold shadow-md focus:outline-none transition-colors duration-300 ${
              darkMode
                ? "bg-yellow-400 text-gray-900 hover:bg-yellow-300"
                : "bg-gray-800 text-yellow-400 hover:bg-gray-700"
            }`}
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>

        {/* Formulaire Ajout / Edit */}
        <form
          onSubmit={handleSubmit}
          className={`rounded-2xl p-8 shadow-lg grid grid-cols-1 md:grid-cols-4 gap-6 mb-16 transition-colors duration-500 ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div>
            <label
              className={`block mb-2 text-sm font-semibold uppercase tracking-wide ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Nom du personnage
            </label>
            <input
              type="text"
              placeholder="Spider-Man"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className={`w-full rounded-lg border px-4 py-3 placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
                darkMode
                  ? "border-gray-700 bg-gray-700 text-gray-200 placeholder-gray-400"
                  : "border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-500"
              }`}
            />
          </div>

          <div>
            <label
              className={`block mb-2 text-sm font-semibold uppercase tracking-wide ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Vrai nom
            </label>
            <input
              type="text"
              placeholder="Peter Parker"
              value={form.realName}
              onChange={(e) => setForm({ ...form, realName: e.target.value })}
              required
              className={`w-full rounded-lg border px-4 py-3 placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
                darkMode
                  ? "border-gray-700 bg-gray-700 text-gray-200 placeholder-gray-400"
                  : "border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-500"
              }`}
            />
          </div>

          <div>
            <label
              className={`block mb-2 text-sm font-semibold uppercase tracking-wide ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Univers
            </label>
            <input
              type="text"
              placeholder="Earth-616"
              value={form.universe}
              onChange={(e) => setForm({ ...form, universe: e.target.value })}
              className={`w-full rounded-lg border px-4 py-3 placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
                darkMode
                  ? "border-gray-700 bg-gray-700 text-gray-200 placeholder-gray-400"
                  : "border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-500"
              }`}
            />
          </div>

          <button
            type="submit"
            className="self-end bg-indigo-600 text-white font-semibold rounded-lg py-3 shadow-md hover:bg-indigo-700 transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {editingId ? "Mettre à jour" : "Ajouter"}
          </button>
        </form>

        {error && (
          <p className="mb-10 text-center text-red-600 font-semibold drop-shadow-md">{error}</p>
        )}

        {loading ? (
          <p className="text-center text-xl font-semibold animate-pulse tracking-wide">
            Chargement...
          </p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-center mb-16">
            {characters.map((char) => (
              <li
                key={char.id}
                className={`overflow-hidden rounded-lg shadow-md transition-transform transform hover:scale-105 ${
                  darkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-900"
                }`}
                style={{ width: 300, maxHeight: 400 }}
              >
                <img
                  src={characterImages[char.id]}
                  alt={char.name}
                  className="w-full h-48 object-cover"
                  onError={(e) => (e.target.src = "https://via.placeholder.com/300x192?text=No+Image")}
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-1">{char.name}</h2>
                  <p className="mb-2 italic">
                    Nom : <span className={darkMode ? "text-gray-300" : "text-gray-600"}>{char.realName}</span>
                  </p>
                  <p className={`text-sm font-semibold uppercase tracking-wide ${
                    darkMode ? "text-indigo-400" : "text-indigo-600"
                  }`}>
                    Univers : {char.universe}
                  </p>
                  <div className="mt-3 flex justify-center gap-4">
                    <button
                      onClick={() => handleEdit(char)}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-semibold transition"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(char.id)}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md font-semibold transition"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

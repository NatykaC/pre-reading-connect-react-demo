import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

function ColorEditForm() {
  let { index } = useParams();
  const navigate = useNavigate();

  const [color, setColor] = useState({
    name: "",
    isFavorite: false,
  });

  const handleTextChange = (event) => {
    setColor({ ...color, [event.target.id]: event.target.value });
  };  

  const handleCheckboxChange = () => {
    setColor({ ...color, isFavorite: !color.isFavorite });
  };

  // Update a color. Redirect to show view
  const updateColor = () => {
    const editedData = {
      name: color.name,
      is_favorite: color.isFavorite
    }
    try {
      fetch(`${API}/colors/${index}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedData)
      })
      .then(res => res.json())
      .then( ()=> navigate('/colors'))
    } catch (error) {
      return error
    }
  };

  // On page load, fill in the form with the color data.

  const handleSubmit = (event) => {
    event.preventDefault();
    updateColor();
  };

  return (
    <div className="Edit">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          value={color.name}
          type="text"
          onChange={handleTextChange}
          placeholder="Name of Color"
          required
        />

        <label htmlFor="isFavorite">Favorite:</label>
        <input
          id="isFavorite"
          type="checkbox"
          onChange={handleCheckboxChange}
          checked={color.isFavorite}
        />
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
      <br />
      <Link to={`/colors/${index}`}>
        <button>Nevermind!</button>
      </Link>
    </div>
  );
}

export default ColorEditForm;

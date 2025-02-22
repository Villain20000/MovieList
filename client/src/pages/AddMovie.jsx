import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddMovie() {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [imdbRating, setImdbRating] = useState('');
  const [posterUrl, setPosterUrl] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newMovie = {
        title,
        genre,
        releaseYear: Number(releaseYear),
        imdbRating: Number(imdbRating),
        posterUrl,
        description,
      };
      await axios.post('http://localhost:5000/api/movies', newMovie);
      navigate('/');
    } catch (error) {
      console.error('Error adding movie:', error);
    }
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <h1 className="h2 mb-4">Add a New Movie</h1>
          <form onSubmit={handleSubmit} className="card">
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Genre</label>
                <input
                  type="text"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  required
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Release Year</label>
                <input
                  type="number"
                  value={releaseYear}
                  onChange={(e) => setReleaseYear(e.target.value)}
                  required
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">IMDb Rating</label>
                <input
                  type="number"
                  step="0.1"
                  value={imdbRating}
                  onChange={(e) => setImdbRating(e.target.value)}
                  required
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Poster URL</label>
                <input
                  type="text"
                  value={posterUrl}
                  onChange={(e) => setPosterUrl(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="form-control"
                  rows="3"
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Add Movie
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddMovie;

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { StarIcon, TrashIcon } from '@heroicons/react/24/solid';

function MovieDetails() {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchMovie();
  }, [id]);

  const fetchMovie = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/movies/${id}`);
      setMovie(response.data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching movie details');
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (newStatus) => {
    try {
      const response = await axios.patch(`http://localhost:5000/api/movies/${id}`, {
        status: newStatus,
        watchedDate: newStatus === 'Watched' ? new Date().toISOString() : null
      });
      setMovie(response.data);
    } catch (error) {
      setError('Error updating movie status');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      try {
        await axios.delete(`http://localhost:5000/api/movies/${id}`);
        navigate('/');
      } catch (error) {
        setError('Error deleting movie');
      }
    }
  };

  const handleRatingUpdate = async (rating) => {
    try {
      const response = await axios.patch(`http://localhost:5000/api/movies/${id}`, {
        personalRating: rating
      });
      setMovie(response.data);
    } catch (error) {
      setError('Error updating rating');
    }
  };

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center mt-8 text-red-600">{error}</div>;
  if (!movie) return <div className="text-center mt-8">Movie not found</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          {movie.posterUrl && (
            <div className="md:flex-shrink-0">
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="h-64 w-full md:w-96 object-cover"
              />
            </div>
          )}
          <div className="p-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{movie.title}</h1>
                <p className="mt-2 text-gray-600">{movie.genre} • {movie.releaseYear}</p>
              </div>
              <button
                onClick={handleDelete}
                className="text-red-600 hover:text-red-800"
              >
                <TrashIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="mt-4 flex items-center">
              <StarIcon className="h-5 w-5 text-yellow-400" />
              <span className="ml-1 text-gray-600">IMDb: {movie.imdbRating}</span>
            </div>

            <p className="mt-4 text-gray-600">{movie.description}</p>

            <div className="mt-6">
              <h2 className="text-lg font-semibold">Your Rating</h2>
              <div className="flex gap-2 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleRatingUpdate(star)}
                    className={`p-1 ${
                      movie.personalRating >= star
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  >
                    <StarIcon className="h-6 w-6" />
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h2 className="text-lg font-semibold">Status</h2>
              <div className="flex gap-4 mt-2">
                <button
                  onClick={() => handleStatusUpdate('Pending')}
                  className={`px-4 py-2 rounded-full ${
                    movie.status === 'Pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  Pending
                </button>
                <button
                  onClick={() => handleStatusUpdate('Watched')}
                  className={`px-4 py-2 rounded-full ${
                    movie.status === 'Watched'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  Watched
                </button>
              </div>
            </div>

            {movie.watchedDate && (
              <p className="mt-4 text-sm text-gray-600">
                Watched on: {new Date(movie.watchedDate).toLocaleDateString()}
              </p>
            )}

            {movie.personalNotes && (
              <div className="mt-6">
                <h2 className="text-lg font-semibold">Your Notes</h2>
                <p className="mt-2 text-gray-600">{movie.personalNotes}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;

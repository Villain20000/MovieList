import { Link } from 'react-router-dom';
import { StarIcon, ClockIcon } from '@heroicons/react/24/solid';

function MovieCard({ movie }) {
  return (
    <div className="card">
      {movie.posterUrl && (
        <img 
          src={movie.posterUrl} 
          alt={movie.title} 
          className="card-img-top"
        />
      )}
      <div className="card-body">
        <h3 className="card-title">{movie.title}</h3>
        <div className="d-flex justify-content-between">
          <span>{movie.genre}</span>
          <span>{movie.releaseYear}</span>
        </div>
        <div className="d-flex align-items-center">
          <StarIcon className="h-5 w-5 text-yellow-400 me-1" />
          <span>{movie.imdbRating}</span>
        </div>
        <div className="d-flex justify-content-between">
          <span className={`badge ${
            movie.status === 'Watched' 
              ? 'bg-success' 
              : 'bg-warning'
          }`}>
            {movie.status}
          </span>
          <Link 
            to={`/movie/${movie._id}`}
            className="btn btn-link"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;

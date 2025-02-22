import { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from '../components/MovieCard';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

function Home() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('title');

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    filterAndSortMovies();
  }, [movies, searchTerm, statusFilter, sortBy]);

  const fetchMovies = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/movies');
      setMovies(response.data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const filterAndSortMovies = () => {
    let filtered = [...movies];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.genre.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(movie => movie.status === statusFilter);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'rating':
          return b.imdbRating - a.imdbRating;
        case 'year':
          return b.releaseYear - a.releaseYear;
        default:
          return 0;
      }
    });

    setFilteredMovies(filtered);
  };

  return (
    <div className="container py-4">
      <div className="mb-4">
        <div className="row g-3 align-items-center">
          {/* Search Bar */}
          <div className="col-12 col-md-4">
            <div className="input-group">
              <span className="input-group-text">
                <MagnifyingGlassIcon className="h-5 w-5" />
              </span>
              <input
                type="text"
                placeholder="Search movies..."
                className="form-control"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Filters */}
          <div className="col-12 col-md-8">
            <div className="d-flex gap-3">
              <select
                className="form-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="Watched">Watched</option>
                <option value="Pending">Pending</option>
              </select>

              <select
                className="form-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="title">Sort by Title</option>
                <option value="rating">Sort by Rating</option>
                <option value="year">Sort by Year</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Movies Grid */}
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
        {filteredMovies.map(movie => (
          <div key={movie._id} className="col">
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>

      {filteredMovies.length === 0 && (
        <div className="text-center text-muted mt-4">
          No movies found. Try adjusting your filters or add some movies!
        </div>
      )}
    </div>
  );
}

export default Home;

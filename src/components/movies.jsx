import React, { Component } from "react";
import Pagination from "../common/pagination";
import Listgroup from "../common/listGroup";
import MoviesTable from "./moviesTable";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/genreService";
import { paginate } from "../utils/paginate";
import { Link } from "react-router-dom";
import _ from "lodash";
import SearchBox from "./searchBox";

class Movies extends Component {
  state = {
    movies: [],
    geners: [],
    currentPage: 1,
    pageSize: 4,
    sortCoulmn: { path: "title", order: "asc" },
    searchQuery: "",
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const geners = [{ _id: "", name: "All Genres" }, ...data];
    this.setState({ movies: getMovies(), geners });
  }

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };
  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenersSelect = (gener) => {
    this.setState({ selectedGener: gener, searchQuery: "", currentPage: 1 });
  };

  handleSort = (sortCoulmn) => {
    this.setState({ sortCoulmn });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGener: null, currentPage: 1 });
  };
  getPageData = () => {
    const {
      pageSize,
      currentPage,
      selectedGener,
      searchQuery,
      movies: allMovies,
      sortCoulmn,
    } = this.state;

    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGener && selectedGener._id)
      filtered = allMovies.filter((m) => m.genre._id === selectedGener._id);

    const sorted = _.orderBy(filtered, [sortCoulmn.path], [sortCoulmn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      selectedGener,
      movies: allMovies,
      sortCoulmn,
      searchQuery,
    } = this.state;

    if (count === 0) return <p>There are no movies in Database</p>;

    const { totalCount, data: movies } = this.getPageData();

    return (
      <div className="row">
        <div className="col-3">
          <Listgroup
            items={this.state.geners}
            onItemSelect={this.handleGenersSelect}
            selectedItem={this.state.selectedGener}
          />
        </div>
        <div className="col">
          <Link
            to="/movies/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            New Movie
          </Link>

          <p>Showing {totalCount} Movies In The DataBase</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <MoviesTable
            movies={movies}
            sortCoulmn={sortCoulmn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemCount={totalCount}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  }
}

export default Movies;

import React, { Component } from 'react';
import Axios from 'axios';
import { NavLink, Route, withRouter } from 'react-router-dom';

class MoviesPageView extends Component {
  state = {
    query: '',
    queryMovie: '',
    movies: [],
  };

  //27afa94f0efefd21cbebfb5074759bcd

  async componentDidMount() {
    //  const response = await Axios.get(
    //    'https://api.themoviedb.org/3/search/movie?api_key=27afa94f0efefd21cbebfb5074759bcd&query=Jack+Reacher',
    //  );
    //   console.log(response.data);
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.queryMovie !== this.state.queryMovie) {
      const response = await Axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=27afa94f0efefd21cbebfb5074759bcd&query=${this.state.queryMovie}&page=1&include_adult=false`,
      );
      // console.log(response.data.results);

      this.setState({ movies: response.data.results });
    }
  }

  handleChange = e => {
    this.setState({ query: e.currentTarget.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    //  this.props.onSubmit(this.state.query);
   //  console.log(this.state.query);
    this.setState({ queryMovie: this.state.query, query: '' });
  };

  render() {
    return (
      <div>
        <div className="Searchbar">
          <form onSubmit={this.handleSubmit} className="SearchForm">
            <button type="submit" className="SearchForm-button">
              <span className="SearchForm-button-label"></span>
            </button>
            <input
              type="text"
              value={this.state.query}
              onChange={this.handleChange}
              className="SearchForm-input"
              autoComplete="off"
              autoFocus
              placeholder="Search movie"
            />
          </form>
        </div>
        {this.state.queryMovie && (
          <div>
            <ul>
              {this.state.movies.map(movie => (
                <li key={movie.id}>
                  <NavLink
                    to={{
                      pathname: `/movies/${movie.id}`,
                      state: {from: this.props.location},
                    }}
                  >
                    {movie.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(MoviesPageView);

import React, { Component } from 'react';
import Axios from 'axios';
import { NavLink, withRouter } from 'react-router-dom';

class HomeView extends Component {
  state = {
    movies: [],
  };

  async componentDidMount() {
    const response = await Axios.get(
      'https://api.themoviedb.org/3/trending/movie/week?api_key=27afa94f0efefd21cbebfb5074759bcd',
    );
    //  console.log(response.data);

    this.setState({ movies: response.data.results });
    //  console.log(this.state.movies);
  }

  render() {
    return (
      <div className="HomeView">
        <h1 className="HomeView-title">Trending today</h1>

        <div>
          <ul>
            {this.state.movies.map(movie => (
              <li key={movie.id}>
                <NavLink
                  to={{
                    pathname: `/movies/${movie.id}`,
                    state: {
                      from: this.props.location,
                    },
                  }}
                >
                  {movie.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default withRouter(HomeView);

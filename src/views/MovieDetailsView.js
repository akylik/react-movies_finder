import React, { Component } from 'react';
import Axios from 'axios';
import { NavLink, Route, Switch, withRouter } from 'react-router-dom';
import routes from '../routes';
import Cast from '../components/Cast';
import Reviews from '../components/Reviews';

class MovieDetailsView extends Component {
  state = {
    movie: {},
    genres: [],
  };

  async componentDidMount() {
    const { movieId } = this.props.match.params;
    const response = await Axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=27afa94f0efefd21cbebfb5074759bcd&language=en-US`,
    );
    console.log(response);

    this.setState({ movie: response.data });

    const res = this.state.movie.genres;
    const resG = res.map(genres => genres.name).join(', ');

    this.setState({ genres: resG });
  }

  handleGoBack = () => {
    const { location, history } = this.props;

    if (location.state && location.state.from) {
      return history.push(location.state.from);
    }

    history.push(routes.home);

    // history.push(location?.state?.from || routes.books);
  };

  render() {
    const { movieId } = this.props.match.params;
    return (
      <div>
        <button type="button" onClick={this.handleGoBack} className="NavLink">
          Вернуться назад
        </button>
        <div className="container-fluid">
          <div>
            <img
              src={`https://www.themoviedb.org/t/p/original${this.state.movie.poster_path}`}
              className="Poster__img"
            />
          </div>
          <div>
            <h3>{this.state.movie.title}</h3>
            <h6>User Score: {this.state.movie.runtime}%</h6>
            <h4>Overview</h4>
            <p>{this.state.movie.overview}</p>
            <h4>Genres</h4>
            <p>{this.state.genres}</p>
          </div>
        </div>

        <div className="Information">
          <h6>Additional information</h6>
          <ul>
            <li>
              <NavLink to={`/movies/${movieId}/cast`}>Cast</NavLink>
            </li>
            <li>
              <NavLink to={`/movies/${movieId}/reviews`}>Reviews</NavLink>
            </li>
          </ul>
        </div>

        <Switch>
          <Route path={`/movies/:movieId/cast`} component={Cast} />
          <Route path={`/movies/:movieId/reviews`} component={Reviews} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(MovieDetailsView);

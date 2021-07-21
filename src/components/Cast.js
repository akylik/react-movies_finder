import React, { Component } from 'react';
import Axios from 'axios';

class Cast extends Component {
  state = {
    cast: [],
  };

  async componentDidMount() {
    const { movieId } = this.props.match.params;
    const response = await Axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=27afa94f0efefd21cbebfb5074759bcd&language=en-US`,
    );
   //  console.log(response.data.cast);
    this.setState({cast: response.data.cast});
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.cast.map(cast => (
            <li key={cast.cast_id}>
              <div className="ProfileContainer">
                <img
                  src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${cast.profile_path}`}
                  className="ProfileImg"
                />
                <p>{cast.name}</p>
                <p>Character: {cast.character}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Cast;

import React, { Component } from 'react';
import Axios from 'axios';

class Reviews extends Component {
  state = {
    reviews: [],
  };

  async componentDidMount() {
    const { movieId } = this.props.match.params;
    const response = await Axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=27afa94f0efefd21cbebfb5074759bcd&language=en-US&page=1`,
      // `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=27afa94f0efefd21cbebfb5074759bcd&language=en-US`,
    );
    console.log(response.data);
     this.setState({ reviews: response.data.results });
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.reviews.map(review => (
            <li key={review.id}>
              <div className="ProfileContainer">
               <h4>{review.author}</h4>
                <p>{review.content}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Reviews;

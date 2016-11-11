import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class FetchDemo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      subreddit: 'javascript',
      input: 'javascript'
    };
  }

  componentDidMount() {
    axios.get(`http://www.reddit.com/r/${this.state.subreddit}.json`)
      .then(res => {
        const posts = res.data.data.children.map(obj => obj.data);
        this.setState({ posts });
      });
  }

  handleSubmit (event) {
    event.preventDefault()
    this.setState({input: this.state.subreddit})
    axios.get(`http://www.reddit.com/r/${this.state.subreddit}.json`)
      .then(res => {
        const posts = res.data.data.children.map(obj => obj.data);
        this.setState({ posts });
      });
    }

  handleChange(event) {
    this.setState({subreddit: event.target.value})
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label>Which Reddit?</label>
          <input type="text" defaultValue={this.state.subreddit} onChange={this.handleChange.bind(this)}></input>
        <button>Submit</button>
      </form>
        <h1>{`/r/${this.state.input}`}</h1>
        <ul>
          {this.state.posts.map(post =>
            <li key={post.id}>{post.title}</li>
          )}
        </ul>
      </div>
    );
  }
}

ReactDOM.render(
  <FetchDemo subreddit="{this.state.subreddit}"/>,
  document.getElementById('root')
);

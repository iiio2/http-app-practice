import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

const apiEndPoint = 'https://jsonplaceholder.typicode.com/posts';

class App extends Component {
  state = {
    posts: [],
  };

  async componentDidMount() {
    const { data: posts } = await axios.get(apiEndPoint);

    this.setState({ posts });

    console.log(posts);
  }

  handleAdd = async () => {
    const obj = { id: 1001, title: 'a', body: 'b' };
    const { data: post } = await axios.post(apiEndPoint, obj);

    const posts = [post, ...this.state.posts];
    this.setState({ posts });
    console.log(post);
  };

  handleUpdate = async (post) => {
    post.title = 'Updated';
    await axios.put(apiEndPoint + '/' + post.id, post);

    const posts = [...this.state.posts];

    const index = posts.indexOf(post);
    posts[index] = { ...post };
    this.setState({ posts });

    console.log('Update', post);
  };

  handleDelete = async (post) => {
    const originalPosts = [...this.state.posts];

    const posts = this.state.posts.filter((p) => p.id !== post.id);

    this.setState({ posts });

    try {
      await axios.delete(apiEndPoint + '/' + post.id);
    } catch (ex) {
      alert('Somthing error occured');
      this.setState({ posts: originalPosts });
    }

    console.log('Delete', post);
  };

  render() {
    return (
      <React.Fragment>
        <button className='btn btn-primary' onClick={this.handleAdd}>
          Add
        </button>
        <table className='table'>
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map((post) => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className='btn btn-info btn-sm'
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className='btn btn-danger btn-sm'
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;

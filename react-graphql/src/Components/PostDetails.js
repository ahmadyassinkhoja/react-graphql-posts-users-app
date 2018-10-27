import React from "react";

import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";

const updatePost = gql`
  mutation UpdatePost($id: ID!, $data: UpdatePostInput!) {
    updatePost(id: $id, data: $data) {
      title
      body
    }
  }
`;

class PostDetails extends React.Component {
  state = {
    id: this.props.match.location.state.id,
    title: this.props.match.location.state.title,
    body: this.props.match.location.state.body,
    published: this.props.match.location.state.published,
    author: this.props.match.location.state.author.id
  };
  render() {
    let { id, title, body, published, author } = this.state;

    return (
      <div>
        <div className="card">
          <div className="">
            <img
              className="image"
              src="http://localhost:3000/post.png"
              alt="Card image cap"
            />
          </div>
          <div className="card-body">
            <h3 className="card-title">
              <input
                className="form-control"
                value={title}
                onChange={e => this.setState({ title: e.target.value })}
                type="text"
                placeholder="Title"
              />
            </h3>
            <h5 className="card-text">
              <input
                className="form-control"
                value={body}
                onChange={e => this.setState({ body: e.target.value })}
                type="text"
                placeholder="Body"
              />
            </h5>
            <p className="card-text">
              <input
                className="form-control"
                value={published}
                onChange={e => this.setState({ published: e.target.value })}
                type="checkbox"
              />
            </p>
            <p className="card-text">
              <input
                className="form-control"
                value={author}
                onChange={e => this.setState({ author: e.target.value })}
                type="text"
              />
            </p>

            <Mutation
              mutation={updatePost}
              variables={{ id, data: { title, body, published, author } }}
            >
              {UpdatePost => (
                <button
                  className="btn-primary btn-block"
                  onClick={() => {
                    UpdatePost();
                    window.location.reload();
                    this.props.match.history.push("/posts");
                  }}
                >
                  Update Post
                </button>
              )}
            </Mutation>
          </div>
        </div>
      </div>
    );
  }
}

export default PostDetails;

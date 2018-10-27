import React from "react";

import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";

const updateUser = gql`
  mutation UpdateUser($id: ID!, $data: UpdateUserInput!) {
    updateUser(id: $id, data: $data) {
      name
      email
      age
    }
  }
`;
class UserDetails extends React.Component {
  state = {
    name: this.props.match.location.state.name,
    email: this.props.match.location.state.email,
    id: this.props.match.location.state.id,
    age: this.props.match.location.state.age
  };
  render() {
    let { name, email, age, id } = this.state;

    return (
      <div>
        <div className="card">
          <div className="">
            <img
              className="image"
              src="http://localhost:3000/avatar.png"
              alt="Card image cap"
            />
          </div>
          <div className="card-body">
            <h3 className="card-title">
              <input
                className="form-control"
                value={name}
                onChange={e => this.setState({ name: e.target.value })}
                type="text"
                placeholder="Name"
              />
            </h3>
            <h5 className="card-text">
              <input
                className="form-control"
                value={email}
                onChange={e => this.setState({ email: e.target.value })}
                type="text"
                placeholder="Email"
              />
            </h5>
            {age ? (
              <p>
                {" "}
                age:
                <input
                  className="form-control"
                  value={age}
                  onChange={e => this.setState({ age: e.target.value })}
                  type="text"
                  placeholder="Age"
                />
              </p>
            ) : (
              <p>
                {" "}
                age:{" "}
                <input
                  className="form-control"
                  value={age}
                  onChange={e => this.setState({ age: e.target.value })}
                  type="text"
                  placeholder="Age not provided"
                />{" "}
              </p>
            )}

            <Mutation
              mutation={updateUser}
              variables={{ id, data: { name, age, email } }}
            >
              {UpdateUser => (
                <button
                  className="btn-primary btn-block"
                  onClick={() => {
                    UpdateUser();
                    window.location.reload();
                    this.props.match.history.push("/users");
                  }}
                >
                  Update User
                </button>
              )}
            </Mutation>
          </div>
        </div>
      </div>
    );
  }
}

export default UserDetails;

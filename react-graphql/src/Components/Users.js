import React from 'react'
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'

import { Link } from 'react-router-dom';

import './Users.css'

const createUser = gql`
  mutation CreateUser($name: String!, $email: String!, $age: Int) {
    createUser(name: $name, email: $email, age: $age){
        name
        email
        age
    }
  }
`
const deleteUser = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id){
        name
    }
  }
`

class CreateUser extends React.Component {
    state = {
        name:'',
        email:'',
        age:''
    }
  
    render() {
      const { name, email, age } = this.state
      return (
        <div>
          <div className="flex flex-column mt3">
            <input
              className="form-control"
              value={name}
              onChange={e => this.setState({ name: e.target.value })}
              type="text"
              placeholder="Name"
            />
            <input
              className="form-control"
              value={email}
              onChange={e => this.setState({ email: e.target.value })}
              type="text"
              placeholder="Email"
            />
            <input
              className="form-control"
              value={age}
              onChange={e => this.setState({ age: e.target.value })}
              type="text"
              placeholder="Age"
            />
          </div>
          <Mutation mutation={createUser} variables={{ name,email,age }}>
            {data => <button className="btn-primary btn-block" onClick={ () => {
                data()
                window.location.reload()} }>Create User</button>}
          </Mutation>
        </div>
      )
    }
  }

const User = ({id, name, email, age}) => (
    <div>
        <div className="card">
        <div className="">
            <img className="image" src="http://localhost:3000/avatar.png" alt="Card image cap" />
        </div>
            <div className="card-body">
                <h3 className="card-title">{name}</h3>
                <h5 className="card-text">{email}</h5>
                {age ? <p> age: {age} </p> : <p> age: not provided </p> }
                {/* <a href={"/user/"+ id}>Edit</a> */}
                <Link to={{ pathname: `/user/ + ${id}`, state: { name, age, email, id } }}>Edit</Link>
                
                <Mutation mutation={deleteUser} variables={{ id }}>
                    {data => <button className="delete btn-danger" onClick={()=>{ 
                        data()
                     window.location.reload()} }>X</button>}
                </Mutation>
            </div>
        </div>
    </div>
)

const Users = () => (
    <div>
        {/* <button className="btn btn-primary">Add User</button> */}
        <CreateUser/>
        <Query query={gql`
            {
                users{
                    id
                    name
                    email
                    age
                }
            }   
        `}>
            {({loading, err, data}) => {
                if(loading) return <p>Loading...</p>
                if(err) return <p>Error :( </p>
                console.log(data)
                return data.users.map( ({ id,name,email,age}) => <User key={id} id={id} name={name} email={email} age={age} />
                )
            }}
            
        </Query>
    </div>
)

export default Users
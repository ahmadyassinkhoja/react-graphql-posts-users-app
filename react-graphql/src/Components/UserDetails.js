import React from "react"

import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const updateUser = gql`
  mutation UpdateUser($id: ID!, $data: UpdateUserInput!) {
    updateUser(id: $id, data: $data){
        name
        email
        age
    }
  }
`
const users = []

class UserDetails extends React.Component {
    state = {
        name: this.props.match.location.state.name,
        email: this.props.match.location.state.email,
        id: this.props.match.location.state.id,
        age: this.props.match.location.state.age,
        users: [],
        user: {}
    }
    render(){
        // const user = {}
        // const getUsers = new Promise( (resolve, reject) => {
            let once = true
            let users = this.state.users
            // let user = {}
            
            let { name, email, age, id } = this.state

            // let promise1 = new Promise(  function(resolve, reject) { 
            //     setTimeout(() => resolve(users), 3000)
            //  } );

            // promise1.then( (users) => console.log(users))
            // setTimeout( () => this.state.user = this.state.users.find( (user) => user.id.toString() == user_id.toString())  , 3000)
            // setTimeout( () => console.log(this.state.user) , 3000)
            // setTimeout( () => this.setState({name: this.state.user.name})  , 3000)
            // setTimeout( () => this.setState({age: this.state.user.age})  , 3000)
            // setTimeout( () => this.setState({email: this.state.user.email})  , 3000)
            // once = false
            
            
            // })
            const user_id = this.props.match.match.params.id
            console.log(this.props.match.location.state)
            // let user = this.props.match.location.state
           
        // console.log(this.stateuser, users)
        // this.setState({name: user.name})
        // this.setState({email: user.email})
        // this.setState({age: user.age})
        // this.setState({id: user.id})
        return (
            <div>
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
                this.state.users = data.users
                // this.state.user = data.users.find( (user) => user.id.toString() == user_id.toString())
                // this.setState({name: user.name})
                // this.state
                // let promise1 = new Promise(  function(resolve, reject) { 
                //    resolve(data.users)
                //  } );
                //  promise1
                //  .then( (users) => {
                //     this.state.user = this.state.users.find( (user) => user.id.toString() == user_id.toString())
                //     return this.state.user
                //  })
                //  .then ( (user) => {
                //     console.log(user, this.state.name)
                //     // this.setState({name: user.name})
                //     // this.state.name = user.name
                //     setTimeout( () =>this.state.name = user.name , 1000) 
                //     return user
                //  })
                //  .then ( (user) => {
                //     // console.log(user, this.state.name)
                //     // this.setState({name: user.name})
                //     setTimeout( () =>this.state.email = user.email , 3000) 
                //     return user
                //  })
                //  .then ( (user) => {
                //     // console.log(user, this.state.name)
                //     // this.setState({name: user.name})
                //     setTimeout( () =>this.state.age = user.age , 3000) 
                //     return user
                //  })
                //  .then ( (user) => {
                //     // console.log(user, this.state.name)
                //     // this.setState({name: user.name})
                //     setTimeout( () =>this.state.id = user.id , 3000) 
                //     return user
                //  })


                return <h1>Users Details </h1>
            }}
            
        </Query>

        <div className="card">
            <div className="">
                <img className="image" src="http://localhost:3000/avatar.png" alt="Card image cap" />
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
                    {age ? <p> age:
                            <input
                                className="form-control"
                                value={age}
                                onChange={e => this.setState({ age: e.target.value })}
                                type="text"
                                placeholder="Age"
                            />
                        </p> 
                    : <p> age: <input
                    className="form-control"
                    value={age}
                    onChange={e => this.setState({ age: e.target.value })}
                    type="text"
                    placeholder="Age not provided"
                /> </p> }

                    <Mutation mutation={updateUser} variables={{ id, data:{ name, age, email } }}>
    {UpdateUser => <button className="btn-primary btn-block" onClick={ () => {
     UpdateUser()
     window.location.reload()
     this.props.match.history.push('/users') } }>Update User</button>}
                    </Mutation>
                
                    
                </div>
            </div>
            
        </div>
        )
    }
}

export default UserDetails
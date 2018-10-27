import React, { Component } from 'react';
import './App.css';

import { Switch, Route } from 'react-router-dom'
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'
// import { ApolloProvider } from 'react-apollo'
// import  ApolloClient  from 'apollo-boost'

import Home from './Components/Home'
import Users from './Components/Users'
import Courses from './Courses'
import Posts from './Components/Posts'
import UserDetails from './Components/UserDetails'
import PostDetails from './Components/PostDetails'

// const client = new ApolloClient({
//   // uri: "https://vm8mjvrnv3.lp.gql.zone/graphql"
//   uri: "http://localhost:4000"
// })


class App extends Component {
  state = {
    users: []
  }
  render() {
    return (
      
        <div className="App">
        <Switch>
          <Route exact path='/' component={Home}/>
          {/* both /roster and /roster/:number begin with /roster */}
          <Route path='/users' render={ (match) => 
            <Users
              users={this.state.users}
            />
          }/>
          <Route path='/user/:id' render= { (match) => 
            <UserDetails
              match={match}
            />
          }/>
          <Route path='/post/:id' render= { (match) => 
            <PostDetails
              match={match}
            />
          }/>
          <Route path='/posts' component={Posts}/>
        </Switch>
          {/* <Users/> */}
        </div>
      
    );
  }
}

export default App;

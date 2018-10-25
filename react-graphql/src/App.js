import React, { Component } from 'react';
import './App.css';

import { Switch, Route } from 'react-router-dom'
// import { ApolloProvider } from 'react-apollo'
// import  ApolloClient  from 'apollo-boost'

import Home from './Components/Home'
import Users from './Components/Users'
import Courses from './Courses'
import Posts from './Components/Posts'

// const client = new ApolloClient({
//   // uri: "https://vm8mjvrnv3.lp.gql.zone/graphql"
//   uri: "http://localhost:4000"
// })


class App extends Component {
  render() {
    return (
      
        <div className="App">
        <Switch>
          <Route exact path='/' component={Home}/>
          {/* both /roster and /roster/:number begin with /roster */}
          <Route path='/users' component={Users}/>
          <Route path='/posts' component={Posts}/>
        </Switch>
          {/* <Users/> */}
        </div>
      
    );
  }
}

export default App;

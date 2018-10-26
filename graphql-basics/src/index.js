import { GraphQLServer } from 'graphql-yoga'

import db from './db'
import Query from './resolvers/Query'
import Post from './resolvers/Post'
import User from './resolvers/User'
import Comment from './resolvers/Comment'
import Mutation from './resolvers/Mutation'


const server = new GraphQLServer({
    typeDefs:'./src/schema.graphql',
    resolvers:{
        Query: Query,
        Post: Post,
        User: User,
        Comment: Comment,
        Mutation: Mutation,
    },
    context:{
        db
    }
})

server.start(()=> {
    console.log('The server is up!')
})
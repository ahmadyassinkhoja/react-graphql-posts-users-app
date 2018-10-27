import React from 'react'
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'

import './Posts.css'
import { Link } from 'react-router-dom';


const createPost = gql`
  mutation CreatePost($title: String!, $body: String!, $published: Boolean, $author: ID!) {
    createPost(title: $title, body: $body, published: $published, author: $author){
        title,
        body
    }
  }
`

const deletePost = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id){
        title
    }
  }
`

const Post = ({id, title,body,published, author, comments}) => (
    <div>
        <div className="card">
        <div className="">
            <img className="image" src="http://localhost:3000/post.png" alt="Card image cap" />
        </div>
            <div className="card-body">
                <h3 className="card-title">{title}</h3>
                <h5 className="card-text">{body}</h5>
                <h6 className="card-text">Author: {author.name}</h6>
                {published ? <p> published: {published} </p> : <p> published: not provided </p> }


                {/* <h3>Comments are:</h3>
                { comments.map( (comment) => (
                    <div key={comment.id}>
                        <p>{author.name} commented: {comment.text}</p>
                    </div>
                )) } */}

                <Mutation mutation={deletePost} variables={{ id }}>
                    {data => <button className="delete btn-danger" onClick={()=>{ 
                        data()
                     window.location.reload()} }>X</button>}
                </Mutation>

                <Link to={{ pathname: `/post/ + ${id}`, state: { id, title, body, published, author } }}>Edit</Link>

            </div>
        </div>
    </div>
)

class CreatePost extends React.Component {
    state = {
        title:'',
        body: '',
        published: false,
        author:'',
    }
  
    render() {
      const { title, body, published, author } = this.state
      return (
        <div>
          <div className="flex flex-column mt3">
            <input
              className="form-control"
              value={title}
              onChange={e => this.setState({ title: e.target.value })}
              type="text"
              placeholder="Title"
            />
            <input
              className="form-control"
              value={body}
              onChange={e => this.setState({ body: e.target.value })}
              type="text"
              placeholder="Body"
            />
            <input
              className="form-control"
              value={published}
              onChange={e => this.setState({ published: e.target.value })}
              type="checkbox"
              placeholder="Published"
            />
            <input
              className="form-control"
              value={author}
              onChange={e => this.setState({ author: e.target.value })}
              type="text"
              placeholder="Author"
            />
          </div>
          <Mutation mutation={createPost} variables={{ title, body, published, author }}>
            {data => <button className="btn-primary btn-block" onClick={ () => {data()
            window.location.reload()} }>Create Post</button>}
          </Mutation>
        </div>
      )
    }
  }

const Posts = () => (

    <div>
        <CreatePost/>

        <Query query={gql`
            {
                posts{
                    id
                    title
                    body
                    published
                    author { id name } 
                    comments {
                            id
                            text
                        }
                }
            }   
        `}>
            {({loading, err, data}) => {
                if(loading) return <p>Loading...</p>
                if(err) return <p>Error :( </p>
                console.log(data)
                return data.posts.map( ({ id,title,body,published, author, comments }) => <Post 
                    key={id} 
                    id={id} 
                    title={title}
                    body={body}
                    published={published}
                    author = {author}
                    comments = {comments}
                />
                )
            }}
            
        </Query>
    </div>
)

export default Posts
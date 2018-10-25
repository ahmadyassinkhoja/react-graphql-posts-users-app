import React from 'react'

class Home extends React.Component {
    render(){
        return (
            <div>
                Home Page
                <br/>
                <a href="/users"> Users </a>
                <a href="/posts"> Posts </a>
            </div>
        )
    }
}

export default Home;
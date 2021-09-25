import React, { Component } from 'react'
import api from '../api'
import styled from 'styled-components'

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`

class PostList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: [],
            columns: [],
            isLoading: false
        }
    }
    componentDidMount = async() => {
        this.setState({isLoading: true});
        await api.getAllPosts().then((posts) => {
            this.setState({posts: posts.data.data, isLoading: false});
        })
    }
    render() {
        const { posts, isLoading } = this.state;
//Sorting is the wrong way, sorts from oldest to newest currently.
        return(
            <Wrapper>
                <div>
                {posts.map((post, i) => (
                    <div className="post enabled">
                        <h1 className="post-title" key={i}>{post.title}</h1>
                        <hr className="post-divider"/>
                        <p className="post-summary" key={i}>{post.summary}</p>
                        <p className="post-username" key={i}>{post.user.name}</p>
                        {post.tags.map((post, i) => (<span key={i} className="post-tags">{post}</span>))}
                        <p className="post-date" key={i}>{new Date(post.date).toLocaleString()}</p>
                    </div>
                    )
                )}
                </div>
            </Wrapper>
        )
    }
}

export default PostList;
import React, { Component } from 'react'
import api from '../api'

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
            this.setState({posts: posts.data.data.reverse(), isLoading: false}); //Array.prototype.reverse() doe ik hier met een reden, zonder dit laat hij als eerste de oudste zien en als laatste de nieuwste, dat hoort niet echt bij een blog voor zover ik weet.
        })
    }
    render() {
        const { posts } = this.state;
//Sorting is the wrong way, sorts from oldest to newest currently.
        return(
            <div className="main-content">
                <div className="dash">
                    <p className="post-count">Er zijn {posts.length} totale posts;</p>
                    <a className="add-contextual" href="/post">Post iets</a>
                </div>
                <div className="post-wrapper">
                    {posts.map((post, i) => (
                        <div className="post">
                            <a className="post-link" href={"/post/" + post._id}>
                                <span className="author">
                                    <img className="user-icon" alt="icon"/>
                                    <a href={"/profile/" + post.user.ID} className="user" key={i}>{post.user.name}</a>
                                </span>
                                <span className="content">
                                    <h1 className="header" key={i}>{post.title}</h1>
                                    <h2 className="subtitle" key={i}>{post.summary}</h2>
                                    <p><span className="date" key={i}>{new Date(String(post.updatedAt)).toLocaleString()}  •  <a className="share-button" key={i} onClick={() => {navigator.clipboard.writeText(`${window.location.href}post/${post._id}`)}} href="javascript:void(0)">Share</a></span></p>
                                </span>
                                <span className="post-tags">
                                    {post.tags.map((post, i) => (<a key={i} className="tag">{post}</a>))}
                                </span>
                            </a>
                        </div>
                    ))}
                </div>
                <div className="tags">
                    <p className="post-count tags-list-p">Tags die je volgt:</p>
                    <div className="tag-display"></div>
                </div>
            </div>
        )
    }
}

export default PostList;
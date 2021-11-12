import React, { Component } from "react";
import api from '../api'
import md5Hex from 'md5-hex'
const _ = require("lodash");

class ViewProfile extends Component {
    state = {
        allPosts: [],
        username: ""
    };

    componentDidMount() {
        api.getAllPostsByUser(_.get(this.props, "match.params.id")).then((res) => {
            this.setState({allPosts: res.data["data"]});
        });
        api.getUserByID(_.get(this.props, "match.params.id")).then((res) => {
            this.setState({username: res.data["data"]["username"]})
        })
    }

    Settings(props) {
        if (localStorage.getItem("User-ID") === _.get(props, "match.params.id")) {
            return(
                <div className="settings"></div>
            )
        } else return(null)
    }

    render() {
        return(
            <>
                <div className="main-content">
                    <this.Settings/>
                    <h1 className="post-title">{this.state.username}'s posts:</h1>
                    <div className="posts">{this.state.allPosts.map((post, i) => (
                        <div className="post-2">
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
                    ))}</div>
                </div>
            </>
        )
    }
}

export default ViewProfile;
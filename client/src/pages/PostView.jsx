import React, { Component } from "react";
import {withRouter} from "react-router-dom";
import api from '../api'
const _ = require("lodash");

class PostView extends Component {
    state = {post: {}}
    componentDidMount = () => {
        const ID = _.get(this.props, "match.params.id")
        this.fetchPostsById(ID);
    }
    fetchPostsById = async(id) => {
        const { data: post } = await api.getPostByID(id)
        this.setState({ post: post.data });
    }
    render() {
        const {post={}} = this.state;
        return(
            <div className="main-content">
                <h1 className="post-title">{post.title}</h1>
                <hr className="post-line"/>
                <div className="post-content" dangerouslySetInnerHTML={{__html: post.content}}></div>
            </div>
        )
    }
}

export default withRouter(PostView);
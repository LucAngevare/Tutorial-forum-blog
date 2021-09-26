import React, { Component } from 'react';
import { PostList, PostInsert, PostUpdate } from '../pages'

class home extends Component {
    render() {
        return(
            <div>
                <PostList/>
            </div>
        )
    }
}

export default home;
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Links extends Component {
    render() {
        return (
            <div>
                <a href="/" className="navbar-brand">
                    Tutorial blogs
                </a>
                <div className="link">
                    <ul>
                        <li>
                            <a href="/posts/list" className="nav-link">
                                List Tutorials
                            </a>
                        </li>
                        <li>
                            <a href="/posts/create" className="nav-link">
                                Post something []
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}
//TODO: Better name
//TODO: Dynamically add all posts to homepage, list link to popular, searchbar
//TODO: Random post something adjective
export default Links
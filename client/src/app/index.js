import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { NavBar } from '../components'
import { PostList, PostInsert, PostUpdate } from '../pages'

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    return (
        <Router>
            <NavBar />
            <Switch>
                <Route path="/posts/list" exact component={PostList}/>
                <Route path="/posts/create" exact component={PostInsert}/>
                <Route path="/posts/update/:id" exact component={PostUpdate}/>
            </Switch>
        </Router>
    )
}

export default App
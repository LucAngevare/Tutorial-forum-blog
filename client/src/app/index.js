import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { PostList, PostInsert, PostUpdate, PostView } from '../pages'
import { NavBar } from '../components'

function App() {
    return (
        <Router>
            <NavBar/>
            <Switch>
                <Route path="/posts/list" exact component={PostList}/>
                <Route path="/posts/create" exact component={PostInsert}/>
                <Route exact path="/post/:id" exact component={PostView}/>
                <Route path="/posts/update/:id" exact component={PostUpdate}/>
            </Switch>
        </Router>
    )
}

export default App
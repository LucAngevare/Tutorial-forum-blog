import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { PostList, PostUpdate, PostView, Post, Profile, Signup, ViewProfile } from '../pages'
import { NavBar } from '../components'

function App() {
    function waaromDoeIkDit() {
        if (!localStorage.getItem("User-ID")) localStorage.setItem("User-ID", null)
    }
    return (
        <>{waaromDoeIkDit()}
            <Router>
                <NavBar/>
                <Switch>
                    <Route exact path="/" component={PostList}/>
                    <Route exact path="/post/:id" component={PostView}/>
                    <Route exact path="/posts/update/:id" component={PostUpdate}/>
                    <Route exact path="/post" component={Post}/>
                    <Route exact path="/profile/null" component={Profile}/>
                    <Route exact path="/profile/:id" component={ViewProfile}/>
                    <Route exact path="/signup" component={Signup}/>
                </Switch>
            </Router>
        </>
    )
}

export default App;
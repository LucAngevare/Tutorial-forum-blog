import React, { Component } from "react";
import { Redirect } from 'react-router-dom'
import api from '../api'

class Post extends Component {
    state = {
        charactersLeft: 0
    };
    constructor(props) {
        super(props);
        this.title = React.createRef();
        this.markdown_content = React.createRef();
        this.tags = React.createRef();
        this.postContent = this.postContent.bind(this)
    }

    chchchchchchchanges = (event) => {
        const charsTyped = String(this.markdown_content.current.value).length;
        const maxChars = Number(this.markdown_content.current.maxLength);

        this.setState({charactersLeft: (Number(maxChars) - charsTyped)});
    }

    postContent = async (event) => {
        event.preventDefault();
        var username = ""; var ID = "";
        api.getUserByID(localStorage.getItem("User-ID")).then((res) => {
            username = res.data["data"]["username"] //Using half point- and half bracketsyntax so it's easier readable, res.data just declares all the data from the actual API, the bracket syntax is all from the API itself.
            ID = res.data["data"]["ID"] //Just to make sure they're one and the same
        })
        api.insertPost({
            title: this.title.current.value,
            date: Date.now(),
            user: {
                name: username,
                ID: ID
            },
            content: this.markdown_content.current.value,
            summary: `${this.markdown_content.current.value.replace(/[#*[\]_]|(\\n)|[\r\t\n]/g).match(/^.{60}\w*/) ?? this.markdown_content.current.value.replace(/[#*[\]_]|(\\n)|[\r\t\n]/g)}...`, //Makkelijkste manier om de dichtstbijzijnde spatie te vinden gegeven een maximale grootte. In dit geval mocht de grootte niet boven de 60 woorden komen (omdat dat 1 regel is - 3 zo ongeveer)
            tags: this.tags.current.value.split(", ")
        }).then(apiRes => {
            window.location = `/post/${apiRes.data["id"]}`;
        })
    }
    render() {
        return(
            <div className="main-content">
                <h1 className="post-title">Post iets</h1>
                <div className="post-form">
                    <form id="postForm" onSubmit={this.postContent}>
                        <label className="title-label" for="title">Titel</label><br/>
                        <p className="explanation">Wees kort, maar krachtig. Je hebt maximaal 46 karakters voor een titel!</p>
                        <input type="text" id="title" name="title" placeholder="Jouw creatieve titel!" maxLength="46" ref={this.title}/><input className="submit" type="submit" value="Post!" ref="submitButton"/>
                    </form>
                    <label className="markdown-label" for="markdown-input">Inhoud</label><br/>
                    <p className="explanation">Je hebt {this.state.charactersLeft} tekens om iets te beschrijven. Maak gebruik van GitHub-flavoured markdown om je post op te maken!</p><br/>
                    <textarea name="markdown-content" id="markdown-input" onKeyPress={this.chchchchchchchanges} onKeyDown={this.chchchchchchchanges} onKeyUp={this.chchchchchchchanges} onPaste={this.chchchchchchchanges} className="markdown-input" form="postForm" maxLength="5000" placeholder="Voeg jouw markdown text hier toe!" ref={this.markdown_content}/>
                    <label for="tags" className="tags-label">Tags</label><br/>
                    <p className="explanation">Verzin wat tags om mensen te helpen jouw post te vinden. Scheid ze door een komma en een spatie.</p><br/>
                    <input type="text" id="tags" placeholder="Jouw tags, gescheiden door komma's" ref={this.tags}/>
                </div>
            </div>
        )
    }
}

export default Post;
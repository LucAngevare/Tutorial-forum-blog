import React, { Component } from "react";
import api from '../api'
import md5Hex from 'md5-hex'

class Profile extends Component {
    state = {
        errorMessages: [],
        usernames: []
    }

    componentWillMount() {
        api.getAllUsers().then((res) => {
            console.log(res["data"])
            var usernameArr = []
            res["data"]["data"].forEach((element) => usernameArr.push(element["username"]));
            this.setState({ usernames: usernameArr })
        }).then(console.log(this.state))
    }

    constructor(props) {
        super(props);
        this.username = React.createRef();
        this.password = React.createRef();
        this.email = React.createRef();
        this.signUp = this.signUp.bind(this);
    }

    checkEmpty() {
        return (
            !this.username.current.value.length ||
            !this.password.current.value.length ||
            !this.email.current.value.length
        )
    }

    signUp = (event) => {
        event.preventDefault();
        console.log(this.state.errorMessages)
        if ((this.state.errorMessages.length !== 0) || (!this.checkEmpty)) return window.alert("Voldoe alstublieft aan de voorwaarden")
        api.signUp({
            username: this.username.current.value,
            password: md5Hex(this.password.current.value),
            email: this.email.current.value
        }).then((res) => {
            localStorage.setItem("User-ID", res["ID"]);
        })
    }

    emailChange = (event) => {
        const reg = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/g)
        if (!reg.test(this.email.current.value)) {
            if (this.state.errorMessages.includes("Het ingevoerde e-mail-adres is incorrect")) return;
            const copyState = this.state["errorMessages"];
            copyState.push("Het ingevoerde e-mail-adres is incorrect");
            this.setState({ errorMessages: copyState });
        } else {
            if (this.state.errorMessages.includes("Het ingevoerde e-mail-adres is incorrect")) {
                const copyState = this.state["errorMessages"]
                copyState.splice(copyState.indexOf("Het ingevoerde e-mail-adres is incorrect"), 1);
                this.setState({ errorMessages: copyState })
            }
        }
    }

    passwordChange = (event) => {
        if (this.password.current.value.length < 8) {
            if (this.state.errorMessages.includes("Het wachtwoord moet uit 8 karakters of meer bestaan")) return;
            const copyState = this.state["errorMessages"];
            copyState.push("Het wachtwoord moet uit 8 karakters of meer bestaan");
            this.setState({ errorMessages: copyState });
        } else {
            if (this.state.errorMessages.includes("Het wachtwoord moet uit 8 karakters of meer bestaan")) {
                const copyState = this.state["errorMessages"]
                copyState.splice(copyState.indexOf("Het wachtwoord moet uit 8 karakters of meer bestaan"), 1);
                this.setState({ errorMessages: copyState })
            }
        }
    }

    usernameChange = (event) => {
        const copyState = this.state.usernames;
        if (copyState.indexOf(this.username.current.value) === -1) {
            if (this.state.errorMessages.includes("De gebruikersnaam die u heeft ingevoerd bestaat al")) return;
            const copyState = this.state["errorMessages"];
            copyState.push("De gebruikersnaam die u heeft ingevoerd bestaat al");
            this.setState({ errorMessages: copyState });
        } else {
            if (this.state.errorMessages.includes("De gebruikersnaam die u heeft ingevoerd bestaat al")) {
                const copyState = this.state["errorMessages"]
                copyState.splice(copyState.indexOf("De gebruikersnaam die u heeft ingevoerd bestaat al"), 1);
                this.setState({ errorMessages: copyState })
            }
        } //hahhaa fuck
    }

    render() {
        return(
            <>
                <div className="main-content">
                    <h1 className="post-title">Activeer uw account:</h1>
                    <div className="post-form">
                        <form id="postForm" onSubmit={this.signUp}>
                            <input className="profile-details username" type="text" ref={this.username} onKeyDown={this.usernameChange} placeholder="Voer uw gebruikersnaam in"/><br/>
                            <input className="profile-details email" type="text" ref={this.email} onKeyUp={this.emailChange} placeholder="Voer uw e-mail-adres in"/><br/>
                            <input className="profile-details password" type="password" ref={this.password} onKeyUp={this.passwordChange} placeholder="Uw wachtwoord"/><br/>
                            <input className="profile-details login" type="submit" value="Activeer uw account"/><br></br>
                        </form>
                        <p className="error-text" dangerouslySetInnerHTML={{__html: this.state.errorMessages.join("<br>")}}></p>
                    </div>
                </div>
            </>
        )
    }
}

export default Profile;
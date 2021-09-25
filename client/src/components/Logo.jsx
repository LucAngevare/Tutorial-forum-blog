import React, { Component } from 'react'
import styled from 'styled-components'

import logo from '../logo.svg'

const Wrapper = styled.a.attrs({
    className: 'navbar-brand',
})``

class Logo extends Component {
    render() {
        return (
            <Wrapper href="https://blog.lucangevare.nl">
                <img src={logo} width="50" height="50" alt="blog.lucangevare.nl" />
            </Wrapper>
        )
    }
}

export default Logo

//TODO: Create and upload .svg (own?) and come up with a better name for the alt
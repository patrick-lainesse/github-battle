/* Render props version to abstract the hovering mechanism, replaces withHover (see Git history) */

import React from 'react'

export default class Hover extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hovering: false
        }

        this.mouseOver = this.mouseOver.bind(this)
        this.mouseOut = this.mouseOut.bind(this)
    }

    mouseOver() {
        this.setState({
            hovering: true
        })
    }

    mouseOut() {
        this.setState({
            hovering: false
        })
    }

    // We aren't passing props to Hover, but children
    render() {
        return (
            <div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
                {this.props.children(this.state.hovering)}
            </div>
        )
    }
}
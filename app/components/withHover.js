import React from 'react'

// A function that takes a Component as its argument and returns another Component
export default function withHover(Component, propName = 'hovering') {
    return class WithHover extends React.Component {
        /* Whatever props are being passed to Tooltip are also passed here, but these are never passed
        through the Tooltip component. See in the Component tag below for solution to pass props */
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

        render() {
            const props = {
                [propName]: this.state.hovering,
                ...this.props
            }
            return(
                <div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
                    <Component {...props}/>
                    {/*<Component hovering={this.state.hovering} {...this.props}/>*/}
                </div>
            )
        }
    }
}
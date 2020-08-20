import React from 'react'
import PropTypes from 'prop-types'
import Hover from './Hover'

// Styles aren't in index.css so this Component can be reusable, we could put it on npm and use it as is
const styles = {
    container: {
        position: 'relative',
        display: 'flex'
    },
    tooltip: {
        boxSizing: 'border-box',
        position: 'absolute',
        width: '160px',
        bottom: '100%',
        left: '50%',
        marginLeft: '-80px',
        borderRadius: '3px',
        backgroundColor: 'hsla(0, 0%, 20%, 0.9)',
        padding: '7px',
        marginBottom: '5px',
        color: '#fff',
        textAlign: 'center',
        fontSize: '14px',
    }
}

// With render props, we no longer pass the props to the Hover Component, instead, it's Tooltip that is being rendered
export default function Tooltip({text, children}) {
    return (
        <Hover>
            {/*Props rendering avoids the naming collision, as we can name our argument the way we want*/}
            {(hovering) => (
                <div style={styles.container}>
                    {hovering === true && <div style={styles.tooltip}>{text}</div>}
                    {children}
                </div>
            )}
        </Hover>
    )
}

Tooltip.propTypes = {
    text: PropTypes.string.isRequired
}
import React from 'react'
import PropTypes from 'prop-types'
import withHover from './withHover'

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

function Tooltip({text, children, hovering}) {
    return (
        <div style={styles.container}>
            {hovering === true && <div style={styles.tooltip}>{text}</div>}
            {children}
        </div>
    )
}

Tooltip.propTypes = {
    text: PropTypes.string.isRequired,
    hovering: PropTypes.bool.isRequired
}

/* Adding a second parameter allows customized naming of the hovering property, in case a user of this Component already
has a hovering property on his Component and wants to avoid a name collision. */
export default withHover(Tooltip)
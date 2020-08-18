import React from 'react'
import PropTypes from 'prop-types'
import {fetchPopularRepos} from "../utils/api";

function LanguagesNav({selected, onUpdateLanguage}) {

    const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python']

    return (
        // className is used instead of class since class is reserved for JavaScript (export default class...)
        <ul className='flex-center'>
            {languages.map((language) => (
                <li key={language}>
                    <button
                        className='btn-clear nav-link'
                        style={language === selected ? {color: 'rgb(187, 46, 31)'} : null}
                        onClick={() => onUpdateLanguage(language)}>
                        {language}
                    </button>
                </li>
            ))}
        </ul>
    )
}

LanguagesNav.propTypes = {
    selected: PropTypes.string.isRequired,
    onUpdateLanguage: PropTypes.func.isRequired
}

export default class Popular extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedLanguage: 'All',
            repos: {},
            error: null
        }

        this.updateLanguage = this.updateLanguage.bind(this)
        this.isLoading = this.isLoading.bind(this)
    }

    componentDidMount() {
        this.updateLanguage(this.state.selectedLanguage)
    }

    updateLanguage(selectedLanguage) {
        this.setState({
            selectedLanguage,
            error: null,
        })

        // Fetch repos only if they do not alreay exist in our state object
        if (!this.state.repos[selectedLanguage]) {
            fetchPopularRepos(selectedLanguage)
                .then((data) => {
                    // we don't want to replace the repos in the state, we want to add properties to this state object
                    this.setState(({repos}) => ({
                        repos: {
                            repos,
                            [selectedLanguage]: data
                        }
                    }))
                })
                // Catching the error at the UI level
                .catch(() => {
                    console.warn('Error fetching repos: ', error)

                    this.setState({
                        error: 'There was an error fetching the repositories.'
                    })
                })
        }
    }

    isLoading() {
        const {selectedLanguage, repos, error} = this.state

        // Loading only if we do not already have the data for the selected language in our state object
        return  !repos[selectedLanguage] && error === null
    }

    render() {
        const {selectedLanguage, repos, error} = this.state

        return (
            <React.Fragment>
                <LanguagesNav
                    selected={selectedLanguage}
                    onUpdateLanguage={this.updateLanguage}
                />

                {/*If isLoading, show paragraph*/}
                {this.isLoading() && <p>LOADING</p>}

                {error && <p>{error}</p>}

                {/*Display fetched repos without styling them, only if selected language is a thing in repos*/}
                {repos[selectedLanguage] && <pre>{JSON.stringify(repos[selectedLanguage], null, 2)}</pre>}
            </React.Fragment>
        )
    }
}
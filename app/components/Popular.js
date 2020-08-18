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
            repos: null,
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
            repos: null
            /* If both error and repos are null, this means we are loading repositories.
               We could have added a "loading" variable which would be true when error and repos are null, but it isn't
               advised by Tyler to add state components when it's possible to work without it. See isLoading() below */
        })

        fetchPopularRepos(selectedLanguage)
            .then((repos) => this.setState({
                repos,
                error: null
            }))
            // Catching the error at the UI level
            .catch(() => {
                console.warn('Error fetching repos: ', error)

                this.setState({
                    error: 'There was an error fetching the repositories.'
                })
            })
    }

    isLoading() {
        return this.state.repos === null && this.state.error === null
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

                {/*Display fetched repos without styling them*/}
                {repos && <pre>{JSON.stringify(repos, null, 2)}</pre>}
            </React.Fragment>
        )
    }
}
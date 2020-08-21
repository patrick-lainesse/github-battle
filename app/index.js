import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import {ThemeProvider} from './contexts/theme'
import Nav from './components/Nav'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Loading from './components/Loading'

/* Makes sure we don't import our components until they are needed for rendering.
   React.lazy renders a dynamic import as a regular component. */
const Popular = React.lazy(() => import('./components/Popular'))
const Battle = React.lazy(() => import('./components/Battle'))
const Results = React.lazy(() => import('./components/Results'))

class App extends React.Component {
    state = {
        theme: 'light',
        toggleTheme: () => {
            this.setState(({theme}) => ({
                theme: theme === 'light' ? 'dark' : 'light'
            }))
        }
    }

    render() {
        return (
            <Router>
                <ThemeProvider value={this.state}>
                    {/*div with a classname of light or dark*/}
                    <div className={this.state.theme}>
                        <div className='container'>
                            <Nav/>

                            {/*Suspense fallback will show this if one of our component takes too long to load*/}
                            <React.Suspense fallback={<Loading/>}>
                                {/*Switch is used so that only the first route that matches is rendered*/}
                                <Switch>
                                    <Route exact path='/' component={Popular}/>
                                    <Route exact path='/battle' component={Battle}/>
                                    <Route path='/battle/results' component={Results}/>
                                    {/*Route without path that will always match if none of the above matched, rendered inline JSX*/}
                                    <Route render={() => <h1>404</h1>}/>
                                </Switch>
                            </React.Suspense>
                        </div>
                    </div>
                </ThemeProvider>
            </Router>
        )
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('app')
)
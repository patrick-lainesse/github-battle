import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Popular from './components/Popular';
import Battle from './components/Battle'
import Results from "./components/Results";
import {ThemeProvider} from "./contexts/theme";
import Nav from './components/Nav'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

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

                            {/*Switch is used so that only the first route that matches is rendered*/}
                            <Switch>
                                <Route exact path='/' component={Popular}/>
                                <Route exact path='/battle' component={Battle}/>
                                <Route path='/battle/results' component={Results}/>
                                {/*Route without path that will always match if none of the above matched, rendered inline JSX*/}
                                <Route render={() => <h1>404</h1>}/>
                            </Switch>
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
import React from 'react'
import {battle} from '../utils/api'
import {FaCompass, FaBriefcase, FaUsers, FaUserFriends, FaCode, FaUser} from "react-icons/fa";
import Card from './Card'
import PropTypes from 'prop-types'
import Loading from "./Loading";
import Tooltip from './Tooltip'
import queryString from 'query-string'
import {Link} from 'react-router-dom'

class ProfileList extends React.Component {
    render() {
        const {profile} = this.props

        return (
            <ul className='card-list'>
                <li>
                    <FaUser color='rgb(239, 115, 115)' size={22}/>
                    {profile.name}
                </li>
                {profile.location && (
                    <li>
                        <Tooltip text="User's location">
                            <FaCompass color='rgb(144, 115, 255)' size={22}/>
                            {profile.location}
                        </Tooltip>
                    </li>
                )}
                {profile.company && (
                    <li>
                        <Tooltip text="User's company">
                            <FaBriefcase color='#795548' size={22}/>
                            {profile.company}
                        </Tooltip>
                    </li>
                )}
                <li>
                    <FaUsers color='rgb(129, 195, 245)' size={22}/>
                    {profile.followers.toLocaleString()} followers
                </li>
                <li>
                    <FaUserFriends color='rgb(64, 195, 183)' size={22}/>
                    {profile.following.toLocaleString()} following
                </li>
            </ul>
        )
    }
}

ProfileList.protoType = {
    profile: PropTypes.object.isRequired
}

export default class Results extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            winner: null,
            loser: null,
            error: null,
            loading: true
        }
    }

    componentDidMount() {
        /* Using query-string npm module to fetch the query string passed by the battle component. Used debugger and
           logged this.props in the console to get this.props.location.search */
        const {playerOne, playerTwo} = queryString.parse(this.props.location.search)

        battle([playerOne, playerTwo])
            .then((players) => {
                this.setState({
                    winner: players[0],
                    loser: players[1],
                    error: null,
                    loading: false
                })
                // notify the user in the ui layer for error messages generated in api.js
            }).catch(({message}) => {
            this.setState({
                error: message,
                loading: false
            })
        })
    }

    render() {
        const {winner, loser, error, loading} = this.state

        if (loading === true) {
            return <Loading/>
        }

        if (error) {
            return (
                <p className='center-text error'>{error}</p>
            )
        }
        return (
            <React.Fragment>
                <div className='grid space-around container-sm'>
                    <Card
                        href={winner.profile.html_url}
                        avatar={winner.profile.avatar_url}
                        name={winner.profile.login}
                        header={winner.score === loser.score ? 'Tie' : 'Winner'}
                        subheader={`Score: ${winner.score.toLocaleString()}`}
                    >
                        <ProfileList profile={winner.profile}/>
                    </Card>
                    <Card
                        href={loser.profile.html_url}
                        avatar={loser.profile.avatar_url}
                        name={loser.profile.login}
                        header={winner.score === loser.score ? 'Tie' : 'Loser'}
                        subheader={`Score: ${loser.score.toLocaleString()}`}
                    >
                        <ProfileList profile={loser.profile}/>
                    </Card>
                </div>
                <Link
                    to='/battle'
                    className='btn dark-btn btn-space'>
                    Reset
                </Link>
            </React.Fragment>
        )
    }
}
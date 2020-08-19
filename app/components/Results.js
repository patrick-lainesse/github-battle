import React from 'react'
import {battle} from '../utils/api'
import {FaCompass, FaBriefcase, FaUsers, FaUserFriends, FaCode, FaUser} from "react-icons/fa";
import Card from './Card'
import PropTypes from 'prop-types'

function ProfileList({profile}) {
    return (
        <ul className='card-list'>
            <li>
                <FaUser color='rgb(239, 115, 115)' size={22}/>
                {profile.name}
            </li>
            {profile.location && (
                <li>
                    <FaCompass color='rgb(144, 115, 255)' size={22}/>
                    {profile.location}
                </li>
            )}
            {profile.company && (
                <li>
                    <FaBriefcase color='#795548' size={22}/>
                    {profile.company}
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
        const {playerOne, playerTwo} = this.props

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
            return <p>LOADING</p>
        }

        if (error) {
            return (
                <p className='center-text error'>{error}</p>
            )
        }
        return (
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
        )
    }
}
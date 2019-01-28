import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard'

class App extends Component {
	componentDidMount(){
		this.props.dispatch(handleInitialData())
	}
	render() {
		return (
		  <div>
		  	{this.props.loading === true 
		  		? null 
		  		: <Dashboard/>}

		  </div>
		)
	}
}

function mapStateToProps ({authedUser}) {
	return {
		loading: authedUser === null
	}

}

// first  arg can be empty because we dont need anything from state
export default connect(mapStateToProps)(App)
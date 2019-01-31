import React, { Component } from "react"
import { connect } from "react-redux"
import { handleAddTweet } from "../actions/tweets"
import { Redirect } from "react-router-dom"

export class NewTweet extends Component {
	state = {
		text: "",
		toHome: false
	}

	handleChange = (e) => {
		const text = e.target.value

		this.setState(() => ({
			text
		}))
	}

	handleSubmit = (e) => {
		e.preventDefault()

		const { text } = this.state

		// id will be in props only when we're replying to another tweet
		// if id is null, we're composing a new tweet
		const { dispatch, id } = this.props

		dispatch(handleAddTweet(text, id))

		this.setState(() => ({
			text: "",
			toHome: id ? false : true
		}))
	}

	render() {
		const { text, toHome } = this.state

		// why do we redirect like this? Couldnt we do it in the handleSubmit?
		if (toHome) {
			return <Redirect to="/" />
		}

		const tweetLeft = 280 - text.length
		return (
			<div>
				<h3 className="center">Compose New Tweet</h3>
				<form className="new-tweet" onSubmit={this.handleSubmit}>
					<textarea
						className="textarea"
						placeholder="What's happening?"
						max-length={280}
						value={text}
						onChange={this.handleChange}
					/>
					{tweetLeft <= 100 && (
						<div className="tweet-length">{tweetLeft}</div>
					)}
					<button
						className="btn"
						type="submit"
						disabled={text === ""}
					>
						Submit
					</button>
				</form>
			</div>
		)
	}
}

export default connect()(NewTweet)

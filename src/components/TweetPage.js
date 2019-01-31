import React from "react"
import { connect } from "react-redux"
import Tweet from "./Tweet"
import NewTweet from "./NewTweet"

function mapStateToProps({ authedUSer, tweets, users }, props) {
	const { id } = props.match.params
	return {
		id,
		replies: !tweets[id]
			? []
			: tweets[id].replies.sort(
					(a, b) => tweets[b].timestamp - tweets[a].timestamp
			  )
	}
}

export class TweetPage extends React.Component {
	static propTypes = {
		//
	}

	constructor(props) {
		super(props)
	}

	render() {
		const { id, replies } = this.props
		console.log(id)
		return (
			<div>
				<Tweet id={id} />
				{/*passing in id here because this is the replyingTo id*/}
				<NewTweet id={id} />
				{replies.length !== 0 && <h3 className="center">Replies</h3>}
				<ul>
					{replies.map((replyId) => (
						<li key={replyId}>
							{" "}
							<Tweet id={replyId} />
						</li>
					))}
				</ul>
			</div>
		)
	}
}

export default connect(mapStateToProps)(TweetPage)

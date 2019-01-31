import { RECEIVE_TWEETS, TOGGLE_TWEET, ADD_TWEET } from "../actions/tweets"

export default function tweets(state = {}, action) {
	switch (action.type) {
		case RECEIVE_TWEETS:
			return {
				...state,
				...action.tweets
			}
		case TOGGLE_TWEET:
			return {
				// spread the former state
				...state,
				// take the tweet id and recreate new object.
				[action.id]: {
					//spread the old object's info
					...state[action.id],
					// the likes property on this object will be
					likes:
						// if the action is hasLiked
						action.hasLiked === true
							? // then remove it from the likes array (because we're toggling)
							  state[action.id].likes.filter(
									(uid) => uid !== action.authedUser
							  )
							: // if they haven't liked it, then concat the authedUser onto the likes array
							  state[action.id].likes.concat([action.authedUser])
				}
			}
		case ADD_TWEET:
			const { tweet } = action

			let replyingTo = {}

			// if we're replying to someone
			if (tweet.replyingTo !== null) {
				// make a new object
				replyingTo = {
					// key with replyingTo id
					[tweet.replyingTo]: {
						// keep all the old properties on that tweet
						...state[tweet.replyingTo],
						// but add the new tweet we just created to the list of tweets that have replied to this tweet
						replies: state[tweet.replyingTo].replies.concat([
							tweet.id
						])
					}
				}
			}

			return {
				...state,
				// add the tweet to the list of all tweets
				[action.tweet.id]: action.tweet,
				// spread this object (like a sub action),
				// onto state, which will update the specific part of the state (the replies on the other tweet)
				...replyingTo
			}

		default:
			return state
	}
}

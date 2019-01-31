import { RECEIVE_TWEETS, TOGGLE_TWEET } from "../actions/tweets";

export default function tweets(state = {}, action) {
	switch (action.type) {
		case RECEIVE_TWEETS:
			return {
				...state,
				...action.tweets
			};
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
									uid => uid !== action.authedUser
							  )
							: // if they haven't liked it, then concat the authedUser onto the likes array
							  state[action.id].likesw.concat([
									action.authedUser
							  ])
				}
			};
		default:
			return state;
	}
}

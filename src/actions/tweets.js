import { saveLikeToggle } from "../utils/api";

export const RECEIVE_TWEETS = "RECEIVE_TWEETS";
export const TOGGLE_TWEET = "TOGGLE_TWEET";

export const receiveTweets = tweets => {
	return {
		type: RECEIVE_TWEETS,
		tweets
	};
};

const toggleTweet = ({ id, authedUser, hasLiked }) => {
	return {
		type: TOGGLE_TWEET,
		id,
		authedUser,
		hasLiked
	};
};

export function handleToggleTweet(info) {
	return dispatch => {
		// optimistic update
		dispatch(toggleTweet(info));

		return saveLikeToggle(info).catch(e => {
			console.warn(`Error in handleToggleTweet: ${e}`);
			// reset it to initial
			dispatch(toggleTweet(info));
			alert(`There was an error liking the tweet, try again`);
		});
	};
}

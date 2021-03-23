import * as ActionTypes from './ActionTypes';

export const comments = (state = { errMess: null, comments:[]}, action) => {
  switch (action.type) {
    case ActionTypes.ADD_COMMENTS:
      return {...state, errMess: null, comments: action.payload};

    case ActionTypes.COMMENTS_FAILED:
      return {...state, errMess: action.payload};

      case ActionTypes.ADD_COMMENT:
        var comment = action.payload;
        return { ...state, comments: state.comments.concat(comment)};

        // case ActionTypes.ADD_COMMENT:
        //   var newComment = {
        //       id: state.comments.length,
        //       dishId: action.payload.dishId,
        //       rating: action.payload.rating,
        //       comment: action.payload.comment,
        //       author: action.payload.author,
        //       date: new Date().toISOString()
        //   };
        //   return {...state, errMess: null, comments: state.comments.concat(newComment)};

    default:
      return state;
  }
};
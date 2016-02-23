import { SET_CURRENT_PROGRAM_NAME, CHANGE_CURRENT_PROGRAM_PARAMETER, LOAD_CURRENT_PROGRAM } from 'actions/actions'

const initialState = {
  name: "",
  data: []
};


export default function currentProgram(state = initialState, action) {

  switch (action.type) {
    case SET_CURRENT_PROGRAM_NAME:
      return Object.assign({}, state,
        {
          name: action.payload.name,
        }
      );

    case CHANGE_CURRENT_PROGRAM_PARAMETER:
      return Object.assign({}, state,
        {
          data: [
            ...state.data.slice(0, action.payload.index),
            ...action.payload.values,
            ...state.data.slice(action.payload.index + action.payload.values.length)
          ]
        }
      );

    case LOAD_CURRENT_PROGRAM:
      return {
        name: action.payload.name,
        data: action.payload.data
      };

    default:
      return state
  }

  return state;
};

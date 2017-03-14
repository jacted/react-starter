let initialState = {
  user: {},
  isAuthed: false
}

const auth = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: (action.user !== false) ? action.user : {},
        isAuthed: (action.user !== false)
      }
    default:
      return state
  }
}


export default auth
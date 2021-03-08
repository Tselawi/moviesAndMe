function reducerProfil(state, action) {

  let nextState

  switch (action.type) {
    case 'ADD_PROFIL':
      nextState = {
        ...state,
        profile: action.value /* On a bien respecté le principe d'immuable
         puisque l'on n'a pas modifié directement le state */
      }
      return nextState
    case 'UPDATE_PROFIL':
    nextState= {
      ...state,
      profile: action.value
    }
      return nextState
    case 'DELETE_PROFIL':

      return nextState
    default:
      return state

  }
}

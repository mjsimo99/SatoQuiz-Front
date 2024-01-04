import { Action } from "@ngrx/store"

let initialState = {
    n: 0,
}

export function conterReducer(state = initialState, action: Action) {
    switch (action.type) {
        case 'increment':
            return {
                ...state,
                n: state.n + 1,
            }
        case 'decrement':
            return {
                ...state,
                n: state.n - 1,
            }
        default:
            return state
    }
}
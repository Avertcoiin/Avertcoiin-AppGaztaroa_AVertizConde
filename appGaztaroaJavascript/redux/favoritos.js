import * as ActionTypes from './ActionTypes';

export const favoritos = (state = { favoritos: [] }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_FAVORITO:
            if (state.favoritos.includes(action.payload)) { // Si ya está, devuelve el estado sin cambios
                return state;
            }
            return { // Si no está, añade la excursión a la lista de favoritos
                ...state, favoritos: state.favoritos.concat(action.payload),
            };

        default:
            return state;
    }
};

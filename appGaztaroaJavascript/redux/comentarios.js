import * as ActionTypes from './ActionTypes';

export const comentarios = (state = { errMess: null, comentarios: [] }, action) => {
  switch (action.type) {
    case ActionTypes.ADD_COMENTARIOS:
      return { ...state, errMess: null, comentarios: action.payload };

    case ActionTypes.COMENTARIOS_FAILED:
      return { ...state, errMess: action.payload };

    case ActionTypes.ADD_COMENTARIO:
      // Filtramos solo los IDs válidos y numéricos
      const idsValidos = state.comentarios
        .map((c) => c.id)
        .filter((id) => Number.isFinite(id));

      // Calculamos el nuevo ID
      const nuevoId = idsValidos.length > 0 ? Math.max(...idsValidos) + 1 : 0;

      // Creamos el nuevo comentario con ID generado
      const comentario = {
        ...action.payload,
        id: nuevoId,
      };
      
      return { ...state, comentarios: state.comentarios.concat(comentario) };

    default:
      return state;
  }
};

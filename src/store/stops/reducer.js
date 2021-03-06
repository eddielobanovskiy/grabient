import {
  EDIT_STOP,
  EDIT_STOP_COLOR,
  SWAP_STOP_COLORS,
  UPDATE_DRAGGED_STOP_POS,
  UPDATE_UPDATING_STOP,
  TOGGLE_ACTIVE_COLOR_PICKER,
  UPDATE_STOP_COLOR,
  UPDATE_ACTIVE_STOP,
  DELETE_ACTIVE_STOP,
  ADD_COLOR_STOP,
  RESET_COLOR_STOP
} from './actions'

export const INITIAL_STATE = {
  values: {
    '2a': {
      '0': '#e0c3fc',
      '50': '#8ec5fc',
      '90': '#43e97b'
    },
    '1a': {
      '0': '#fad0c4',
      '100': '#d1ffe7'
    },
    '4a': {
      '9': '#ffffff',
      '70': '#c3cfe2',
      '100': '#fad0c4'
    },
    '3a': {
      0: '#8ec5fc',
      70: '#c3cfe2',
      100: '#43e97b'
    },
    '5a': {
      0: '#ffebff',
      33: '#825975',
      66: '#3a0069',
      100: '#002948'
    },
    '6a': {
      0: '#8ec5fc',
      70: '#c3cfe2',
      100: '#000000'
    },
    '7a': {
      0: '#000000',
      70: '#c3cfe2',
      100: '#43e97b'
    },
    '8a': {
      0: '#00253C',
      25: '#086B3C',
      50: '#8ec5fc',
      100: '#000000'
    },
    '9a': {
      0: '#8ec5fc',
      70: '#c3cfe2',
      100: '#000000'
    },
    '10a': {
      0: '#000000',
      70: '#c3cfe2',
      100: '#43e97b'
    },
    '11a': {
      0: '#000000',
      70: '#c3cfe2',
      100: '#43e97b'
    },
    '12a': {
      0: '#000000',
      70: '#c3cfe2',
      100: '#43e97b'
    },
    '13': {
      '0': '#e0c3fc',
      '50': '#8ec5fc',
      '90': '#43e97b'
    },
    '14': {
      '0': '#fad0c4',
      '100': '#d1ffe7'
    },
    '15': {
      '9': '#ffffff',
      '70': '#c3cfe2',
      '100': '#fad0c4'
    },
    '16': {
      0: '#8ec5fc',
      70: '#c3cfe2',
      100: '#43e97b'
    },
    '17': {
      0: '#00253C',
      25: '#086B3C',
      50: '#8ec5fc',
      100: '#000000'
    },
    '18': {
      0: '#8ec5fc',
      70: '#c3cfe2',
      100: '#000000'
    },
    '19': {
      0: '#000000',
      70: '#c3cfe2',
      100: '#43e97b'
    },
    '20': {
      0: '#00253C',
      25: '#086B3C',
      50: '#8ec5fc',
      100: '#000000'
    },
    '21': {
      0: '#8ec5fc',
      70: '#c3cfe2',
      100: '#000000'
    },
    '22': {
      0: '#000000',
      70: '#c3cfe2',
      100: '#43e97b'
    },
    '23': {
      0: '#000000',
      70: '#c3cfe2',
      100: '#43e97b'
    },
    '24': {
      0: '#000000',
      70: '#c3cfe2',
      100: '#43e97b'
    }
  },
  editing: null,
  editingColor: null,
  updating: {
    origUnchanged: {},
    stop: null,
    passThreshold: false,
    pickingColorStop: null,
    active: null
  },
  updatingStopXPos: null
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EDIT_STOP:
      return {
        ...state,
        editing: action.payload.id,
        updating: {
          ...state.updating,
          origUnchanged: state.values[action.payload.id]
        }
      }

    case EDIT_STOP_COLOR:
      return {
        ...state,
        editingColor: state.editingColor ? null : action.payload.id
      }

    case SWAP_STOP_COLORS:
      return {
        ...state,
        values: {
          ...state.values,
          [action.payload.id]: action.payload.updatedStop
        }
      }

    case UPDATE_DRAGGED_STOP_POS:
      return {
        ...state,
        values: {
          ...state.values,
          [action.payload.editing]: action.payload.updatedStopValues
        },
        updating: {
          ...state.updating,
          origUnchanged: action.payload.updatedStopValues,
          stop: action.payload.updatedStop,
          passThreshold: action.payload.passThreshold
            ? action.payload.passThreshold
            : state.updating.passThreshold,
          pickingColorStop: null,
          active: action.payload.updatedStop
        }
      }

    case UPDATE_UPDATING_STOP:
      return {
        ...state,
        updating: {
          ...state.updating,
          stop: action.payload.stop,
          passThreshold: action.payload.stop === null &&
            state.updatingStopXPos !== action.payload.xPos
        },
        updatingStopXPos: action.payload.xPos
      }

    case TOGGLE_ACTIVE_COLOR_PICKER:
      return {
        ...state,
        updating: {
          ...state.updating,
          pickingColorStop: action.payload.stop
        }
      }

    case UPDATE_STOP_COLOR:
      return {
        ...state,
        values: {
          ...state.values,
          [action.payload.id]: {
            ...state.values[action.payload.id],
            [action.payload.stop]: action.payload.color
          }
        },
        updating: {
          ...state.updating,
          origUnchanged: {
            ...state.updating.origUnchanged,
            [action.payload.stop]: action.payload.color
          }
        }
      }

    case UPDATE_ACTIVE_STOP:
      return {
        ...state,
        updating: {
          ...state.updating,
          active: action.payload.stop
        }
      }

    case DELETE_ACTIVE_STOP:
      return {
        ...state,
        values: {
          ...state.values,
          [action.payload.editing]: action.payload.newValues
        },
        updating: {
          origUnchanged: action.payload.newValues,
          stop: null,
          passThreshold: false,
          pickingColorStop: null,
          active: null
        }
      }

    case ADD_COLOR_STOP:
      return {
        ...state,
        values: {
          ...state.values,
          [action.payload.editing]: action.payload.newValues
        },
        updating: {
          ...state.updating,
          origUnchanged: action.payload.newValues
        }
      }

    case RESET_COLOR_STOP:
      return {
        ...state,
        values: {
          ...state.values,
          [action.payload.id]: INITIAL_STATE.values[action.payload.id]
        },
        updating: {
          ...INITIAL_STATE.updating,
          origUnchanged: INITIAL_STATE.values[action.payload.id]
        }
        // editingColor: INITIAL_STATE.editingColor
      }

    default:
      return state
  }
}

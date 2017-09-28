let defaultState = {
    lists: [
        {
            list_name: 'Zakupy',
            key: 'key_1506534179170738veso45yh'
        },
        {
            list_name: 'Trening',
            key: 'key_1506534196148sm9u0hrihma'
        }
    ],
    addModalActive: false,
    editModalActive: false,
    editList: {}
};

import * as utils from '../../utils/common';
import * as itemsUtils from '../../utils/items';
import * as listsUtils from '../../utils/lists';

export default function reducer(state=defaultState, action) {
    switch(action.type) {
        case 'FETCH_LISTS_DATA': {
            return {
                ...state,
                lists: action.payload
            };
        }
        case 'ADD_LIST': {
            let newList = {
                key: utils.generateUniqueKey(),
                list_name: action.payload
            };
            return {
                ...state,
                lists: [...state.lists, newList],
                addModalActive: false
            }
        }
        case 'OPEN_ADD_MODAL': {
            return {
                ...state,
                addModalActive: true
            }
        }
        case 'REMOVE_LIST': {
            let lists = itemsUtils.removeItem(state.lists, action.payload);
            return {
                ...state,
                lists: lists
            }
        }
        case 'OPEN_LIST_EDIT_MODAL': {
            return {
                ...state,
                editModalActive: true,
                editList: action.payload
            }
        }
        case 'EDIT_LIST': {
            let lists = listsUtils.editList( [...state.lists ], action.payload);
            return {
                ...state,
                lists: lists,
                editModalActive: false
            }
        }
        default: {
            return state;
        }
    }
}
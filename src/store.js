import { createStore } from "redux";

const productList = ['Apple', 'Bread', 'Carrot', 'Dumplings', 'Eggs', 'Fish', 'Garlic', 'Honey', 'Ice cream', 'Jam']
    .map((item, i) => ({id: i + 1, name: item }));

// action types
const TYPE_MOVE_UP = 'MoveUp';
const TYPE_MOVE_DOWN = 'MoveDown';
const TYPE_SET_CURRENT_ID = 'SetCurrentId';

// action creators
export const moveDown = () => ({ type: TYPE_MOVE_DOWN });
export const moveUp = () => ({ type: TYPE_MOVE_UP });
export const setCurrentId =  currentId => ({ type: TYPE_SET_CURRENT_ID, currentId });

// selectors
export const getProducts = state => state.productList;
export const getCurrentId = state => state.currentId;



const reducer = (state, action) => {
  switch (action.type) {
    case TYPE_MOVE_UP: {
      const newProductList = [...state.productList];
      const currentItemIndex = newProductList.findIndex(item => item.id === state.currentId);
      const buffer = newProductList[currentItemIndex - 1];


      newProductList[currentItemIndex - 1] = newProductList[currentItemIndex];
      newProductList[currentItemIndex] = buffer;

      return {
        ...state,
        productList: newProductList,
      };
    }
    case TYPE_MOVE_DOWN: {
      const newProductList = [...state.productList];
      const currentItemIndex = newProductList.findIndex(item => item.id === state.currentId);
      const buffer = newProductList[currentItemIndex + 1];


      newProductList[currentItemIndex + 1] = newProductList[currentItemIndex];
      newProductList[currentItemIndex] = buffer;

      return {
        ...state,
        productList: newProductList,
      };
    }
    case TYPE_SET_CURRENT_ID:
      return {
        ...state,
        currentId: action.currentId,
      };
    default:
      return state;
  }
};

const store = createStore(reducer, { productList, currentId: null });

export default store;

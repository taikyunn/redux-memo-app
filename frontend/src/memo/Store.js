import { createStore } from 'redux';

const initData = {
  data: [],
  message: 'Please type message',
  mode: 'default',
  fdata: []
}

// レデューサー
export function memoReducer(state = initData, action) {
  switch (action.type) {
    case 'ADD':
      return addReduce(state, action);

    case 'DELETE':
      return deleteReduce(state, action);

    case 'FIND':
      return findReduce(state, action);

    default:
      return state;
  }
}

// メモ追加のレデュース処理
function addReduce(state, action) {
  let date = new Date();
  let f = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
  let data = {
    message: action.message,
    created: f
  };

  let newData = state.data.slice();
  newData.unshift(data);

  return {
    data: newData,
    message: 'Added!',
    mode: 'default',
    fdata: []
  };
}

// メモ検索のレデュース処理
function findReduce(state, action) {
  let f = action.find;
  let fdata = [];
  state.data.forEach((value) => {
    if (value.message.indexOf(f) >= 0) {
      fdata.push(value);
    }
  });

  return {
    data: state.data,
    message: 'find:' + f,
    mode: 'find',
    fdata: fdata
  };
}

// メモ削除のレデュース処理
function deleteReduce(state,action) {
  let newData = state.data.slice();
  newData.splice(action.index, 1);
  return {
    data: newData,
    message: 'delete' + action.index + ':',
    mode: 'delete',
    fdata: [],
  }
}

// アクションクリエーター
// メモ追加のアクション
export function addMemo(text) {
  return {
    type: 'ADD',
    message: text
  }
}

// メモ削除のアクション
export function deleteMemo(num) {
  return {
    type: 'DELETE',
    index: num
  }
}

// メモ検索のアクション
export function findMemo(text) {
  return {
    type: 'FIND',
    find: text
  }
}

// ストアを作成
export default createStore(memoReducer);

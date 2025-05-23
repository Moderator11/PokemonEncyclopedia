import { configureStore, createSlice } from "@reduxjs/toolkit";
import { myListKey, myListMaxKey } from "../shared/storageManager";

const initialState = {
  myListMax: 6,
  displayCount: 50,
  idList: Array.from({ length: 50 }, (_, i) => i + 1),
  myList: [],
};

const idListSlice = createSlice({
  name: "idList",
  initialState,
  reducers: {
    addToMyList: (state, action) => {
      const id = action.payload;
      if (!state.myList.includes(id) && state.myList.length < state.myListMax) {
        state.myList.push(id);
        state.idList = state.idList.filter((item) => item !== id);
      }
    },
    removeFromMyList: (state, action) => {
      const id = action.payload;
      state.myList = state.myList.filter((item) => item !== id);
      if (!state.idList.includes(id)) {
        state.idList.push(id);
        state.idList.sort((a, b) => a - b);
      }
    },
    setMyList: (state, action) => {
      const importedList = action.payload;
      state.myList = importedList;
      state.idList = Array.from(
        { length: state.displayCount },
        (_, i) => i + 1
      ).filter((id) => !importedList.includes(id));
    },
    setMyListMax: (state, action) => {
      state.myListMax = action.payload;
    },
    resetLists: () => initialState,
  },
});

export const {
  addToMyList,
  removeFromMyList,
  setMyList,
  setMyListMax,
  resetLists,
} = idListSlice.actions;

const loadState = () => {
  try {
    const serializedMyList = localStorage.getItem(myListKey);
    const serializedMyListMax = localStorage.getItem(myListMaxKey);

    const myList = serializedMyList ? JSON.parse(serializedMyList) : [];
    const myListMax = serializedMyListMax
      ? JSON.parse(serializedMyListMax)
      : initialState.myListMax;

    const displayCount = initialState.displayCount;
    const allIds = Array.from({ length: displayCount }, (_, i) => i + 1);
    const idList = allIds.filter((id) => !myList.includes(id));

    return {
      idList: {
        myListMax,
        displayCount,
        myList,
        idList,
      },
    };
  } catch (err) {
    return undefined;
  }
};

const preloadedState = loadState();

const store = configureStore({
  reducer: {
    idList: idListSlice.reducer,
  },
  preloadedState,
});

export default store;

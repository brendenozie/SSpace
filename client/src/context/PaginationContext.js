import { createContext, useEffect, useReducer } from "react";

const INITIAL_STATE = localStorage.getItem("page")  ? JSON.parse(localStorage.getItem("page")) : {
                                                                                                   perPage: 12,
                                                                                                   currentPage: 1,
                                                                                                   pagesToShow: 3,
                                                                                                   loading: false,
                                                                                                   error: null,
                                                                                                 };

export const PaginationContext = createContext(INITIAL_STATE);

export const onPrev = (state) => {
  const updatedState = {state};
  updatedState.currentPage = state.currentPage - 1;
  return updatedState;
};

export const onNext = (state) => {
  return {
      ...state,
      currentPage: state.currentPage + 1
  };
};

export const goPage = (state,n) => {
  return {
      ...state,
      currentPage: n
  };
};

export const countItem = (state,n) => {
  return {
      ...state,
      totalItemsCount: n
  }
}

const PaginationReducer = (state, action) => {
  switch (action.type) {
    case "PREV_PAGE": return onPrev(state);
    case "NEXT_PAGE": return onNext(state);
    case "GO_PAGE":   return goPage(state, action.payload);
    case "COUNT_ITEM":  return countItem(state, action.payload);
    default:   return state;
  }
};

export const PageContextProvider = ({ children }) => {
  const [state, updateValue] = useReducer(PaginationReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("page", JSON.stringify(state));
  }, [state]);

  return (
    <PaginationContext.Provider
      value={{
        perPage: state.perPage,
        currentPage: state.currentPage,
        pagesToShow: state.pagesToShow,
        loading: state.loading,
        error: state.error,
        updateValue,
      }}
    >
      {children}
    </PaginationContext.Provider>
  );
};

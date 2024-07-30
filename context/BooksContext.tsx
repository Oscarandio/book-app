// context/BooksContext.tsx
import React, { createContext, useContext, useReducer } from 'react';

interface Book {
  id: string;
  title: string;
  authors: string[];
  thumbnail: string;
}

type State = {
  readBooks: Book[];
  toReadBooks: Book[];
};

type Action =
  | { type: 'ADD_TO_READ'; book: Book }
  | { type: 'ADD_TO_TO_READ'; book: Book }
  | { type: 'REMOVE_FROM_READ'; id: string }
  | { type: 'REMOVE_FROM_TO_READ'; id: string };

const initialState: State = {
  readBooks: [],
  toReadBooks: [],
};

const BooksContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

const booksReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_TO_READ':
      return { ...state, readBooks: [...state.readBooks, action.book] };
    case 'ADD_TO_TO_READ':
      return { ...state, toReadBooks: [...state.toReadBooks, action.book] };
    case 'REMOVE_FROM_READ':
      return {
        ...state,
        readBooks: state.readBooks.filter((book) => book.id !== action.id),
      };
    case 'REMOVE_FROM_TO_READ':
      return {
        ...state,
        toReadBooks: state.toReadBooks.filter((book) => book.id !== action.id),
      };
    default:
      return state;
  }
};

export const BooksProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(booksReducer, initialState);
  return (
    <BooksContext.Provider value={{ state, dispatch }}>
      {children}
    </BooksContext.Provider>
  );
};

export const useBooks = () => useContext(BooksContext);

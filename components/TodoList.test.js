import * as React from 'react';
import {Provider} from 'react-redux';
import {render, screen, fireEvent} from '@testing-library/react-native';
import configureStore from '../store';
import TodoList from './TodoList';

describe('TodoList component test', () => {
  test('it should execute with a store with 4 elements', () => {
    const initialState = {
      todos: [
        {id: 1, text: 'Sing something', date: new Date()},
        {id: 2, text: 'Dance something', date: new Date()},
        {id: 3, text: 'Sleep something', date: new Date()},
        {id: 4, text: 'Sleep something', date: new Date()},
      ],
    };
    const store = configureStore(initialState);

    const component = (
      <Provider store={store}>
        <TodoList />
      </Provider>
    );

    render(component);
    const todoElems = screen.getAllByText(/something/i);

    expect(todoElems.length).toEqual(4);
  });

  test('should execute with 2 elements and end up with 1 after delete', () => {
    const initialState = {
      todos: [
        {id: 1, text: 'Sing something', date: new Date()},
        {id: 2, text: 'Dance something', date: new Date()},
      ],
    };
    const store = configureStore(initialState);

    const component = (
      <Provider store={store}>
        <TodoList />
      </Provider>
    );

    render(component);
    const todoElems = screen.getAllByText(/something/i);

    expect(todoElems.length).toBe(2);

    const buttons = screen.getAllByText('Delete');
    expect(buttons.length).toBe(2);

    fireEvent.press(buttons[0]);
    expect(screen.getAllByText('Delete').length).toBe(1);
  });
});

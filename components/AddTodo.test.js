import * as React from 'react';
import {Provider} from 'react-redux';
import {render, screen, fireEvent} from '@testing-library/react-native';
import configureStore from '../store';
import AddTodo from './AddTodo';

describe('AddTodo component test', () => {
  test('adds a new TODO when the button is pressed', () => {
    const store = configureStore();

    const component = (
      <Provider store={store}>
        <AddTodo />
      </Provider>
    );

    render(component);

    // There is a TextInput.
    // https://github.com/callstack/react-native-testing-library/blob/ae3d4af370487e1e8fedd8219f77225690aefc59/examples/redux/components/AddTodo.js#L24
    const input = screen.getByPlaceholderText(/repository/i);
    // expect(input).toBeOnTheScreen();

    const textToEnter = 'This is a random element';
    fireEvent.changeText(input, textToEnter);
    fireEvent.press(screen.getByText('Submit form'));

    const todosState = store.getState().todos;

    expect(todosState.length).toEqual(1);

    expect(todosState).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 1,
          text: textToEnter,
          date: expect.any(Date),
        }),
      ]),
    );
  });
});

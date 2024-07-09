import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoItem from './TodoItem';
import { Todo } from '../types';

test('renders a todo item and toggles it', () => {
  const todo: Todo = { id: 1, text: 'Learn Jest', completed: false };
  const toggleTodo = jest.fn();
  const deleteTodo = jest.fn();
  const editTodo = jest.fn();

  render(<TodoItem todo={todo} toggleTodo={toggleTodo} deleteTodo={deleteTodo} editTodo={editTodo} />);
  const todoItem = screen.getByText(/learn jest/i);
  expect(todoItem).toBeInTheDocument();
  expect(todoItem).toHaveStyle('text-decoration: none');

  fireEvent.click(todoItem);
  expect(toggleTodo).toHaveBeenCalledWith(todo.id);
});

test('deletes a todo item', () => {
  const todo: Todo = { id: 1, text: 'Learn Jest', completed: false };
  const toggleTodo = jest.fn();
  const deleteTodo = jest.fn();
  const editTodo = jest.fn();

  render(<TodoItem todo={todo} toggleTodo={toggleTodo} deleteTodo={deleteTodo} editTodo={editTodo} />);
  const deleteButton = screen.getByText(/delete/i);
  fireEvent.click(deleteButton);

  expect(deleteTodo).toHaveBeenCalledWith(todo.id);
});

test('edits a todo item', () => {
  const todo: Todo = { id: 1, text: 'Learn Jest', completed: false };
  const toggleTodo = jest.fn();
  const deleteTodo = jest.fn();
  const editTodo = jest.fn();

  render(<TodoItem todo={todo} toggleTodo={toggleTodo} deleteTodo={deleteTodo} editTodo={editTodo} />);
  const editButton = screen.getByText(/edit/i);
  fireEvent.click(editButton);

  const input = screen.getByDisplayValue(/learn jest/i);
  fireEvent.change(input, { target: { value: 'Learn React Testing' } });
  const saveButton = screen.getByText(/save/i);
  fireEvent.click(saveButton);

  expect(editTodo).toHaveBeenCalledWith(todo.id, 'Learn React Testing');
});

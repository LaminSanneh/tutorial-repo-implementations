import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TodoList from "./TodoList";
import { Todo } from "../types";

test("renders a list of todos and toggles them", () => {
  const todos: Todo[] = [
    { id: 1, text: "Learn Jest", completed: false },
    { id: 2, text: "Learn React Testing Library", completed: false },
  ];
  const toggleTodo = jest.fn();
  const deleteTodo = jest.fn();
  const editTodo = jest.fn();

  render(<TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} editTodo={editTodo} />);
  const todoItems1 = screen.getByText(todos[0].text);
  const todoItems2 = screen.getByText(todos[1].text);
  const todoItems = screen.getAllByRole("listitem");
  expect(todoItems).toHaveLength(2);

  fireEvent.click(todoItems1);
  expect(toggleTodo).toHaveBeenCalledWith(1);

  fireEvent.click(todoItems2);
  expect(toggleTodo).toHaveBeenCalledWith(2);
});

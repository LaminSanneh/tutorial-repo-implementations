import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

test("adds and toggles todo items", () => {
  render(<App />);
  const input = screen.getByRole("textbox");
  const button = screen.getByRole("button", { name: /add todo/i });

  fireEvent.change(input, { target: { value: "Learn Jest" } });
  fireEvent.click(button);

  const todoItem = screen.getByText(/learn jest/i);
  expect(todoItem).toBeInTheDocument();
  expect(todoItem).toHaveStyle("text-decoration: none");

  fireEvent.click(todoItem);
  expect(todoItem).toHaveStyle("text-decoration: line-through");
});

test("deletes a todo item", () => {
  render(<App />);
  const input = screen.getByRole("textbox");
  const button = screen.getByRole("button", { name: /add todo/i });

  fireEvent.change(input, { target: { value: "Learn Jest" } });
  fireEvent.click(button);

  const deleteButton = screen.getByText(/delete/i);
  fireEvent.click(deleteButton);

  expect(screen.queryByText(/learn jest/i)).not.toBeInTheDocument();
});

test("edits a todo item", () => {
  render(<App />);
  const input = screen.getByRole("textbox");
  const button = screen.getByRole("button", { name: /add todo/i });

  fireEvent.change(input, { target: { value: "Learn Jest" } });
  fireEvent.click(button);

  const editButton = screen.getByText(/edit/i);
  fireEvent.click(editButton);

  const editInput = screen.getByDisplayValue(/learn jest/i);
  fireEvent.change(editInput, { target: { value: "Learn React Testing" } });
  const saveButton = screen.getByText(/save/i);
  fireEvent.click(saveButton);

  expect(screen.getByText(/learn react testing/i)).toBeInTheDocument();
});

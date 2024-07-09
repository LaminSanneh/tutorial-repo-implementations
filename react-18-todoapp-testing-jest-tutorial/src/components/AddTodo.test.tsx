import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AddTodo from "./AddTodo";

test("adds a new todo item", () => {
  const addTodo = jest.fn();

  render(<AddTodo addTodo={addTodo} />);
  const input = screen.getByRole("textbox");
  const button = screen.getByRole("button", { name: /add todo/i });

  fireEvent.change(input, { target: { value: "Learn Jest" } });
  fireEvent.click(button);

  expect(addTodo).toHaveBeenCalledWith("Learn Jest");
  expect(input).toHaveValue("");
});

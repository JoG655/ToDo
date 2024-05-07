import { type FormEvent, useState, useEffect } from "react";

const STORAGE_KEY = "Tasks";
const NEW_TASK_NAME = "TaskText";

type Task = {
  id: string;
  text: string;
  completed: boolean;
};

export function ToDoList() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const localValue = localStorage.getItem(STORAGE_KEY);

    if (localValue == null) return [];

    return JSON.parse(localValue);
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  function addTask(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formElement = e.target as HTMLFormElement;

    const newTaskText = new FormData(formElement)
      .get(NEW_TASK_NAME)
      ?.toString();

    if (!newTaskText?.trim().length) return;

    setTasks((prevTasks) => [
      ...prevTasks,
      { id: crypto.randomUUID(), text: newTaskText, completed: false },
    ]);

    formElement.reset();
  }

  function toggleCompletedTask(index: number) {
    const updatedTasks = [...tasks];

    updatedTasks[index] = {
      ...updatedTasks[index],
      completed: !updatedTasks[index].completed,
    };

    setTasks(updatedTasks);
  }

  function deleteTask(index: number) {
    const updatedTasks = tasks.filter((_, i) => i !== index);

    setTasks(updatedTasks);
  }

  function moveUpTask(index: number) {
    if (index <= 0) return;

    const updatedTasks = [...tasks];

    updatedTasks[index] = tasks[index - 1];

    updatedTasks[index - 1] = tasks[index];

    setTasks(updatedTasks);
  }

  function moveDownTask(index: number) {
    if (index >= tasks.length - 1) return;

    const updatedTasks = [...tasks];

    updatedTasks[index] = tasks[index + 1];

    updatedTasks[index + 1] = tasks[index];

    setTasks(updatedTasks);
  }

  return (
    <div className="to-do-list">
      <h1>To-Do-List</h1>
      <form onSubmit={addTask}>
        <input type="text" placeholder="Enter a task..." name={NEW_TASK_NAME} />
        <button type="submit" className="button button--add">
          Add
        </button>
      </form>
      <ol>
        {tasks.map((task, index) => (
          <li key={task.id}>
            <input
              id={task.id}
              className="checkbox"
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleCompletedTask(index)}
            />
            <label htmlFor={task.id}>{task.text}</label>
            <button
              className="button button--delete"
              onClick={() => deleteTask(index)}
            >
              Delete
            </button>
            <button
              className="button button--move"
              onClick={() => moveUpTask(index)}
            >
              Move Up
            </button>
            <button
              className="button button--move"
              onClick={() => moveDownTask(index)}
            >
              Move Down
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

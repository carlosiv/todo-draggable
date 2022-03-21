import "./App.css";
import React, { useState } from "react";
import InputForm from "./components/InputForm";
import { Task } from "./types";
import TodoList from "./components/TodoList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
const App: React.FC = () => {
  const [task, setTask] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (task) {
      setTasks([...tasks, { id: Date.now(), task, isDone: false }]);
      setTask("");
    }
  };
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    let draggedTask,
      active = tasks,
      complete = completedTasks;

    if (source.droppableId === "tasksListActive") {
      draggedTask = active[source.index];
      active.splice(source.index, 1);
    } else {
      draggedTask = complete[source.index];
      complete.splice(source.index, 1);
    }

    if (destination.droppableId === "tasksListActive") {
      active.splice(destination.index, 0, draggedTask);
      draggedTask.isDone = false;
    } else {
      complete.splice(source.index, 0, draggedTask);
      draggedTask.isDone = true;
    }

    setCompletedTasks(complete);
    setTasks(active);
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">My Tasks</span>
        <InputForm task={task} setTask={setTask} handleAdd={handleAdd} />
        <TodoList
          tasks={tasks}
          setTasks={setTasks}
          completedTasks={completedTasks}
          setCompletedTasks={setCompletedTasks}
        />
      </div>
    </DragDropContext>
  );
};

export default App;

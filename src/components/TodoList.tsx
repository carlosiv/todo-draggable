import { Droppable } from "react-beautiful-dnd";
import { Task } from "../types";
import "./styles.css";
import TaskCard from "./TaskCard";

type Props = {
  tasks: Task[];
  completedTasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  setCompletedTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

const TodoList = ({
  tasks,
  setTasks,
  completedTasks,
  setCompletedTasks,
}: Props) => {
  return (
    <div className="container">
      <Droppable droppableId="tasksListActive">
        {(provided, snapshot) => (
          <div
            className={`tasks ${snapshot.isDraggingOver ? "dragActive" : ""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="tasks_heading">Active Tasks</span>
            {tasks.map((task, index) => (
              <TaskCard
                index={index}
                task={task}
                key={task.id}
                tasks={tasks}
                setTasks={setTasks}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="tasksListDone">
        {(provided, snapshot) => (
          <div
            className={`tasks done ${
              snapshot.isDraggingOver ? "dragComplete" : ""
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="tasks_heading">Completed Tasks</span>
            {completedTasks.map((task, index) => (
              <TaskCard
                index={index}
                task={task}
                key={task.id}
                tasks={completedTasks}
                setTasks={setCompletedTasks}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;

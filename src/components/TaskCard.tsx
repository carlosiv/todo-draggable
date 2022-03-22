import { Task } from "../types";
import { AiFillDelete, AiFillEdit, AiFillCloseCircle } from "react-icons/ai";
//import { MdDone } from "react-icons/md";
import "./styles.css";
import { useEffect, useRef, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
type Props = {
  index: number;
  task: Task;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

const TaskCard = ({ index, task, tasks, setTasks }: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editText, setEditText] = useState<string>(task.task);
  const inputRef = useRef<HTMLInputElement>(null);
  // const handleDone = (id: number) => {
  //   setTasks(
  //     tasks.map((task) =>
  //       task.id === id
  //         ? {
  //             ...task,
  //             isDone: !task.isDone,
  //           }
  //         : task
  //     )
  //   );
  // };

  const handleDelete = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleEdit = () => {
    if (edit === true && !task.isDone) {
      console.log("here");
      setEdit(false);
    } else {
      setEdit(true);
    }
  };

  const handleSubmit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              task: editText,
            }
          : task
      )
    );
    setEdit(false);
  };
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided) => (
        <form
          className="taskCard"
          onSubmit={(e) => handleSubmit(e, task.id)}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          {edit ? (
            <input
              className="task_text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              ref={inputRef}
            />
          ) : task.isDone ? (
            <s className="task_text">{task.task}</s>
          ) : (
            <span className="task_text">{task.task}</span>
          )}

          <div>
            {edit ? (
              <span className="icon" onClick={handleEdit}>
                <AiFillCloseCircle />
              </span>
            ) : task.isDone ? (
              <>
                <span className="icon" onClick={() => handleDelete(task.id)}>
                  <AiFillDelete />
                </span>
              </>
            ) : (
              <>
                <span className="icon" onClick={handleEdit}>
                  <AiFillEdit />
                </span>
                <span className="icon" onClick={() => handleDelete(task.id)}>
                  <AiFillDelete />
                </span>
              </>
            )}
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default TaskCard;

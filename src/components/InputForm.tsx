import { useRef } from "react";
import "./styles.css";

type Props = {
  task: string;
  setTask: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
};

const InputForm = ({ task, setTask, handleAdd }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <form
      className="input"
      onSubmit={(e) => {
        handleAdd(e);
        inputRef.current?.blur();
      }}
    >
      <input
        type="text"
        placeholder="Enter a task"
        className="input_field"
        onChange={(e) => setTask(e.target.value)}
        value={task}
        ref={inputRef}
      />
      <button className="input_submit">Go</button>
    </form>
  );
};

export default InputForm;

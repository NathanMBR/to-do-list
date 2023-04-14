import {
  CSSProperties,
  useRef,
} from "react";

import { Button } from "./Button";
import { ListItem } from "../types";

export interface AddListItemProps {
  readonly addListItem: (listItem: ListItem) => void;
  readonly style?: CSSProperties;
};

export const AddListItem = (props: AddListItemProps) => {
  const {
    addListItem,
    style
  } = props;

  const descriptionRef = useRef<HTMLInputElement | null>(null);

  const handleAddItem = () => {
    if (!descriptionRef.current)
      return;
    
    const description = descriptionRef.current.value;
    if (!description)
      return;

    const newListItem: ListItem = {
      id: Date.now().toString(),
      description,
      isDone: false,
      createdAt: new Date().toDateString()
    };

    addListItem(newListItem);
    descriptionRef.current.value = "";
  };

  const inputStyle: CSSProperties = {
    padding: "8px",
    border: "solid 1px black",
    borderRadius: "16px",
    minWidth: "20%"
  };

  const buttonStyle: CSSProperties = {
    padding: "8px",
    border: "solid 1px black",
    borderRadius: "16px",
    marginLeft: "4px"
  };

  return (
    <div style={style}>
      <input
        ref={descriptionRef}
        placeholder="Add a new to-do..."
        style={inputStyle}
      />

      <Button
        onClick={handleAddItem}
        style={buttonStyle}
      >
        Add item
      </Button>
    </div>
  );
};
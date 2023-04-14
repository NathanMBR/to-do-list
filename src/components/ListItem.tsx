import {
  CSSProperties,
  useState
} from "react";

import {
  Button,
  Checkbox
} from "../components";
import { type ListItem as IListItem } from "../types";

export interface ListItemProps {
  readonly listItem: IListItem;
  readonly updateListItem: (
    listItemId: IListItem["id"],
    updatedListItem: Omit<IListItem, "id">
  ) => void;
  readonly removeListItem: (listItemId: IListItem["id"]) => void;
};

export const ListItem = (props: ListItemProps) => {
  const {
    listItem,
    updateListItem,
    removeListItem
  } = props;

  const [isDone, setIsDone] = useState(listItem.isDone);
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(listItem.description);

  const handleIsDoneChange = () => {
    setIsDone(!isDone);

    updateListItem(
      listItem.id,

      {
        ...listItem,
        isDone: !isDone
      }
    )
  };

  const handleEdit = () => {
    if (isEditing)
      updateListItem(
        listItem.id,
        {
          ...listItem,
          description
        }
      );
    

    setIsEditing(!isEditing);
  };

  const listItemStyle: CSSProperties = {
    display: "inline-block",
    padding: "8px",
    border: "solid 1px black",
    borderRadius: "4px",
    width: "20%"
  };

  const checkboxStyle: CSSProperties = {
    display: "inline-block",
    marginRight: "8px",
    width: "16px",
    height: "16px"
  };

  const editStyle: CSSProperties = {
    display: "inline-block",
    fontSize: "16px",
    border: "solid 1px black",
    borderRadius: "4px",
    padding: "2px"
  };

  const descriptionStyle: CSSProperties = {
    display: "inline-block",
    fontSize: "16px",
    width: "80%",
    textAlign: "center",
    textDecoration: isDone
      ? "line-through"
      : "none",
    textDecorationThickness: isDone
      ? "2px"
      : "0"
  };

  const optionsStyle: CSSProperties = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  };

  return (
    <div style={listItemStyle}>
      <div style={{ padding: "4px" }}>
        <Checkbox
          checked={isDone}
          onChange={handleIsDoneChange}
          style={checkboxStyle}
        />

        {
          isEditing
            ? <input
              defaultValue={listItem.description}
              onChange={event => setDescription(event.target.value)}
              style={editStyle}
            />
            : <h3 style={descriptionStyle}>
              {listItem.description}
            </h3>
        }
      </div>

      <div style={optionsStyle}>
        <Button
          onClick={handleEdit}
          disabled={isDone}
        >
          {
            isEditing
              ? "Save edit"
              : "Edit"
          }
        </Button>

        <Button onClick={() => removeListItem(listItem.id)}>
          Remove
        </Button>
      </div>
    </div>
  );
};
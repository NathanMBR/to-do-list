import {
  CSSProperties,
  useState
} from "react";

import {
  AddListItem,
  Checkbox,
  ListItem
} from "../components";
import { useListItems } from "../hooks";

export const ToDoList = () => {
  const {
    listItems,
    addListItem,
    updateListItem,
    removeListItem,
    error
  } = useListItems();

  const [hideDone, setHideDone] = useState(false);

  const notDoneListItems = !!listItems
    ? listItems.filter(listItem => !listItem.isDone)
    : [];

  const listToShow = hideDone
    ? notDoneListItems
    : listItems;

  const errorMessage = typeof error === "string"
    ? error
    : "An unexpected error ocurred.";

  const containerStyle: CSSProperties = {
    padding: "32px 64px"
  };

  const hideDoneLabelStyle: CSSProperties = {
    display: "inline-block",
    marginLeft: "4px",
    marginBottom: "16px"
  };

  const listStyle: CSSProperties = {
    listStyle: "none",
    padding: 0
  };

  const feedbackParagraphStyle: CSSProperties = {
    color: "grey",
    fontStyle: "italic"
  };

  return (
    <div style={containerStyle}>
      <h1>To-do List</h1>

      <AddListItem
        addListItem={addListItem}
        style={{ marginBottom: "32px" }}
      />

      <div>
        <Checkbox
          name="hide-done"
          onChange={() => setHideDone(!hideDone)}
        />
        <label
          htmlFor="hide-done"
          style={hideDoneLabelStyle}
        >
          Hide done tasks
        </label>
      </div>

      {
        !!error
        ? <p>{errorMessage}</p>
        : <ul style={listStyle}>
          {
            !!listToShow
              ? listToShow.length > 0
                ? listToShow.map(
                  listItem => <li
                    key={listItem.id}
                    style={{ marginBottom: "4px" }}
                  >
                    <ListItem
                      listItem={listItem}
                      updateListItem={updateListItem}
                      removeListItem={removeListItem}
                    />
                  </li>
                )
                : <p style={feedbackParagraphStyle}>
                  The list is empty.
                </p>
              : <p style={feedbackParagraphStyle}>
                Loading...
              </p>
          }
        </ul>
      }
    </div>
  );
};
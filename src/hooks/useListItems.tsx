import {
  useEffect,
  useState
} from "react";

import { type ListItem } from "../types";

export const useListItems = () => {
  const [listItems, setListItems] = useState<Array<ListItem> | null>(null);
  const [error, setError] = useState<unknown>(null);

  useEffect(
    () => {
      try {
        const rawListItems = localStorage.getItem("list-items") || "[]";
        const parsedListItems = JSON.parse(rawListItems);
        setListItems(parsedListItems);
      } catch (error) {
        console.log(error)
        setError(error);
      }
    },

    []
  );

  useEffect(
    () => {
      if (!listItems)
        return;

      const stringifiedListItems = JSON.stringify(listItems);

      localStorage.setItem(
        "list-items",
        stringifiedListItems
      );
    },

    [
      listItems
    ]
  );

  const addListItem = (listItem: ListItem) => {
    if (!listItems)
      return;

    setListItems(
      [
        ...listItems,
        listItem
      ]
    );
  };

  const updateListItem = (
    listItemId: ListItem["id"],
    updatedListItem: Omit<ListItem, "id">
  ) => {
    if (!listItems)
      return;

    const listItemIndexToUpdate = listItems.findIndex(
      listItem => listItem.id === listItemId
    );

    if (listItemIndexToUpdate === -1)
      return setError("List item to update not found");

    setListItems(
      listItems.map(
        listItem => listItem.id === listItemId
          ? (
            {
              ...listItem,
              ...updatedListItem
            }
          )
          : listItem
      )
    );
  };

  const removeListItem = (listItemId: ListItem["id"]) => {
    if (!listItems)
      return;

    setListItems(
      listItems.filter(
        listItem => listItem.id !== listItemId
      )
    );
  };

  return {
    listItems,
    addListItem,
    updateListItem,
    removeListItem,
    error
  };
};
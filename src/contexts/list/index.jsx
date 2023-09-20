import { collection, doc } from '@firebase/firestore';
import React, { createContext, useEffect, useState } from 'react'
import { db } from '../../config/fire';
import { addOne, getAll, updateOne } from '../../lib/firebase';

export const ListContext = createContext();
export const ListProvider = ({ children }) => {

  const [listItems, setListItems] = useState([]);
  const [lists, setLists] = useState([]);
  const [displayListItemForm, setDisplayListItemForm] = useState(true);

  useEffect(() => {
    handleGetLists();
    handleGetListItems();
  }, [])

  // Create and Get list code starts here
  const handleAddNewList = (userId, boardId, name) => {
    const collectionRef = collection(db, "lists");
    const list = {
      userId,
      boardId,
      name
    }
    const listId = addOne(collectionRef, list);
    handleGetLists();
    setLists([...lists, { ...listItems, id: listId }])

  }
  const handleGetLists = async () => {
    console.log("handleGetLists called ... ");
    const collectionRef = collection(db, "lists");
    const listsArray = await getAll(collectionRef);
    console.log({ listsArray });
    setLists(listsArray);
  }

  //Create and get List Items code starts here
  const handleAddListItem = (userId, listId, name, description, priority, dueDate) => {
    const collectionRef = collection(db, "listItems");
    const listItem = {
      userId,
      listId,
      name,
      description,
      priority,
      dueDate
    }
    const listItemId = addOne(collectionRef, listItem);
    handleGetListItems();
    setListItems([...listItems, { ...listItems, id: listItemId }])
  }

  const handleGetListItems = async () => {
    console.log("handleGetListItems called ... ");
    const collectionRef = collection(db, "listItems");
    const listItemsArray = await getAll(collectionRef);
    console.log({ listItemsArray });
    setListItems(listItemsArray);
  }

  const handleUpdateListItem = async (listItemId,userId,listId,name,description,priority,dueDate)=>{
    const updatedData = {
      userId,
      listId,
      name,
      description,
      priority,
      dueDate
    }
    console.log("handleUpdateListItem called...");
    const collectionRef = collection(db,"listItems");
    const docRef = doc(db, "listItems", listItemId);
    const response = await updateOne(docRef, updatedData);
    handleGetListItems();
  }


  const values = {
    lists,
    listItems,
    handleAddListItem,
    handleAddNewList,
    displayListItemForm,
    handleUpdateListItem,
    setDisplayListItemForm
  }

  return (
    <ListContext.Provider value={values}>
      {children}
    </ListContext.Provider>
  )
}

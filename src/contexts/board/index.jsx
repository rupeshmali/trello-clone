import { createContext, useEffect, useState } from "react";
import { db } from "../../config/fire";
import { collection } from "@firebase/firestore";
import { addOne, getAll } from "../../lib/firebase";

export const BoardContext = createContext();
export const BoardProvider = ({ children }) => {
    const [displayCreateBoardModal, setDisplayCreateBoardModal] = useState(false);
    const [boards, setBoards] = useState([]);

    useEffect(()=>{
        handleGetBoards();
    },[]);
    const handleCreateNewBoard = (name, workspaceId) => {
        const collectionRef = collection(db, "boards");
        const board = {
            name,
            workspaceId
        }
        const boardId = addOne(collectionRef, board);
        setBoards([...boards, { ...board, id: boardId }])
        handleGetBoards();
    }
    const handleGetBoards = async () =>{
        const collectionRef = collection(db, "boards");
        const boardsArray = await getAll(collectionRef);
        setBoards(boardsArray);
    }
    const getOneBoard = (id)=>{
        const filteredBoard = boards.filter((board)=>{ return board.id === id })
        return filteredBoard;
    }
    const values = {
        displayCreateBoardModal,
        setDisplayCreateBoardModal,
        handleCreateNewBoard,
        boards,
        getOneBoard
    }
    return (
        <BoardContext.Provider value={values}>
            {children}
        </BoardContext.Provider>
    )
}
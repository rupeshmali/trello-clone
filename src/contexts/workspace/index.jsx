import { collection } from "@firebase/firestore";
import { auth, db } from '../../config/fire';
import { createContext, useEffect, useState } from "react";
import { addOne, getAll } from "../../lib/firebase";
import { useNavigate } from "react-router-dom";

export const WorkspaceContext = createContext();

export const WorkspaceProvider = ({ children }) => {
    const [displayCreateWorkspaceModal, setDisplayCreateWorkspaceModal] = useState(false);
    const [workspaces, setWorkspaces] = useState([]);
    const [currentWorkspace, setCurrentWorkspace] = useState({ name: '' });
    const navigate = useNavigate();

    useEffect(() => {
        handleGetWorkspaces();
    }, [])
    const handleCurrentWorkspace = (workspacesArray) => {
        const recentWorkspaceId = localStorage.getItem('recentWorkspaceID');
            if(recentWorkspaceId){
                const ID = recentWorkspaceId?.split('_');
                if (auth.currentUser?.uid === ID[1]) {
                    filterAndSetCurrentWorkspace(ID[0], workspacesArray)
                }
            }
    }
    const filterAndSetCurrentWorkspace = (workspaceId, workspacesArray) => {
        const filteredWorkspace = workspacesArray.filter(workspace => { return workspaceId === workspace.id });
        console.log({ filteredWorkspace });
        setCurrentWorkspace(filteredWorkspace[0]);
    }
    const handleAddNewWorkspace = async (userId, name, type, description) => {
        const collectionRef = collection(db, "workspaces");
        const workspace = {
            userId,
            name,
            type,
            description
        }
        const workspaceId = await addOne(collectionRef, workspace);
        setWorkspaces([...workspaces, {
            ...workspace, id: workspaceId
        }]);
        localStorage.setItem('recentWorkspaceID', workspaceId + '_' + auth.currentUser?.uid);
        handleURL(workspaceId);
        handleGetWorkspaces();
    }
    const handleURL = (workspaceId) => {
        const currentUrl = document.location.href;
        const splittedUrl = currentUrl.split('/');
        navigate(`/w/${workspaceId}`);
        // if(splittedUrl[3]==='w'){
        //     document.location.href = splittedUrl[0] + '/' + splittedUrl[1] + '/' + splittedUrl[2] + '/' + splittedUrl[3] + '/' + workspaceId; 
        // }
        // if(splittedUrl[3]==='b'){
        //     document.location.href = splittedUrl[0] + '/' + splittedUrl[1] + '/' + splittedUrl[2] + '/' + 'w' + '/' + workspaceId; 
        // }
    }
    const handleGetWorkspaces = async () => {
        console.log("handleGetWorkspaces is  called !");
        const collectionRef = collection(db, "workspaces");
        const workspacesArray = await getAll(collectionRef);
        console.log({ workspacesArray });
        setWorkspaces(workspacesArray);
        handleCurrentWorkspace(workspacesArray);
    }

    const values = {
        displayCreateWorkspaceModal,
        setDisplayCreateWorkspaceModal,
        handleAddNewWorkspace,
        workspaces,
        currentWorkspace,
        setCurrentWorkspace
    }

    return (
        <WorkspaceContext.Provider value={values}>
            {children}
        </WorkspaceContext.Provider>
    )
}
import React, { useContext, useState } from 'react'
import { useDisclosure } from '@mantine/hooks';
import { Modal, Group, Button, TextInput, Select, Title, Text, Textarea, Space } from '@mantine/core';
import { WorkspaceContext } from '../../contexts/workspace';
import { auth } from '../../config/fire';


const CreateWorkspaceModal = () => {
    const [opened, { open, close }] = useDisclosure(false);
    const { displayCreateWorkspaceModal, setDisplayCreateWorkspaceModal,handleAddNewWorkspace } = useContext(WorkspaceContext);
    const [workspaceName, setWorkspaceName] = useState('');
    const [workspaceType, setWorkspaceType] = useState('');
    const [workspaceDescription, setWorkspaceDescription] = useState('');
    const handleWorkspaceName = (e)=>{
        setWorkspaceName(e.target.value);
    }
    const handleWorkspaceType = (e)=>{
        if(e){
            console.log("e --> ",e);
            setWorkspaceType(e);
        }
    }
    const handleWorkspaceDescription = (e)=>{
        console.log(e.target.value);
        setWorkspaceDescription(e.target.value);
    }
    const handleCloseModal = () => {
        setDisplayCreateWorkspaceModal(false);
    }
    const createNewWorkspace = () => {
        handleAddNewWorkspace(auth.currentUser?.uid,workspaceName,workspaceType,workspaceDescription);
        setDisplayCreateWorkspaceModal(false);
    }

    return (
        <>
            <Modal
                width={300}
                yOffset={52}
                xOffset={0}
                pos={'absolute'}
                // xOffset={0}
                // yOffset={55}
                opened={displayCreateWorkspaceModal}
                onClose={() => handleCloseModal()}
                title=""
                overlayProps={{
                    // color: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
                    opacity: 0.55,
                    blur: 1
                }}
            >
                <Title>
                    Let's build a Workspace
                </Title>
                <Text>
                    Boost your productivity by making it easier for everyone to access boards in one location.
                </Text>
                <TextInput
                    data-autofocus
                    label="Workspace name"
                    required
                    placeholder=""
                    mt="md"
                    onChange={(e)=>handleWorkspaceName(e)}
                />
                <Select
                    value={workspaceType}
                    label="Workspace type"
                    placeholder="Pick one"
                    data={[
                        { value: 'Education', label: 'Education' },
                        { value: 'Marketing', label: 'Marketing' },
                        { value: 'Engineering-IT', label: 'Engineering-IT' },
                        { value: 'Other', label: 'Other' },
                    ]}
                    onChange={handleWorkspaceType}
                />
                <Textarea
                    label="Workspace description"
                    onChange={(e)=>handleWorkspaceDescription(e)}
                />
                <Space py={10} />
                <Button onClick={createNewWorkspace}>Continue</Button>
            </Modal>
        </>
    )
}

export default CreateWorkspaceModal
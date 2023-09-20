import React, { useContext, useState } from 'react'
import { useDisclosure } from '@mantine/hooks';
import { Modal, Group, Button, TextInput, Select, Space } from '@mantine/core';
import { BoardContext } from '../../contexts/board';
import { WorkspaceContext } from '../../contexts/workspace';

const CreateBoardModal = () => {
    const [boardTitle, setBoardTitle] = useState('');
    const [workspaceId, setWorkspaceId] = useState('');
    const [opened, { open, close }] = useDisclosure(false);
    const { displayCreateBoardModal, setDisplayCreateBoardModal, handleCreateNewBoard } = useContext(BoardContext);
    const { currentWorkspace } = useContext(WorkspaceContext);
    const handleCloseModal = () => {
        setDisplayCreateBoardModal(false);
    }
    const handleBoardTitle = (e) => {
        console.log(e.target.value);
        setBoardTitle(e.target.value);
    }
    const handleWorkspaceId = (e) => {
        console.log(e);
        setWorkspaceId(e);
    }
    const handleCreateBoard = () => {
        handleCreateNewBoard(boardTitle, workspaceId);
        setDisplayCreateBoardModal(false);
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
                opened={displayCreateBoardModal}
                onClose={() => handleCloseModal()}
                title="Create board"
                overlayProps={{
                    // color: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
                    opacity: 0,
                    blur: 0
                }}
            >
                <TextInput
                    data-autofocus
                    label="Board title"
                    required
                    placeholder=""
                    mt="md"
                    onChange={handleBoardTitle}
                />
                <Select
                    label="Workspace"
                    onChange={handleWorkspaceId}
                    // placeholder="Pick one"
                    data={[
                        { value: currentWorkspace?.id, label: currentWorkspace?.name },
                    ]}
                />
                <Space py={10} />
                <Button onClick={() => handleCreateBoard()}>Create</Button>
            </Modal>
        </>
    )
}

export default CreateBoardModal
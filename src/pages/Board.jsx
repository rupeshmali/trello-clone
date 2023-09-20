import { ActionIcon, Button, Center, Container, Flex, Input, Paper, Space, Text, TextInput, Title } from '@mantine/core'
import React, { useContext, useState } from 'react'
import { FiSearch, FiPlus, FiBell } from 'react-icons/fi';
import { BsThreeDots, BsFire } from 'react-icons/bs';
import { BiPlus } from 'react-icons/bi'
import { CiLock } from 'react-icons/ci';
import { AiOutlineClose } from 'react-icons/ai'
import ListName from '../components/ListName';
import { ListContext } from '../contexts/list';
import { auth } from '../config/fire'
import { useParams } from 'react-router-dom';
import ListItem from '../components/ListItem';
import { WorkspaceContext } from '../contexts/workspace';
import CreateWorkspaceModal from '../components/common/CreateWorkspaceModal';
import { BoardContext } from '../contexts/board';
import CreateBoardModal from '../components/common/CreateBoardModal';


const Board = () => {
    const [displayAddListForm, setDisplayAddListForm] = useState(false);
    const [displayAddListButton, setDisplayAddListButton] = useState(true);
    const [listName, setListName] = useState('Untitled');
    const { handleAddNewList, lists, listItems } = useContext(ListContext);
    const { displayCreateWorkspaceModal } = useContext(WorkspaceContext);
    const { displayCreateBoardModal, getOneBoard } = useContext(BoardContext);
    const { board_id } = useParams();
    // let currentBoard;
    // if(board_id){
      const  currentBoard = getOneBoard(board_id);
    // }
    console.log("currentBoard --> ", currentBoard);

    const handleAddList = () => {
        // userId, boardId, name
        // console.log("uid, board_id, listName : ",auth.currentUser?.uid, board_id, listName);
        // setDisplayAddListForm(false);
        console.log('came inside handleAddList');

        const isSuccessful = handleAddNewList(auth.currentUser?.uid, board_id, listName);
        setDisplayAddListForm(false);
        setDisplayAddListButton(true);
        //    if(isSuccessful){
        //    }
    }
    const handleSetListName = (e) => {
        console.log(e.target.value);
        setListName(e.target.value)
    }
    const handleDisplayAddListForm = () => {
        console.log('came inside handleDisplayAddListForm');
        setDisplayAddListForm(!displayAddListForm);
        setDisplayAddListButton(!displayAddListButton);
    }

    return (
        <Flex maw={1000} miw={1200} mih={700} gap={25} direction={'column'} bg={'#f7f8fa'} p={30} m={'auto'}>
            <Flex align={'center3'} justify={'space-between'}>
                <Input
                    w={300}
                    size='md'
                    icon={<FiSearch />}
                    variant="filled"
                    placeholder="Search for anything"
                    radius={10}
                />
                {/* <TextInput bg={'#f7f8fa'} className='Search-box-board' w={300} size='md' placeholder="Search for anything" icon={<FiSearch size={20} />} radius={10} /> */}
                <Flex gap={15} align={'center'} justify={'flex-end'}>
                    <Button size="md" leftIcon={<FiPlus size={15} />} radius={10}><Text size={15} weight={400}>Create New Board</Text></Button>
                    <ActionIcon bg={'white'} size={40} radius={10}><FiBell size={20} /></ActionIcon>
                    <ActionIcon bg={'white'} size={40} radius={10}><BsThreeDots size={20} /></ActionIcon>
                </Flex>
            </Flex>

            <Flex justify={'space-between'} align={'center'}>
                <Flex direction={'column'} justify={'flex-start'}>
                    <Text color='gray' size={12}>BOARD</Text>
                    <Flex align={'center'} gap={10}>
                        <BsFire size={20} color='orange' />
                        <Text size={25} weight={600}>{currentBoard[0]?.name}</Text>
                    </Flex>
                </Flex>
                <Flex gap={50} align={'center'}>
                    <Flex direction={'column'} justify={'flex-start'}>
                        <Text color='gray' size={12}>VISIBILITY</Text>
                        <Space py={5}></Space>
                        <Flex align={'center'} gap={10}>
                            <CiLock />
                            <Text size={17} weight={600}>Private Board</Text>
                        </Flex>
                    </Flex>
                    <Flex direction={'column'} justify={'flex-start'}>
                        <Text color='gray' size={12}>TEAM</Text>
                        <Space py={5}></Space>
                        <Flex align={'center'} gap={2}>
                            <Button compact radius={100} color='orange'>A</Button>
                            <Button compact radius={100} color='pink'>R</Button>
                            <Button compact radius={100}>G</Button>
                            <Button compact radius={100} color='green'>A</Button>
                            <Button compact w={30} h={30} radius={200} color='blue' variant="light"><FiPlus size={25} /></Button>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
            <Flex gap={25} direction={'row'}>

                {
                    lists.map((list) => {
                        console.log("list.userId, list.boardId :", list.userId, list.boardId);
                        if (list.userId === auth.currentUser?.uid && list.boardId === board_id) {
                            return (
                                <Flex direction={'column'} gap={15}>
                                    <ListName listName={list.name} listId={list.id} />
                                    {/* <ListItem /> */}
                                    {
                                        listItems.map((listItem)=>{
                                            if(listItem.listId === list.id){
                                                return (
                                                    <ListItem listItem={listItem}/>
                                                )
                                            }
                                        })
                                    }
                                </Flex>
                            )
                        } else {
                            return <></>
                        }
                    })
                }

                {displayAddListButton &&
                    <Paper
                        radius={10}
                        variant="outline"
                        bg="#f1f3f5"
                        w={230}
                        h={45}
                        onClick={handleDisplayAddListForm}
                    >
                        <Flex align={'center'} pl={20} py={10} gap={5}>
                            <BiPlus size={20} />
                            <Text>
                                Add new list
                            </Text>
                        </Flex>
                    </Paper>
                }
                {
                    displayAddListForm &&
                    <Paper
                        bg={'#ffffff'}
                        radius={10}
                        p={10}
                        w={230}
                        mah={95}
                    >
                        <Flex direction={'column'} gap={10}>
                            <TextInput
                                data-autofocus
                                placeholder='Enter list title...'
                                onChange={handleSetListName}
                            />
                            <Flex direction={'row'} align={'center'} gap={5}>
                                <Button
                                    onClick={handleAddList}
                                    size='xs'>
                                    Add list
                                </Button>
                                <ActionIcon>
                                    <AiOutlineClose
                                        onClick={handleDisplayAddListForm}
                                        size={20}
                                    />
                                </ActionIcon>
                            </Flex>
                        </Flex>
                    </Paper>


                }
                {
                    displayCreateWorkspaceModal && 
                    <CreateWorkspaceModal />
                }
                {
                    displayCreateBoardModal &&
                    <CreateBoardModal />
                }
                
            </Flex>
        </Flex >
    )
}

export default Board
import React, { useContext } from 'react';
import { ActionIcon, Badge, Box, Button, Center, Container, Divider, Flex, NavLink, Space, Text } from '@mantine/core';
import { BsPerson, BsChevronDown } from 'react-icons/bs'
import { CiViewTable } from 'react-icons/ci'
import { FiTrello } from 'react-icons/fi'
import { BsPlusLg, BsCardImage } from 'react-icons/bs'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { IoIosSettings } from 'react-icons/io';
import { BiCalendar, BiSolidChevronLeft } from 'react-icons/bi';
import { WorkspaceContext } from '../../contexts/workspace';
import { BoardContext } from '../../contexts/board';


const Navbar = () => {
    const navigate = useNavigate();
    const { currentWorkspace } = useContext(WorkspaceContext);
    const { boards } = useContext(BoardContext);
    const location = useLocation();
    // const { workspace_id } = useParams();

    return (
        <Container className='navbar-div' pl={0} pr={0} bg={location.pathname.includes('/b/') && '#f7f8fa'}>

            <Box w={260} pt={50} px={0}>
                <Container px={10} py={5}>
                    <Flex align={'center'} gap={10} justify={'space-between'}>
                        <Flex direction={'row'} align={'center'} gap={10}>
                            <Button miw={32.5} mih={32.5} mah={32.5} maw={32.5} p={0} variant="gradient" gradient={{ from: 'orange', to: 'red' }}  uppercase>
                                <Text weight={700} size={20}>
                                    {
                                        currentWorkspace?.name?.charAt(0)
                                    }
                                </Text>
                            </Button>
                            <Flex direction={'column'} gap={0}>
                                <Text weight={600}>
                                    {currentWorkspace?.name}
                                </Text>
                                <Text size={12}>
                                    Free
                                </Text>
                            </Flex>
                        </Flex>
                        <ActionIcon>
                            <BiSolidChevronLeft size={18} />
                        </ActionIcon>
                    </Flex>
                </Container>
                <Space py={1} />
                <Divider></Divider>
                <Space py={5} />
                <NavLink
                    label={<Text weight={450} color='#909090'>Boards</Text>}
                    icon={<FiTrello size="15" />}
                    pl={15}
                    onClick={() => navigate(`/w/${currentWorkspace.id}`)}
                />
                <NavLink
                    label={<Text weight={450} color='#909090'>Members</Text>}
                    icon={<BsPerson size="15" />}
                    rightSection={<BsPlusLg size="15" />}
                    pl={15} />
                <NavLink
                    label={<Text weight={450} color='#909090'>Workspace settings</Text>}
                    icon={<IoIosSettings size="15" />}
                    rightSection={<BsChevronDown size={15} />}
                    pl={15} />
                <Space py={5} />
                <NavLink
                    label={<Text weight={600} color='#636363'>Workspace views</Text>}
                    pl={10}
                />
                <NavLink
                    label={<Text weight={450} color='#909090'>Table</Text>}
                    icon={<CiViewTable size="15" />}
                    pl={15}
                    onClick={() => navigate('/boards')}
                />
                <NavLink
                    label={<Text weight={450} color='#909090'>Calendar</Text>}
                    icon={<BiCalendar size="15" />}
                    pl={15}
                    onClick={() => navigate('/boards')}
                />
                <Space py={5} />
                <NavLink
                    label={<Text weight={600} color='#636363'>Your boards</Text>}
                    rightSection={<BsPlusLg size="15" />}
                    pl={10}
                />
                {
                    boards?.map((board) => {
                        // console.log({workspace_id});
                        // console.log({board});
                        if (currentWorkspace?.id === board?.workspaceId) {
                            return (
                                <NavLink
                                    label={<Text weight={600} color='#636363'>{board?.name}</Text>}
                                    icon={<BsCardImage size="15" />}
                                    pl={15}
                                    onClick={()=> navigate(`/b/${board.id}`)}
                                />
                            )
                        }else{
                            return (
                                <></>
                            )
                        }
                    })
                }


            </Box>
        </Container>
    )
}

export default Navbar
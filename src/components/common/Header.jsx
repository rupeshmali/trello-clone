import { Button, Container, Flex, Text, Header as MantineHeader, Center, Title, ActionIcon, Menu } from '@mantine/core'
import React, { useContext } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { BsTrello, BsChevronDown } from 'react-icons/bs'
import { BiGroup } from 'react-icons/bi'
import { WorkspaceContext } from '../../contexts/workspace'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { BoardContext } from '../../contexts/board'
import auth, { AuthContext } from '../../contexts/authentication/auth'

const Header = () => {
    const { setDisplayCreateWorkspaceModal, workspaces, currentWorkspace, setCurrentWorkspace } = useContext(WorkspaceContext);
    const { setDisplayCreateBoardModal } = useContext(BoardContext);
    const { logout } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        const loggedout = logout();
        if (loggedout) {
            navigate('/login');
        }
    }
    const handleDisplayBoardModal = () => {
        console.log("Came inside handleDisplayBoardModal");
        setDisplayCreateBoardModal(true);
    }
    const handleDisplayWorkspaceModal = () => {
        console.log("Came inside handleDisplayWorkspaceModal");
        setDisplayCreateWorkspaceModal(true);
    }
    const handleCurrentWorkspace = (workspace) => {
        setCurrentWorkspace(workspace);

        console.log("Saving in localstorage....");
        localStorage.setItem('recentWorkspaceID', workspace?.id + '_' + auth.currentUser?.uid);
    }
    return (
        <MantineHeader pt={5} height={48} pl={15} pr={15} bg={location.pathname.includes('/b/') && '#f7f8fa'}>
            <Flex align='center' justify={'space-between'} wrap={'wrap'}>
                <Flex align={'center'} gap={8}>
                    <BsTrello size={16} />
                    <Flex align={'center'} gap={12}>
                        <Title size={20} color='#636363'>Trello Clone</Title>
                        <Flex align={'center'} gap={5}>
                            <Menu shadow="md" width={300} position="bottom-start">
                                <Menu.Target>
                                    <Button px={10} rightIcon={<BsChevronDown />} variant="subtle" color='gray'><Text weight={400}>Workspaces</Text></Button>
                                </Menu.Target>
                                <Menu.Dropdown>
                                    <Menu.Label>
                                        Current WorkSpace
                                    </Menu.Label>
                                    <Menu.Item
                                        icon={
                                            <Button px={10} py={5} variant="gradient" gradient={{ from: 'orange', to: 'red' }} size="sm" uppercase>
                                                <Text weight={700} size={20}>
                                                    {
                                                        currentWorkspace?.name?.charAt(0)
                                                    }
                                                </Text>
                                            </Button>
                                        }
                                    >
                                        <Text>{currentWorkspace?.name}</Text>
                                    </Menu.Item>
                                    <Menu.Label>
                                        Your Workspaces
                                    </Menu.Label>
                                    {workspaces.map((workspace) => {
                                        console.log("Workspace---> workspace.userId, auth.currentUser?.uid ", workspace.userId, auth.currentUser?.uid);
                                        if (workspace.userId === auth.currentUser?.uid) {
                                            return (
                                                <Menu.Item
                                                    component={Link}
                                                    to={`w/${workspace.id}`}
                                                    icon={
                                                        <Button px={10} py={5} variant="gradient" gradient={{ from: 'orange', to: 'red' }} size="sm" uppercase>
                                                            <Text weight={700} size={20}>
                                                                {
                                                                    workspace?.name?.charAt(0)
                                                                }
                                                            </Text>
                                                        </Button>
                                                    }
                                                    onClick={() => handleCurrentWorkspace(workspace)}
                                                    id={workspace.id}
                                                >
                                                    <Text>{workspace?.name}</Text>
                                                </Menu.Item>
                                            )
                                        }

                                    })
                                    }

                                </Menu.Dropdown>
                            </Menu>
                            <Button px={10} rightIcon={<BsChevronDown />} variant="subtle" color='gray'><Text weight={400}>Recent</Text></Button>
                            <Button px={10} rightIcon={<BsChevronDown />} variant='subtle' color='gray'><Text weight={400}>Starred</Text></Button>
                        </Flex>
                        <Menu shadow="md" width={300} position="bottom-start" radius={8} offset={10}>

                            <Menu.Target>
                                <Button radius={3} size="xs"><Text weight={400} size={14}>Create</Text></Button>
                            </Menu.Target>

                            <Menu.Dropdown>
                                <Menu.Item
                                    icon={<BsTrello size={15} />}
                                    onClick={() => handleDisplayBoardModal()}
                                >
                                    <Text>Create board</Text>
                                </Menu.Item>
                                <Menu.Label>
                                    <Text>A board is made up of cards ordered on lists. Use it to manage projects, track information, or organize anything.</Text>
                                </Menu.Label>
                                <Menu.Item
                                    icon={<BiGroup size={15} />}
                                    onClick={() => handleDisplayWorkspaceModal()}
                                >
                                    <Text>Create Workspace</Text>
                                </Menu.Item>
                                <Menu.Label>
                                    <Text>
                                        A Workspace is a group of boards and people. Use it to organize your company, side hustle, family, or friends.
                                    </Text>
                                </Menu.Label>
                            </Menu.Dropdown>
                        </Menu>
                    </Flex>
                </Flex>
                <Flex align={'center'}>
                    <Button onClick={handleLogout} color='dark'>Log out</Button>
                    <ActionIcon ><FaUserCircle size={22.5} /></ActionIcon>
                </Flex>

            </Flex>
        </MantineHeader>

    )
}

export default Header
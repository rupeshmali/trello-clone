import { BackgroundImage, Box, Button, Center, Container, Divider, Flex, Input, Paper, Select, Space, Text, TextInput, Title } from '@mantine/core'
import React, { useContext, useEffect, useState } from 'react'
import { WorkspaceContext } from '../contexts/workspace';
import CreateBoardModal from '../components/common/CreateBoardModal';
import CreateWorkspaceModal from '../components/common/CreateWorkspaceModal';
import { BoardContext } from '../contexts/board';
import { CiEdit, CiLock } from 'react-icons/ci';

import { BiPencil } from 'react-icons/bi';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { FiSearch } from 'react-icons/fi';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/fire';



const Home = () => {

  const { displayCreateWorkspaceModal, currentWorkspace } = useContext(WorkspaceContext);
  const { displayCreateBoardModal, boards } = useContext(BoardContext);
  const [user,setUser] = useState({});
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
            setUser(currentUser);
        }
    })
}, [])
  return (
    <Container p={0} m={'auto'} maw={1250}>
      {displayCreateBoardModal && <CreateBoardModal />}
      {displayCreateWorkspaceModal && <CreateWorkspaceModal />}
      <Flex maw={1030} gap={280} wrap={'wrap'} align={'flex-start'} className='boardname-large-container' pb={30} mx={'auto'} pt={30} pl={185} >
        <Flex direction={'row'} align={'center'} gap={10}>
          <Button miw={60} mih={60} mah={60} maw={60} p={0} variant="gradient" gradient={{ from: 'orange', to: 'red' }} uppercase>
            <Text weight={700} size={35}>
              {
                currentWorkspace?.name?.charAt(0)
              }
            </Text>
          </Button>
          <Flex direction={'column'} gap={0}>
            <Flex direction={'row'} align={'center'} gap={8}>
              <Text weight={600} size={20} c={'#172b4d'}>
                {currentWorkspace?.name}
              </Text>
              <BiPencil />
            </Flex>
            <Flex gap={2} align={'center'}>
              <CiLock size={15} />
              <Text size={12}>
                Private
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Container>
          <Button radius={3} leftIcon={<AiOutlineUserAdd size={20} />} ><Text weight={400}>Invite Workspace members</Text></Button>
        </Container>
      </Flex>

      <Space py={15} />

      <Container m={0} maw={1500}>
        <Title size={20} weight={500} c={'#172b4d'}>Boards</Title>
        <Space py={25} />
        <Flex wrap={'wrap'} justify={'space-between'} align={'flex-end'}>

          <Flex gap={10}>
            <Select
              maw={200}
              label="Sort by"
              placeholder="Most recently active"
              data={[
                { value: 'Least recently active', label: 'Least recently active' },
                { value: 'Most recently active', label: 'Most recently active' },
                { value: 'Alphabetically A-Z', label: 'Alphabetically A-Z' },
                { value: 'Alphabetically Z-A', label: 'Alphabetically Z-A' },
              ]}
            />
            <Select
              maw={200}
              label="Filter by"
              placeholder="Most recently active"
              data={[
                { value: 'Least recently active', label: 'Least recently active' },
                { value: 'Most recently active', label: 'Most recently active' },
                { value: 'Alphabetically A-Z', label: 'Alphabetically A-Z' },
                { value: 'Alphabetically Z-A', label: 'Alphabetically Z-A' },
              ]}
            />
          </Flex>
          <TextInput label="Search" placeholder="Search boards" icon={<FiSearch />} />
        </Flex>
        <Space py={20} />
        <Flex gap={22}  wrap={'wrap'} justify={'inherit'} maw={1218} miw={1218}>
          <Paper miw={288} mih={90} bg={'#f5f5f5'} mah={90} radius={'sm'}>
            <Center>
              <Text pt={30}>
                Create new board
              </Text>
            </Center>
          </Paper>
          {/* <Paper miw={282} h={90} withBorder className='paper' radius={2}>
            <Text pt={30} align='center' >Create new board</Text>
          </Paper> */}


          {

            boards?.map((board) => {
              // console.log({workspace_id});
              // console.log({board});
              if (currentWorkspace?.id === board?.workspaceId) {
                return (
                  <Box miw={288} mih={90} mah={90}>
                    <BackgroundImage
                      src="https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80"
                      radius="sm"
                      w={288}
                      h={90}
                    >
                      {/* <Center> */}
                      <Text color="#fff" weight={700} pl={10} pt={5}>
                        {board?.name}
                      </Text>
                      {/* </Center> */}
                    </BackgroundImage>
                  </Box>
                )
              } else {
                return (
                  <></>
                )
              }
            })

          }

        </Flex>
      </Container>
    </Container>
  )
}

export default Home
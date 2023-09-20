import { ActionIcon, Badge, Button, Card, Center, Container, Flex, Group, Image, Input, Paper, Space, Text, TextInput } from '@mantine/core'
import React, { useContext, useState } from 'react'
import { BiPencil } from 'react-icons/bi';
import UpdateListItemForm from './UpdateListItemForm';
import ListName from './ListName';
import { ListContext } from '../contexts/list';


const ListItem = ({ listItem }) => {
    const [title, setTitle] = useState('');
    const [isUpdateModeOn, setIsUpdateModeOn] = useState(false);

    const handleUpdate = (currentItemId) => {
        console.log({ currentItemId });
        setIsUpdateModeOn(true);
    }

    return (
        <Flex direction='column' gap={15} className='list-name'>
            {
                isUpdateModeOn ?
                    <UpdateListItemForm listItem={listItem} setIsUpdateModeOn={setIsUpdateModeOn} /> :
                    <Card shadow="sm" padding='lg' radius="lg" w={230} >
                        <Card.Section>

                        </Card.Section>
                        {
                            (listItem.priority === 'high') &&
                            <Badge color="red" variant="light" radius={6} mt={20}>
                                {listItem.priority}
                            </Badge>
                        }
                        {
                            (listItem.priority === 'medium') &&
                            <Badge color="yellow" variant="light" radius={6} mt={20}>
                                {listItem.priority}
                            </Badge>
                        }{  
                            (listItem.priority === 'low') &&
                            <Badge color="green" variant="light" radius={6} mt={20}>
                                {listItem.priority}
                            </Badge>
                        }
                      
                        <Space py={2.5} />
                        <Text weight={500}>{listItem.name}</Text>
                        <Text size="sm" color="dimmed">
                            {listItem.description}
                        </Text>
                        <Flex justify={'space-between'} align={'baseline'}>
                            <Button variant={listItem?.dueDate?.seconds ? 'light' : 'white' } color='gray' mt="md" radius="md" compact>
                              {console.log({listItem})}
                                <Text size={12}>{new Date(listItem.dueDate.seconds * 1000).toLocaleDateString()}</Text>
                            </Button>
                            {
                                isUpdateModeOn && <Button compact variant='light'>Finish</Button>
                            }
                            <ActionIcon onClick={() => handleUpdate(listItem.id)}><BiPencil color='gray' /></ActionIcon>
                        </Flex>
                    </Card>
            }


        </Flex>
    )
}

export default ListItem
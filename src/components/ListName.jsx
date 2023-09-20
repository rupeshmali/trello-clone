import { ActionIcon, Flex, Menu, Paper, SegmentedControl, Text, TextInput } from '@mantine/core'
import React, { useContext, useState } from 'react'
import { FiSearch, FiPlus, FiBell } from 'react-icons/fi';
import { BsThreeDots, BsFire } from 'react-icons/bs';
import ListItemForm from './AddListItemForm';
import { DatePicker } from '@mantine/dates';
import { ListContext } from '../contexts/list';

const ListName = ({ listName, listId }) => {

    const {  displayListItemForm,setDisplayListItemForm } = useContext(ListContext);

    return (
        <Paper bg={'white'} radius={10} px={15} py={10} miw={230} maw={230} mih={45} mah={45}>
            <Flex justify={'space-between'} align={'center'}>
                <Text weight={700} c={'dark'}>
                    {listName}
                </Text>
                <Flex align={'center'} gap={5}>
                    <ActionIcon variant="subtle" size='sm' radius={6}><BsThreeDots size={15} /></ActionIcon>
                    <Menu shadow='md' width={230} offset={0} position="bottom" radius={20}>
                        <Menu.Target>
                            <ActionIcon onClick={()=>setDisplayListItemForm(true)} variant="light" size='sm' radius={6}><FiPlus color='blue' size={15} /></ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                                <ListItemForm listId={listId} />
                        </Menu.Dropdown>
                    </Menu>

                </Flex>
            </Flex>
        </Paper>

    )
}

export default ListName
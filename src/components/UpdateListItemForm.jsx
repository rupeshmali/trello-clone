import { ActionIcon, Badge, Button, Card, Flex, Input, SegmentedControl, Space, Text, TextInput } from '@mantine/core'
import { DatePicker, DatePickerInput } from '@mantine/dates'
import React, { useContext, useState } from 'react'
import { ListContext } from '../contexts/list';
import { auth } from '../config/fire';

const UpdateListItemForm = ({ listItem, setIsUpdateModeOn }) => {

    const [name, setName] = useState(listItem?.name);
    const [description, setDescription] = useState(listItem?.description);
    const [priority, setPriority] = useState(listItem.priority);
    const [dueDate, setDueDate] = useState(null);

    const { handleAddListItem, setDisplayListItemForm, handleUpdateListItem } = useContext(ListContext);

    const handleName = (e) => {
        setName(e.target.value);
    }
    const handleDescription = (e) => {
        setDescription(e.target.value);
    }
    const handleUpdateItem = () => {
        //   const handleUpdateListItem = async (listItemId,userId,listId,name,description,priority,dueDate)=>{

        // userId, listId, name, description, priority, dueDate
        handleUpdateListItem(listItem.id, auth.currentUser?.uid, listItem.listId, name, description, priority, dueDate);
        setIsUpdateModeOn(false);
        // setDisplayListItemForm(false);
    }


    return (
        <Flex direction={'column'} p={10} gap={5} bg={'#ffffff'}>
            <SegmentedControl
                value={priority}
                onChange={setPriority}
                data={[
                    { label: 'High', value: 'high' },
                    { label: 'Medium', value: 'medium' },
                    { label: 'Low', value: 'low' }
                ]}
            />

            <Input value={name} onChange={handleName} />
            <Input value={description} placeholder='Description...' onChange={handleDescription} />

            {<DatePickerInput
                placeholder="Pick due date"
                value={dueDate}
                onChange={setDueDate}
            />}
            <Space py={2.5}></Space>
            <Button onClick={handleUpdateItem} compact variant='light' color='dark'>Update</Button>
        </Flex>

    )
}

export default UpdateListItemForm
import { ActionIcon, Badge, Button, Card, Flex, SegmentedControl, Space, Text, TextInput } from '@mantine/core'
import { DatePicker, DatePickerInput } from '@mantine/dates'
import React, { useContext, useState } from 'react'
import { ListContext } from '../contexts/list';
import { auth } from '../config/fire';



const AddListItemForm = ({ listId }) => {
    const [name, setName] = useState('Untitled');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('low');
    const [dueDate, setDueDate] = useState(null);

    const { handleAddListItem, setDisplayListItemForm } = useContext(ListContext);

    const handleName = (e) => {
        setName(e.target.value);
    }
    const handleDescription = (e) => {
        setDescription(e.target.value);
    }
    const handleAddItem = () => {
        // userId, listId, name, description, priority, dueDate
        handleAddListItem(auth.currentUser?.uid, listId, name, description, priority, dueDate);
        setDisplayListItemForm(false);
    }

    return (
        <Flex direction={'column'} p={10} gap={0}>
            <TextInput label='Title' required onChange={handleName}></TextInput>
            <TextInput label='Description' onChange={handleDescription}></TextInput>
            <Text weight={500} size={14} >Priority</Text>
            <SegmentedControl
                value={priority}
                onChange={setPriority}
                data={[
                    { label: 'High', value: 'high' },
                    { label: 'Medium', value: 'medium' },
                    { label: 'Low', value: 'low' }
                ]}
            />

            {<DatePickerInput
                label="Due date"
                placeholder="Pick date"
                value={dueDate}
                onChange={(value)=>setDueDate(new Date(value))}
            />}
            <Space py={10}></Space>
            <Button onClick={handleAddItem}>Add Item</Button>
        </Flex>

    )
}

export default AddListItemForm
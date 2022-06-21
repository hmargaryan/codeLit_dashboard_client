import React from 'react'

import {Button, Text, Box} from "@mantine/core";

import { useFetchTaskQuery } from '../../../store/services/taskApi'

const Task = ({ id, onEditorChange }) => {
    const { data } = useFetchTaskQuery(id)

    const handleLoadTaskButtonClick = () => {
        onEditorChange(`// ${data.description}\n\n${data?.template}`)
    }

    return (
        <Box>
            <Text mb='sm'>{data?.description}</Text>
            <Button compact color="green" onClick={handleLoadTaskButtonClick}>Вставить задачу</Button>
        </Box>
    )
}

export default Task

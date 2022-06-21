import React, { useState, useEffect } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { TransferList, useMantineTheme } from '@mantine/core'
import { useFetchTasksQuery } from '../../../store/services/taskApi'

const Tasks = ({ stepIndex }) => {
    const theme = useMantineTheme()
    const { data: tasks } = useFetchTasksQuery()
    const { control } = useFormContext()
    const { fields: selectedTasks, replace } = useFieldArray({ control, name: `steps[${stepIndex}].tasks` })
    const [data, setData] = useState([[], selectedTasks])

    useEffect(() => {
        if (tasks) {
            const selectedTasksIds = data[1].map((task) => task.value)
            setData((prevState) => [
                tasks.filter((task) => !selectedTasksIds.includes(task.id)).map((task) => ({ value: task.id, label: task.name })),
                prevState[1]
            ])
        }
    }, [tasks])

    const handleTasksChange = (props) => {
        replace(props[1].map((prop) => prop))
        setData(props)
    }

    return (
        <TransferList
            styles={{
                transferListTitle: {
                    fontSize: theme.fontSizes.sm,
                    color: theme.colorScheme === 'dark' && theme.colors.dark[0]
                }
            }}
            value={data}
            onChange={handleTasksChange}
            searchPlaceholder='Найдите задачу'
            nothingFound='Нет задач'
            titles={['Задачи рабочего пространства', 'Задачи раздела']}
            breakpoint='sm' />
    )
}

export default Tasks

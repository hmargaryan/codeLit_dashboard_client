import React from 'react'
import {useFieldArray, useFormContext} from 'react-hook-form'
import {
    Button,
    TextInput,
    Group,
    Box,
    ActionIcon,
    useMantineTheme,
} from '@mantine/core'
import { Trash } from 'tabler-icons-react'
import Questions from './Questions'
import steps from "./Steps";

const QuestionBlocks = ({ stepIndex }) => {
    const theme = useMantineTheme()
    const { register, control, formState: { errors } } = useFormContext()
    const { fields: questionBlocks, append, remove } = useFieldArray({ control, name: `steps[${stepIndex}].questionBlocks` })

    const handleAddQuestionBlockButtonClick = () => {
        append({
            name: '',
            questions: [{
                name: '',
                type: 'text',
                answers: []
            }]
        })
    }

    const handleQuestionBlockDelete = (event) => {
        const target = event.target.closest('button')

        if (target?.dataset?.questionBlockDeleteIndex) {
            remove(Number(target?.dataset?.questionBlockDeleteIndex))
        }
    }

    return (
        <Box onClick={handleQuestionBlockDelete}>
            {questionBlocks.map((questionBlock, index) => {
                return (
                    <Box
                        key={questionBlock.id}
                        sx={{ backgroundColor: theme.colorScheme === 'light' ? theme.colors.gray[1] : theme.colors.dark[5], borderRadius: 4 }}
                        p='sm'
                        mb='sm'>
                        <Group mb='lg' align={errors?.steps?.[stepIndex]?.questionBlocks?.[index]?.name?.message ? 'center' : 'flex-end'}>
                            <TextInput
                                key={questionBlock.id}
                                styles={{ input: {
                                    backgroundColor: theme.colorScheme === 'dark' && theme.colors.dark[8],
                                    border: theme.colorScheme === 'dark' && `1px solid ${theme.colors.dark[3]}`
                                }}}
                                sx={{ flexGrow: 1 }}
                                label='Название блока'
                                placeholder='Типы данных'
                                error={errors?.steps?.[stepIndex]?.questionBlocks?.[index]?.name?.message}
                                {...register(`steps[${stepIndex}].questionBlocks[${index}].name`)} />
                            <ActionIcon
                                size={36}
                                color='red'
                                variant='light'
                                data-question-block-delete-index={index}>
                                <Trash size={18} />
                            </ActionIcon>
                        </Group>
                        <Questions stepIndex={stepIndex} questionBlockIndex={index} />
                    </Box>
                )
            })}
            <Button variant='light' mb='lg' onClick={handleAddQuestionBlockButtonClick}>
                Добавить блок вопросов
            </Button>
        </Box>
    )
}

export default QuestionBlocks

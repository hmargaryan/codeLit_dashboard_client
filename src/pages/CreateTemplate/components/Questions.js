import React from 'react'
import {
    Box,
    Button,
    Group,
    TextInput,
    NativeSelect,
    ActionIcon,
    useMantineTheme
} from '@mantine/core'
import { Trash } from 'tabler-icons-react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import Answers from './Answers'

const QUESTION_TYPE = [
    { value: 'text', label: 'Текст' },
    { value: 'radio', label: 'Один правильный ответ' },
    { value: 'checkbox', label: 'Несколько правильных ответов' }
]

const Questions = ({ stepIndex, questionBlockIndex }) => {
    const theme = useMantineTheme()
    const { register, control, formState: { errors } } = useFormContext()
    const { fields: questions, append, remove, update } = useFieldArray({
        control,
        name: `steps[${stepIndex}].questionBlocks[${questionBlockIndex}].questions`
    })

    const handleAddQuestionButtonClick = () => {
        append({
            name: '',
            type: 'text',
            answers: []
        })
    }

    const handleQuestionDelete = (event) => {
        const target = event.target.closest('button')

        if (target?.dataset?.questionDeleteIndex) {
            remove(Number(target?.dataset?.questionDeleteIndex))
        }
    }

    const handleAnswerTypeChange = (event, index) => {
        const value = event.target.value
        const question = value === 'text'
            ? { name: questions[index].name, type: value }
            : { name: questions[index].name, type: value, answers: [] }

        update(index, question)
    }

    return (
        <Box onClick={handleQuestionDelete}>
            {questions.map((question, index) => {
                return (
                    <Box
                        key={question.id}
                        sx={{
                            backgroundColor: theme.colorScheme === 'light' ? '#fdfeff' : theme.colors.dark[8], borderRadius: 4,
                            border: `1px solid ${theme.colorScheme === 'light' ? theme.colors.gray[4] : theme.colors.dark[3]}`
                        }}
                        p='sm'
                        mb='sm'>
                        <Group mb='lg' align={errors?.steps?.[stepIndex]?.questionBlocks?.[questionBlockIndex]?.questions?.[index]?.name?.message ? 'baseline' : 'flex-end'}>
                            <TextInput
                                key={question.id}
                                sx={{ flexGrow: 1 }}
                                label='Вопрос'
                                placeholder='Чем отличаются примитивы от объектов?'
                                error={errors?.steps?.[stepIndex]?.questionBlocks?.[questionBlockIndex]?.questions?.[index]?.name?.message}
                                {...register(`steps[${stepIndex}].questionBlocks[${questionBlockIndex}].questions[${index}].name`)} />
                            <NativeSelect
                                label='Тип ответа'
                                data={QUESTION_TYPE}
                                {...register(`steps[${stepIndex}].questionBlocks[${questionBlockIndex}].questions[${index}].type`)}
                                onChange={(event) => handleAnswerTypeChange(event, index)} />
                            <ActionIcon
                                sx={{ alignSelf: errors?.steps?.[stepIndex]?.questionBlocks?.[questionBlockIndex]?.questions?.[index]?.name?.message && 'center' }}
                                size={36}
                                color='red'
                                variant='light'
                                data-question-delete-index={index}>
                                <Trash size={18} />
                            </ActionIcon>
                        </Group>
                        {question.type !== 'text' && (
                            <Answers stepIndex={stepIndex} questionBlockIndex={questionBlockIndex} questionIndex={index} />
                        )}
                    </Box>
                )
            })}
            <Button variant='light' compact onClick={handleAddQuestionButtonClick}>
                Добавить вопрос
            </Button>
        </Box>
    )
}

export default Questions

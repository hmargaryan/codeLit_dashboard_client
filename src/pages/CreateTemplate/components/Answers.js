import React from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { MultiSelect } from '@mantine/core'

const Answers = ({ stepIndex, questionBlockIndex, questionIndex }) => {
    const { control, formState: { errors } } = useFormContext()
    const { fields: answers, replace} = useFieldArray({
        control,
        name: `steps[${stepIndex}].questionBlocks[${questionBlockIndex}].questions[${questionIndex}].answers`
    })

    const handleAnswersChange = (data) => {
        replace(data.map((answer) => ({ name: answer })))
    }

    return (
        <MultiSelect
            label='Ответы'
            onChange={handleAnswersChange}
            value={answers.map((answer) => answer.name)}
            data={answers.map((answer) => answer.name)}
            placeholder='Начните печатать ответ'
            searchable
            creatable
            getCreateLabel={(query) => `+ Добавить ${query}`}
            error={errors?.steps?.[stepIndex]?.questionBlocks?.[questionBlockIndex]?.questions?.[questionIndex]?.answers?.message} />
    )
}

export default Answers

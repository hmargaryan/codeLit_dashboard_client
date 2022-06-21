import React from 'react'
import { useFormContext } from 'react-hook-form'
import { TextInput, Group, Box, ActionIcon } from '@mantine/core'
import { Trash } from 'tabler-icons-react'
import QuestionBlocks from './QuestionBlocks'
import Tasks from './Tasks'

const Steps = ({ activeStep, steps }) => {
    const { register, formState: { errors } } = useFormContext()

    return (
        steps.map((step, index) => {
            return (
                <Box key={step.id} sx={{ display: index !== activeStep && 'none' }}>
                    <Group mb='lg' align={errors?.steps?.[index]?.name?.message ? 'center' : 'flex-end'}>
                        <TextInput
                            sx={{ flexGrow: 1 }}
                            variant='filled'
                            label='Название раздела'
                            placeholder='Javascript'
                            error={errors?.steps?.[index]?.name?.message}
                            {...register(`steps[${index}].name`)} />
                        {steps.length !== 1 && (
                            <ActionIcon
                                size={36}
                                color='red'
                                variant='light'
                                data-is-step-delete={true}>
                                <Trash size={18} />
                            </ActionIcon>
                        )}
                    </Group>
                    <QuestionBlocks stepIndex={index} />
                    <Tasks stepIndex={index} />
                </Box>
            )
        })
    )
}

export default Steps

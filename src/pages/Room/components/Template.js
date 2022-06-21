import React, { useState } from 'react'

import {
    Text,
    Box,
    ActionIcon,
    Group,
    Stack,
    Textarea,
    RadioGroup,
    Radio,
    CheckboxGroup,
    Checkbox,
    Accordion, Button, NativeSelect
} from "@mantine/core"
import { useModals } from '@mantine/modals';
import cookie from "js-cookie";
import { useForm, FormProvider, useFieldArray } from 'react-hook-form'
import { ArrowNarrowLeft, ArrowNarrowRight, PlayerPlay } from 'tabler-icons-react';

import { useAddInterviewSessionResultMutation } from '../../../store/services/interviewApi'
import Task from './Task'

const Template = ({ sessionId, template, onEditorChange }) => {
    const [currentStep, setCurrentStep] = useState(0)
    const user = cookie.get('user')
    const modals = useModals()
    const { control, register, handleSubmit } = useForm()
    const [addInterviewSessionResult, { data, isLoading }] = useAddInterviewSessionResultMutation()

    const handlePreviousStep = () => {
        setCurrentStep((prevState) => {
            setCurrentStep(prevState - 1)
        })
    }

    const handleEndInterview = async (id, data) => {
        try {
            modals.closeModal(id)
            await addInterviewSessionResult({id: sessionId, body: {...data, hard: 'Хорошо', soft: 'Хорошо', sumup: 'Хорошо', mark: 'approve'}}).unwrap()
        } catch(e) {
            console.log(e)
        }
    }

    const openContentModal = (data) => {
        const id = modals.openModal({
            title: 'Оценка кандидата',
            children: (
                <>
                    <Textarea mb='sm' label='Хард-скиллы' />
                    <Textarea mb='sm' label='Софт-скиллы' />
                    <Textarea mb='sm' label='Общее впечатление' />
                    <NativeSelect
                        defaultValue=''
                        placeholder='Выбериете значение'
                        data={['Отказать', 'Нейтрально', 'Одобрить']}
                        label='Рекомендация'
                    />
                    <Button fullWidth onClick={() => handleEndInterview(id, data)} mt="md">
                        Отправить
                    </Button>
                </>
            ),
        });
    };

    const handleNextStep = () => {
        setCurrentStep((prevState) => {
            setCurrentStep(prevState + 1)
        })
    }

    const handleFormSubmit = async (data) => {
        openContentModal(data)
    }

    return (
        <Stack style={{ width: '40%' }} p='md' justify="space-between">
            <form onSubmit={handleSubmit(handleFormSubmit)} style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', height: '100%' }}>
            {template?.data?.steps?.map((step, stepIndex) => {
                return (
                    <Box key={stepIndex} style={{ display: currentStep === stepIndex ? 'block' : 'none' }}>
                        <Text weight='bold' mb='sm'>{step.name}</Text>
                        {step?.questionBlocks?.map((questionBlocks, questionBlockIndex) => {
                            return (
                                <Box mb='sm' p='sm' sx={(theme) => ({ backgroundColor: theme.colorScheme === 'light' ? theme.colors.gray[1] : theme.colors.dark[5], borderRadius: 4 })}>
                                    <Text mb='sm'>{questionBlocks.name}</Text>
                                        {questionBlocks?.questions?.map((question, questionIndex) => {
                                            switch (question.type) {
                                                case 'text':
                                                    return <Textarea key={questionIndex} mb='sm' label={question.name} {...register(`steps.${stepIndex}.questionBlocks.${questionBlockIndex}.${question.name}`)} />
                                                case 'radio':
                                                    return (
                                                        <RadioGroup
                                                            key={questionIndex}
                                                            spacing="xl"
                                                            mb='lg'
                                                            label={question.name}>
                                                            {question?.answers?.map((answer) => {
                                                                return <Radio value={answer.name} {...register(`steps.${stepIndex}.questionBlocks.${questionBlockIndex}.${question.name}`)} name={`steps.${stepIndex}.questionBlocks.${questionBlockIndex}.${question.name}`} label={answer.name} />
                                                            })}
                                                        </RadioGroup>
                                                    )
                                                case 'checkbox':
                                                    return (
                                                        <CheckboxGroup
                                                            key={questionIndex}
                                                            spacing="xl"
                                                            mb='lg'
                                                            label={question.name}>
                                                            {question?.answers?.map((answer) => {
                                                                return <Checkbox value={answer.name} label={answer.name} {...register(`steps.${stepIndex}.questionBlocks.${questionBlockIndex}.${question.name}`)} />
                                                            })}
                                                        </CheckboxGroup>
                                                    )
                                            }
                                        })}
                                </Box>
                            )
                        })}
                        {step?.tasks?.length > 0 && (
                            <Box mb='sm'>
                                <Text weight='bold' mb='sm'>Задачи</Text>
                                <Accordion>
                                    {step.tasks.map((task) => {
                                        return (
                                            <Accordion.Item label={task.label}>
                                                <Task id={task.value} onEditorChange={onEditorChange} />
                                            </Accordion.Item>
                                        )
                                    })}
                                </Accordion>
                            </Box>
                        )}
                        <Textarea mb='sm' label='Комментарии' {...register(`steps.${stepIndex}.comment`)} />
                    </Box>
                )
            })}
                <Box>
            <Group position="apart" mb='xl'>
                <ActionIcon
                    color="blue"
                    variant="light"
                    disabled={currentStep === 0}
                    onClick={handlePreviousStep}>
                    <ArrowNarrowLeft />
                </ActionIcon>
                <ActionIcon
                    color="blue"
                    variant="light"
                    disabled={currentStep === template?.data?.steps?.length - 1}
                    onClick={handleNextStep}>
                    <ArrowNarrowRight />
                </ActionIcon>
            </Group>
                {user && <Button color="red" type='submit'>Завершить интервью</Button>}
                </Box>
            </form>
        </Stack>
    )
}

export default Template

import React from 'react'

import {Modal, Text, Divider, Box} from "@mantine/core";
import {findAllByDisplayValue} from "@testing-library/react";

const Results = ({ isOpened, onClose, data }) => {
    console.log(data)
    return (
        <Modal
            opened={isOpened}
            size='lg'
            title={<Text size='lg' weight={700}>Результаты</Text>}
            closeButtonLabel='Закрыть окно результатов кандидата'
            onClose={onClose}>
            {data?.steps?.map((step, index) => {
                return (
                    <>
                        <Text weight='bold' mb='sm'>{index === 0 ? 'Javascript' : 'React'}</Text>
                        {step?.questionBlocks?.map((questionBlocks, questionBlockIndex) => {
                            return (
                                <Box mb='sm' p='sm' sx={(theme) => ({ backgroundColor: theme.colorScheme === 'light' ? theme.colors.gray[1] : theme.colors.dark[5], borderRadius: 4 })}>
                                    <Text weight='bold' mb='sm'>{index === 0 ? questionBlockIndex === 0 ? 'Типы данных' : 'Массивы' : 'Хуки'}</Text>
                                    {Object.entries(questionBlocks)?.map((question) => {
                                        return (
                                            <Box mb='md'>
                                                <Text>{question[0]}</Text>
                                                <Text>Ответ: {Array.isArray(question[1]) ? question[1].join(', ') : question[1] || '–'}</Text>
                                            </Box>
                                        )
                                    })}
                                </Box>
                            )
                        })}
                        <Box mb='sm' p='sm' sx={(theme) => ({ backgroundColor: theme.colorScheme === 'light' ? theme.colors.gray[1] : theme.colors.dark[5], borderRadius: 4 })}>
                            <Text weight='bold' mb='sm'>Комментарии</Text>
                            <Text>{step.comment || '–'}</Text>
                        </Box>
                    </>
                )
            })}
            <Divider my="sm" />
            <Text weight='bold' mb='sm'>Оценка</Text>
            <Box mb='sm' p='sm' sx={(theme) => ({ backgroundColor: theme.colorScheme === 'light' ? theme.colors.gray[1] : theme.colors.dark[5], borderRadius: 4 })}>
                <Text weight='bold' mb='sm'>Хард-скиллы</Text>
                <Text>{data?.hard}</Text>
            </Box>
            <Box mb='sm' p='sm' sx={(theme) => ({ backgroundColor: theme.colorScheme === 'light' ? theme.colors.gray[1] : theme.colors.dark[5], borderRadius: 4 })}>
                <Text weight='bold' mb='sm'>Софт-скиллы</Text>
                <Text>{data?.soft}</Text>
            </Box>
            <Box mb='sm' p='sm' sx={(theme) => ({ backgroundColor: theme.colorScheme === 'light' ? theme.colors.gray[1] : theme.colors.dark[5], borderRadius: 4 })}>
                <Text weight='bold' mb='sm'>Общее впечатление</Text>
                <Text>{data?.sumup}</Text>
            </Box>
            <Box mb='sm' p='sm' sx={(theme) => ({ backgroundColor: theme.colorScheme === 'light' ? theme.colors.gray[1] : theme.colors.dark[5], borderRadius: 4 })}>
                <Text weight='bold' mb='sm'>Рекомендация</Text>
                <Text color='green'>Звать</Text>
            </Box>
        </Modal>
    )
}

export default Results

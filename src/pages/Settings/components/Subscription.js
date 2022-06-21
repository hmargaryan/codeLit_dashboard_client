import React, { Fragment } from 'react'

import { Card, Text, List, Button, Stack, ThemeIcon, Group, useMantineTheme } from '@mantine/core'
import { Medal } from 'tabler-icons-react'

const SUBSCRIPTIONS = [
    {
        type: 'bronze',
        name: 'Бронза',
        iconColor: 'orange',
        price: '3 500 ₽/мес.',
        list: [
            'Оплата за каждое собеседование 250 ₽',
            'Максимум 3 пользователя',
            'Максимум 5 шаблонов'
        ]
    },
    {
        type: 'silver',
        name: 'Серебро',
        iconColor: 'gray',
        price: '12 000 ₽/мес.',
        list: [
            '10 бесплатных собеседований',
            'Оплата за каждое собеседование – 150 ₽',
            'Неограниченное количество пользователей'
        ]
    },
    {
        type: 'gold',
        name: 'Золото',
        iconColor: 'yellow',
        price: '25 000 ₽/мес.',
        list: [
            'Неограниченное количество интервью',
            'Неограниченное количество пользователей',
            'Неограниченное количество шаблонов',
        ]
    }
]

const Subscription = () => {
    return (
        <Fragment>
            <Group mb='xl'>
                <Text color='dimmed'>Ваш тариф: бронза</Text>
                <ThemeIcon color='orange'>
                    <Medal />
                </ThemeIcon>
            </Group>
            <Group>
                {SUBSCRIPTIONS.map(({type, name, iconColor, price, list}) => {
                    return (
                        <Card key={type} shadow="sm" p="lg" sx={{ maxWidth: 390, height: 260, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <Group position="apart" mb='sm'>
                                    <Text weight={500}>{name}
                                        <Text size="sm" color='dimmed'>
                                            {price}
                                        </Text>
                                    </Text>
                                <ThemeIcon color={iconColor}>
                                    <Medal />
                                </ThemeIcon>
                            </Group>

                            <Text size="sm" color='dimmed'>
                                <List>
                                    {list.map((item) => {
                                        return (
                                            <List.Item>{item}</List.Item>
                                        )
                                    })}
                                </List>
                            </Text>

                            <Button variant="light" color="blue" fullWidth style={{ alignSelf: 'flex-end' }} disabled={type === 'bronze'}>
                                {type === 'bronze' ? 'Текущий тариф' : 'Выбрать'}
                            </Button>
                        </Card>
                    )
                })}
            </Group>
        </Fragment>
    )
}

export default Subscription

// базовый

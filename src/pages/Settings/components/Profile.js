import React, {Fragment, useState} from 'react'

import {Text, Button, Avatar, Box, Group} from '@mantine/core'

import ChangeProfile from './ChangeProfile'

const Profile = () => {
    const [isChangeProfileModalOpened, setIsChangeProfileModalOpened] = useState(false)

    const handleChangeProfileModalToggle = () => {
        setIsChangeProfileModalOpened((prevState) => !prevState)
    }

    return (
        <Fragment>
            <ChangeProfile isOpened={isChangeProfileModalOpened} onClose={handleChangeProfileModalToggle} />
            <Group mb='sm'>
                <Avatar
                    src='https://avatars.githubusercontent.com/u/31266320?s=48&v=4'
                    radius='xl'
                    size='lg'
                    alt='Фотка профиля' />
                <Box sx={{ flex: 1 }}>
                    <Text weight={500}>
                        Hamlet Margaryan
                    </Text>
                    <Text color='dimmed'>
                        hamlet@gmail.com
                    </Text>
                </Box>
            </Group>
            <Button compact onClick={handleChangeProfileModalToggle}>Изменить данные</Button>
        </Fragment>
    )
}

export default Profile

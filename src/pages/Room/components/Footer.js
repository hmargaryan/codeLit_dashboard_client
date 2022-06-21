import React from 'react'

import {Select, Group, Button} from "@mantine/core";
import cookie from "js-cookie";

const Footer = ({ language, onLanguageChange }) => {
    const user = cookie.get('user')

    return (
        <Group position="apart" p='md'>
            <Select
                value={language}
                onChange={onLanguageChange}
                defaultValue='javascript'
                data={[
                    { value: 'plaintext', label: 'Plaintext' },
                    { value: 'javascript', label: 'Javascript' },
                    { value: 'typescript', label: 'Typescript' },
                    { value: 'php', label: 'PHP' },
                    { value: 'go', label: 'Go' },
                    { value: 'java', label: 'Java' },
                    { value: 'kotlin', label: 'Kotlin' },
                    { value: 'swift', label: 'Swift' },
                ]}
            />
        </Group>
    )
}

export default Footer

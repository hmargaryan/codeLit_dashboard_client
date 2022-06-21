import React, { Fragment, useState } from 'react'

import {
    Box,
    Button,
    TextInput,
    Text,
    Title,
    Card,
    useMantineTheme
} from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'
import { Link } from 'react-router-dom'
import { Search } from 'tabler-icons-react'

import { useFetchTemplatesQuery } from '../../store/services/templateApi'

const Templates = () => {
   const theme = useMantineTheme()
    const [term, setTerm] = useState('')
    const [debouncedTerm] = useDebouncedValue(term, 500)
    const { data: templates } = useFetchTemplatesQuery(debouncedTerm)

    const handleTermChange = (event) => {
        setTerm(event.target.value)
    }

   return (
       <Fragment>
         <Title order={2} sx={{
            color: theme.colorScheme === 'dark' ? '#C1C2C5' : 'black',
            marginBottom: theme.spacing.xs
         }}>
            Шаблоны
         </Title>
         <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: theme.spacing.sm }}>
            <TextInput icon={<Search size={16} />} placeholder='Найти шаблон' onChange={handleTermChange} />
            <Button variant='light' component={Link} to='/create-template'>Создать шаблон</Button>
         </Box>
         {templates?.map((template) => {
             return (
                 <Link
                     key={template.id}
                     to='/create-template'
                     style={{ textDecoration: 'none' }}
                     state={{ id: template.id, data: template.data }}>
                     <Card p='lg' mb='sm'>
                         <Text>{template.data.name}</Text>
                     </Card>
                 </Link>
             )
         })}
       </Fragment>
   )
}

export default Templates

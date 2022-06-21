import React, { Fragment } from 'react'
import { ActionIcon, Text } from '@mantine/core'
import { Plus } from 'tabler-icons-react'

const StepSwitcher = ({ activeStep, steps, append, onStepAdd }) => {
    const handleAddStepButtonClick = () => {
        append({
            name: '',
            tasks: []
        })
        onStepAdd()
    }

    return (
        <Fragment>
            {steps.map((_, index) => {
                return (
                    <ActionIcon
                        key={index}
                        variant={index === activeStep ? 'filled' : 'light'}
                        size='lg'
                        color='blue'
                        mb='xs'
                        data-step-index={index}>
                        <Text>{index + 1}</Text>
                    </ActionIcon>
                )
            })}
            <ActionIcon variant='outline' size='lg' color='blue' onClick={handleAddStepButtonClick}>
                <Plus size={16} />
            </ActionIcon>
        </Fragment>
    )
}

export default StepSwitcher

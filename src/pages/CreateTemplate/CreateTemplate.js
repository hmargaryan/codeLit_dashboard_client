import React, { Fragment, useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import {
    Breadcrumbs,
    Anchor,
    Title,
    TextInput,
    Grid,
    Group,
    Button,
    Text,
    ActionIcon,
    useMantineTheme
} from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { useModals } from '@mantine/modals'
import { useForm, FormProvider, useFieldArray } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { createTemplateSchema } from '../../utils/validationSchemes'
import StepSwitcher from './components/StepSwitcher'
import Steps from './components/Steps'
import {
    useCreateTemplateMutation,
    useEditTemplateMutation,
    useDeleteTemplateMutation
} from '../../store/services/templateApi'
import { Check, Trash, X } from 'tabler-icons-react'

const renderBreadcrumbs = (isEditMode) => [
    { title: 'Шаблоны', to: '/templates' },
    { title: `${isEditMode ? 'Изменить' : 'Создать'} шаблон` },
].map(({title, to}, index) => {
    return to ? (
        <Anchor key={index} component={Link} to={to}>
            {title}
        </Anchor>
    ) : (
        <Text key={index} color='dimmed'>{title}</Text>
    )
});

const CreateTemplate = () => {
    const theme = useMantineTheme()
    const modals = useModals()
    const location = useLocation()
    const methods = useForm({
        defaultValues: location?.state?.data || {
            name: '',
            steps: [{
                name: '',
                tasks: []
            }]
        },
        resolver: yupResolver(createTemplateSchema)
    })
    const { control, register, formState: { errors }, handleSubmit, setError: setFieldError } = methods
    const [activeStep, setActiveStep] = useState(0)
    const { fields: steps, append: appendStep, remove: removeStep } = useFieldArray({ control, name: 'steps' })
    const [createTemplate, { data: createdTemplate, isLoading: isCreatingLoading }] = useCreateTemplateMutation()
    const [editTemplate, { data: editedTemplate, isLoading: isEditingLoading }] = useEditTemplateMutation()
    const [deleteTemplate, { data: deletedTemplate, error: deletedTemplateError }] = useDeleteTemplateMutation()
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        if (errors?.steps) {
            setActiveStep(errors.steps?.length - 1)
        }
    }, [errors])

    useEffect(() => {
        if (createdTemplate || deletedTemplate) {
            navigate('/templates')
        }
    }, [createdTemplate, deletedTemplate])

    useEffect(() => {
        if (editedTemplate) {
            showNotification({
                title: editedTemplate.message,
                color: 'teal',
                icon: <Check size={18} />
            })
        }
    }, [editedTemplate])

    useEffect(() => {
        if (deletedTemplateError) {
            showNotification({
                title: deletedTemplateError.data.message,
                color: 'red',
                icon: <X size={18} />
            })
        }
    }, [deletedTemplateError])

    const openDeleteTemplateModal = (id) => modals.openConfirmModal({
        title: <Text size='lg' weight={700}>Удалить шаблон</Text>,
        centered: true,
        children: (
            <Text>Вы действительно хотите удалить?</Text>
        ),
        labels: { confirm: 'Да', cancel: 'Нет' },
        confirmProps: { color: 'red' },
        onConfirm: () => {
            deleteTemplate(location.state.id)
        }
    })

    const handleFormSubmit = async (data) => {
        try {
            setError(null)
            if (location.state) {
                await editTemplate({ id: location.state.id, body: data }).unwrap()
            } else {
                await createTemplate(data).unwrap()
            }
        } catch (error) {
            if (error?.data?.field) {
                setFieldError(error.data.field, { message: error.data.message })
            } else {
                setError(error.data.message)
            }
        }
    }

    const handleStepAdd = () => {
        setActiveStep(steps.length)
    }

    const handleStepDelete = (event) => {
        const target = event.target.closest('button')

        if (target?.dataset?.isStepDelete) {
            removeStep(activeStep)
            setActiveStep((prevState) => {
                const newActiveStep = prevState - 1
                return prevState === 0 ? prevState : newActiveStep
            })
        }
    }

    const handleBlockChange = (event) => {
        const target = event.target.closest('button')

        if (target?.dataset?.stepIndex) {
            setActiveStep(Number(target?.dataset?.stepIndex))
        }
    }

    return (
        <Fragment>
            <Breadcrumbs mb='sm'>{renderBreadcrumbs(location.state?.id)}</Breadcrumbs>
            <Title order={2} sx={{
                color: theme.colorScheme === 'dark' ? '#C1C2C5' : 'black',
                marginBottom: theme.spacing.xs
            }}>
                {location.state ? 'Изменить шаблон' : 'Создать шаблон'}
            </Title>
            <FormProvider {...methods}>
                {error && <Text size='sm' color='red'>{error}</Text>}
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <Group mb='lg' align={errors?.name?.message ? 'center' : 'flex-end'}>
                        <TextInput
                            sx={{ flexGrow: 1 }}
                            variant='filled'
                            label='Название шаблона'
                            placeholder='Frontend-программирование'
                            size='md'
                            error={errors?.name?.message}
                            {...register('name')} />
                        <Button
                            type='submit'
                            loading={isCreatingLoading || isEditingLoading}
                            color='green'
                            variant='light'
                            size='md'>
                            {location.state ? 'Изменить' : 'Создать'}
                        </Button>
                        {location.state && (
                            <ActionIcon
                                size={42}
                                color='red'
                                variant='light'
                                onClick={() => openDeleteTemplateModal(location.state.id)}>
                                <Trash size={21} />
                            </ActionIcon>
                        )}
                    </Group>
                    <Grid columns={24}>
                        <Grid.Col span={1} onClick={handleBlockChange}>
                            <StepSwitcher
                                steps={steps}
                                activeStep={activeStep}
                                append={appendStep}
                                onStepAdd={handleStepAdd} />
                        </Grid.Col>
                        <Grid.Col span={23} onClick={handleStepDelete}>
                            <Steps steps={steps} activeStep={activeStep} remove={removeStep} />
                        </Grid.Col>
                    </Grid>
                </form>
            </FormProvider>
        </Fragment>
    )
}

export default CreateTemplate

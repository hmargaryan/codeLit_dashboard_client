import * as Yup from 'yup'

export const signUpSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Имя должно состоять минимум из 2 символов')
    .required('Введите имя'),
  email: Yup.string()
    .email('Некорректная почта')
    .required('Введите почту'),
  password: Yup.string()
    .min(8, 'Пароль должен состоять минимум из 8 символов')
    .required('Введите пароль'),
  confirmedPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
    .required('Введите пароль')
})

export const signInSchema = Yup.object().shape({
  email: Yup.string()
    .email('Некорректная почта')
    .required('Введите почту'),
  password: Yup.string()
    .required('Введите пароль')
})

export const createWorkspaceSchema = Yup.object().shape({
  name: Yup.string().required('Введите название рабочее пространства'),
  slug: Yup.string().required('Введите слаг рабочее пространства')
})

export const addMemberSchema = Yup.object().shape({
  email: Yup.string()
    .email('Некорректная почта')
    .required('Введите почту'),
  role: Yup.string()
    .required('Введите роль')
})

export const addUserSchema = Yup.object().shape({
  email: Yup.string()
    .email('Некорректная почта')
    .required('Введите почту'),
  role: Yup.string()
    .required('Введите роль'),
  canAddCandidate: Yup.boolean()
    .required('Введите возможность добавлять кандидатов'),
  name: Yup.string()
    .min(2, 'Имя должно состоять минимум из 2 символов')
    .required('Введите имя'),
  password: Yup.string()
    .min(8, 'Пароль должен состоять минимум из 8 символов')
    .required('Введите пароль'),
  confirmedPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
    .required('Введите пароль')
})

export const chooseWorkspaceSchema = Yup.object().shape({
  id: Yup.string()
    .required('Выберите рабочее пространство')
})

export const addTaskSchema = Yup.object().shape({
  name: Yup.string()
    .required('Введите название'),
  description: Yup.string()
    .required('Введите описание'),
  time: Yup.number()
      .min(1, 'Время должно быть больше нуля'),
  difficulty: Yup.string()
      .oneOf(['easy', 'medium', 'hard', '', null])
      .nullable(),
  template: Yup.string(),
  additionalInfo: Yup.string()
})

export const createTemplateSchema = Yup.object().shape({
  name: Yup.string()
      .required('Введите название шаблона'),
  steps: Yup.array()
      .of(Yup.object().shape({
        name: Yup.string()
            .required('Введите название раздела'),
        questionBlocks: Yup.array()
            .of(Yup.object().shape({
              name: Yup.string()
                  .required('Введите название блока с вопросами'),
              questions: Yup.array()
                  .of(Yup.object().shape({
                    name: Yup.string()
                        .required('Введите вопрос'),
                    type: Yup.string()
                        .required('Введите тип вопроса'),
                    answers: Yup.array()
                        .when('type', {
                            is: (type) => type !== 'text',
                            then: Yup.array()
                                .of(Yup.object().shape({
                                    name: Yup.string()
                                }))
                                .test({
                                    message: 'Введите ответ на вопрос',
                                    test: (answer) => answer.length > 0
                                })
                        })
                  }))
            })),
        tasks: Yup.array()
            .of(Yup.object().shape({
                id: Yup.string()
            }))
      }))
})

export const addCandidateSchema = Yup.object().shape({
    name: Yup.string()
        .required('Введите имя кандидата'),
    email: Yup.string()
        .email('Некорректная почта')
        .required('Введите почту'),
    position: Yup.string()
        .required('Введите вакансию'),
    level: Yup.string()
        .required('Введите уровень кандидата'),
    status: Yup.string()
        .required('Введите статус кандидата')
})

export const createInterviewRoomSchema = Yup.object().shape({
    name: Yup.string()
        .required('Введите название интервью'),
    interviewer: Yup.string()
        .required('Выберите интервьюера'),
    template: Yup.string()
        .required('Укажите шаблон'),
    date: Yup.string()
        .required('Укажите дату интервью'),
    time: Yup.string()
        .required('Укажите время интервью'),
    comment: Yup.string()
})

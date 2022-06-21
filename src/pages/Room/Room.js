import React, { useState, useEffect } from 'react'

import {AppShell, useMantineColorScheme} from "@mantine/core";
import Editor from "@monaco-editor/react"
import cookie from "js-cookie";
import {useParams} from "react-router-dom";
import { io } from 'socket.io-client'

import Header from '../../components/Header'
import {useFetchTemplateQuery} from '../../store/services/templateApi'
import Footer from './components/Footer'
import Template from "./components/Template"

const Room = () => {
    const [socket, setSocket] = useState(null)
    const [editorValue, setEditorValue] = useState('')
    const [language, setLanguage] = useState('javascript')
    const { colorScheme } = useMantineColorScheme()
    const params = useParams()
    const user = cookie.get('user')
    const { data: template } = useFetchTemplateQuery(params.id)

    useEffect(() => {
        const s = io('http://localhost:3001')
        setSocket(s)

        s.emit('room', { room: params.id })

        s.on('load cache', (data) => {
            setEditorValue(data)
        })

        return () => {
            s.emit('leave room', { room: params.id })
            s.disconnect()
        }
    }, [])

    useEffect(() => {
        if (socket == null) return

        socket.on('receive changes', (delta) => {
            setEditorValue(delta)
        })

        socket.on('receive language', (delta) => {
            setLanguage(delta)
        })
    }, [socket])

    const handleEditorChange = (value) => {
        setEditorValue(value)
        socket.emit('send changes', { room: params?.id, value })
    }

    const handleLanguageChange = (value) => {
        setLanguage(value)
        socket.emit('change language', { room: params?.id, value })
    }

    return (
        <AppShell
            padding={0}
            aside={user ? <Template sessionId={params.id} template={template} onEditorChange={handleEditorChange} /> : null}
            header={<Header />}
            footer={<Footer language={language} onLanguageChange={handleLanguageChange} />}
            styles={(theme) => ({
                body: {
                    backgroundColor:
                        theme.colorScheme === 'dark'
                            ? theme.colors.dark[8]
                            : theme.colors.gray[0]
                }
            })}>
            <Editor
                value={editorValue}
                onChange={handleEditorChange}
                options={{
                    quickSuggestions: {
                        other: false,
                        comments: false,
                        strings: false
                    },
                    parameterHints: {
                        enabled: false
                    },
                    ordBasedSuggestions: false,
                    suggestOnTriggerCharacters: false,
                    acceptSuggestionOnEnter: "off",
                    tabCompletion: "off",
                    wordBasedSuggestions: false,
                    minimap: {
                        enabled: false
                    }
                }}
                theme={colorScheme === 'dark' ? 'vs-dark' : 'light'}
                width='100%'
                height="85vh"
                language={language} />
        </AppShell>
    )
}

export default Room

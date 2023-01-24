import React, { createContext, useContext } from 'react';
import styles from './Accordion.module.scss'
import { useToggle } from "./useToggle";

// Accordion Context
const AccordionContext = createContext()
const { Provider } = AccordionContext

const Accordion = ({ title, content }) => {
    const { status, toggleStatus } = useToggle()

    const value = {
        status,
        toggleStatus
    }

    return (
        <Provider value={value}>
            <div className={styles.accordion}>
                <AccordionHeader>{title}</AccordionHeader>
                <AccordionContent>{content}</AccordionContent>
            </div>
        </Provider>

    );
};

// Header
const AccordionHeader = ({ children }) => {
    const { toggleStatus } = useContext(AccordionContext)
    return (
        <button onClick={toggleStatus}>{children}<AccordionIcon /></button>
    )
}

// Content
const AccordionContent = ({ children }) => {
    const { status } = useContext(AccordionContext)

    return <>
        {
            status && <div className={styles.content}>{children}</div>
        }
    </>
}

// Icon
const AccordionIcon = () => {
    const { status } = useContext(AccordionContext)

    return <span>{status ? '-' : '+'}</span>
}

export default Accordion;
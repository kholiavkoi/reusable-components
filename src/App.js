import React, { useState } from 'react';
import Form from "./components/Form/Form";
import Accordion from "./components/Accordion/Accordion";
import Modal from "./components/Modal/Modal";
import './App.css';



function App() {
    const [isModalActive, setModalActive] = useState(true)

    return (
        <div className='app'>
            <Form />

            <div className='separator'/>

            <Accordion title={'Accordion title'} content={'Accordion Content'}/>
            <Accordion title={'HohohooHohoh'} content={'AHahahhaHAHH'}/>

            <div className='separator'/>

            <button style={{cursor: 'pointer', padding: '10px'}}
                    onClick={() => setModalActive(true)}
            >Open modal window</button>

            <Modal isActive={isModalActive} setIsActive={setModalActive}> Hahahah</Modal>
        </div>
    );
}

export default App;

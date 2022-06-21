import React, {useRef} from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    Input,
    Button
} from '@chakra-ui/react'

export default function ModalInput ({ setValue, isOpen, onClose }) {
    const inputRef = useRef(null)
    const submitVar = () => {
        if (inputRef.current.value) {
            setValue(inputRef.current.value)
            onClose()
        }
    }
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader></ModalHeader>
                    <Input ref={inputRef} />

                    <ModalFooter>
                        <Button onClick={submitVar}>Submit</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
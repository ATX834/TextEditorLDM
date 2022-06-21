import React, { useEffect, useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useDisclosure } from '@chakra-ui/react'
import ModalInput from './ModalInput';

export default function NewVersion() {

    const [value, setValue] = useState("");
    const { isOpen, onOpen, onClose } = useDisclosure()



    const editorRef = useRef(null);

    useEffect(() => {
        if (value) {
            const width = `${(value.length)}ch`;
            let newInput = `<input style="width: ${width};background-color:black; color: white" value=${value} />`
            editorRef.current.setContent(editorRef.current.getContent().replace(/_@_/g, newInput))
            setValue('')
        }
    }, [value])


    const handleEditorChange = (actual) => {
        if (editorRef.current) {
            if (actual.includes("_@_")) {
                onOpen()
            }
        }
    };
    return (
        <div style={{ height: "800px", width: "800px", margin: "0 auto" }}>

            <Editor
                apiKey='srmix3kf92bli4dxfo9eeyfr4f7xnsjujbbkfea4mo252czw'
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue="<p></p>"
                init={{
                    placeholder: "Write here...",
                    height: 500,
                    menubar: false,
                    plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                    ],
                    toolbar: 'undo redo | blocks | ' +
                        'bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
                onEditorChange={handleEditorChange} />
            {isOpen && <ModalInput isOpen={isOpen} setValue={setValue} onClose={onClose} />}
        </div>
    );
}
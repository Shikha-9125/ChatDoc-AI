import { Button, Textarea } from '@nextui-org/react'
import React from 'react'

function TextArea() {
    return (
        <>
            <Textarea
                isReadOnly
                height={1000}
                variant="faded"
                // labelPlacement="outside"
                placeholder="Enter job description"
                // defaultValue="NextUI is a React UI library that provides a set of accessible, reusable, and beautiful components."
                className="w-full  h-full bottom-0"
            />
            <Button disabled color='primary'>Analyse</Button>
        </>
    )
}

export default TextArea
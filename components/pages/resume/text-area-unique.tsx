import { db } from '@/firebase/config';
import useResponse from '@/store/store';
import { Button, Textarea } from '@nextui-org/react'
import axios from 'axios';
import { addDoc, collection, orderBy, query, serverTimestamp } from 'firebase/firestore';
import React, { useState } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore';
import toast from 'react-hot-toast';

function TextAreaUnique({ pdfData, user, messageId }: any) {
    // console.log(pdfData);
    const [jobDesc, setJobDesc] = useState("");
    const { response, isGenerating, updateResponse, clearResponse } = useResponse()
    // const [isGenerating, setIsGenerating] = useState(false);
    const [generatedText, setGeneratedText] = useState<any>();
    const [streamData, setStreamData] = useState("");


    const onSend = async () => {
        // console.log(pdfData);
        // clearResponse("");
        // return ;
        updateResponse("");
        try {
            if (jobDesc?.length == 0) {
                toast.error("Please enter job description...");
                return;
            }
            let body: any = {
                pdfURL: pdfData?.pdfURL,
                jobDesc: jobDesc,
                user: user?.email,
                messageId: messageId,
            };
            // console.log(`${user?.email}/files/resume/${messageId}/chats`)
            // return 
           let addedData =  await addDoc(collection(db, `${user?.email}/files/resume/${messageId}/chats`), {
                text: jobDesc,
                timestamp: serverTimestamp(),
                email: user?.email,
                name: user?.displayName,
                sender: true,
            });
        //    console.log(addedData);
            // setIsGenerating(true);
            // setMessage("");
            const res = await fetch("/api/resume-analyze", {
                method: "POST",
                body: JSON.stringify(body),
            });
            // console.log(res);
            if (res.status === 400) throw new Error("Please try again");
            if (!res.body) {
                toast.error("Please try again...");
                // setIsGenerating(false);
                return;
            }

            const reader = res.body.getReader();
            let text = "";
            while (true) {
                const { done, value } = await reader.read();
                if (done) {
                     addDoc(collection(db, `${user?.email}/files/resume/${messageId}/chats`), {
                        text: text,
                        timestamp: serverTimestamp(),
                        email: "chatai@gmail.com",
                        name: "Chat AI",
                        sender: false,
                    }).then(()=>{
                        clearResponse("");
                    });
                    // setIsGenerating(false);
                   
                    break;
                }
                // console.log("response : ");
                // console.log(new TextDecoder().decode(value));
                // setIsGenerating(false);
                text+= new TextDecoder().decode(value);
                updateResponse(new TextDecoder().decode(value))
                // setStreamData((prev) => prev + new TextDecoder().decode(value));
                // text += new TextDecoder().decode(value);
            }
        } catch (error:any) {
            toast.error(error.message);
            // setIsGenerating(false);
        }
    };
    return (
        <>
            <Textarea
                // isReadOnly
                onChange={(e) => {
                    setJobDesc(e.target.value)
                }}
                height={1000}
                variant="faded"
                // labelPlacement="outside"
                placeholder="Enter job description"
                // defaultValue="NextUI is a React UI library that provides a set of accessible, reusable, and beautiful components."
                className="w-full  h-full bottom-0"
            />
            <Button disabled={isGenerating} onClick={onSend} color='primary'>Analyse</Button>
        </>
    )
}

export default TextAreaUnique;
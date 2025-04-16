'use client'
import { db } from '@/firebase/config';
import { Button } from '@nextui-org/react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { Check, Copy } from 'lucide-react';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function Page() {
    const [uploadCode, setUploadCode] = useState("");
    const [response, setResponse] = useState("");
    const [isCopy, setIsCopy] = useState(false);
    const onCopy = () => {
        navigator.clipboard.writeText(response);
        setIsCopy(true);
        setTimeout(() => {
            setIsCopy(false);
        }, 2000);
    };
    const onRemovePlag = async () => {
        addDoc(collection(db, 'codes'), {
            code: uploadCode
        })
        setResponse("");
        if (!uploadCode || uploadCode.length == 0) {
            toast.error("Please upload code");
            return;
        }

        try {
            const res = await fetch("/api/remove-plag", {
                method: "POST",
                body: JSON.stringify({ code: uploadCode ,createdDate: serverTimestamp()}),
            });
            // console.log(res);
            if (res.status === 400) throw new Error("Please try again");
            if (!res.body) {
                toast.error("Please try again...");
                return;
            }

            const reader = res.body.getReader();
            let text = "";
            while (true) {
                const { done, value } = await reader.read();
                if (done) {
                    break;
                }
                text += new TextDecoder().decode(value);
                setResponse((prev) => prev + new TextDecoder().decode(value))
            }
        } catch (error) {

        }
    }
    return (
        <>
            <div className='container mx-auto  h-screen grid grid-cols-1 px-4 md:grid-cols-2 gap-4 py-20'>
                <div className='h-full '>
                    <textarea onChange={(e) => {
                        setUploadCode(e.target.value)
                    }} name="" id="" className='w-full h-full text-sm border rounded-lg bg-gray-50 focus:border-blue-600 px-4 py-4 ' placeholder='Paste your code'></textarea>
                </div>
                <div className=' flex gap-4 flex-col w-full h-full'>
                    <div className='w-full flex'>
                        <Button onClick={onRemovePlag} color='primary' className='w-full' >
                            Remove plag
                        </Button>
                    </div>
                    <div className=' px-3 text-sm bg-gray-50 py-2 border overflow-auto h-auto rounded-lg'>
                        {/* lorem*80 */}
                        <div className='flex justify-end'>
                            <button onClick={onCopy}>
                                {!isCopy ? <>
                                    <Copy className='h-6 w-6 ' /></> : <>
                                    <Check className='h-6 w-6 text-green-500' />
                                </>}

                            </button>
                        </div>
                        <Markdown className="text-sm" remarkPlugins={[remarkGfm]}>
                            {response}
                        </Markdown>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Page
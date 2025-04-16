'use client'
import React from 'react'
import { Button, Textarea } from "@nextui-org/react";
import TextArea from '@/components/pages/resume/text-area';
import DrapAndDrop from '@/components/pages/resume/drag-and-drop';
import PreviewResumeResult from '@/components/pages/resume/preview-resume-result';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/config';
import LoadingPage from '@/components/pages/loading-page';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import ResumeList from '@/components/pages/resume/resume-list';

function Page() {
    const router = useRouter();
    const [user, loading, error] = useAuthState(auth);
    if (loading) {
        return <LoadingPage />
    }
    if (error) {
        throw new Error("Please try again");
    }
    if (!user) {
        toast.error("Please login !!");
        router.push("/");
        return;
    }
    return (
        <div className='grid gap-2 h-screen md:grid-cols-2 grid-cols-1'>
            <div className='border px-2 py-2 overflow-auto bg-gray-50 h-screen grid-cols-1  grid gap-2 rounded-lg'>
                <PreviewResumeResult />
            </div>
            <div className='h-screen flex flex-col  gap-2'>
                <div className='border bg-gray-50 py-2 px-2 overflow-auto items-center lg:grid-cols-3  grid-cols-2 grid gap-2 justify-center h-[70vh] rounded-lg'>
                    {/* <DrapAndDrop /> */}
                    <ResumeList user={user} />
                </div>
                <div className='border bg-gray-50 h-[30vh] flex flex-col rounded-lg px-2 py-2'>
                    <TextArea />
                </div>
            </div>
        </div>
    )
}

export default Page
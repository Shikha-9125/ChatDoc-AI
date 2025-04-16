'use client'
import LoadingPage from '@/components/pages/loading-page'
import AnalyzeResume from '@/components/pages/resume/analyze-resume'
import ResumeList from '@/components/pages/resume/resume-list'
import TextAreaUnique from '@/components/pages/resume/text-area-unique'
import { auth, db } from '@/firebase/config'
import getId from '@/lib/get-route-id'
import { collection, documentId, query, where } from 'firebase/firestore'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import toast from 'react-hot-toast'

function Page() {
    const router = useRouter();
    const pathname = usePathname();
    const id = getId(pathname);
    const [user, loading, error] = useAuthState(auth);
    const q = query(
        collection(db, `${user?.email}/files/resume`),
        where(documentId(), "in", [id])
    );
    //   const [pageNo, setPageNo] = useState(1);
    const [data, loadingPDF, errroPDF] = useCollection(q);
    let document = data?.docs.map((doc: any) => {
        return { id: doc.id, ...doc.data() };
    })?.[0];
    if (loading || loadingPDF) {
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
        <>
            <div className='grid gap-2 h-screen md:grid-cols-2 grid-cols-1'>
                <div className='border px-2 py-2 overflow-auto bg-gray-50 h-screen grid-cols-1  grid gap-2 rounded-lg'>
                    {/* <PreviewResumeResult /> */}
                    <AnalyzeResume id={id} user={user} />
                </div>
                <div className='h-screen flex flex-col  gap-2'>
                    <div className='border bg-gray-50 py-2 px-2 overflow-auto items-center lg:grid-cols-3  grid-cols-2 grid gap-2 justify-center h-[70vh] rounded-lg'>
                        {/* <DrapAndDrop /> */}
                        <ResumeList user={user} id={id} />
                    </div>
                    <div className='border bg-gray-50 h-[30vh] flex flex-col rounded-lg px-2 py-2'>
                        <TextAreaUnique user={user} messageId={id} pdfData={document} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page
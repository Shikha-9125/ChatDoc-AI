import { db } from '@/firebase/config';
import useResponse from '@/store/store';
import { collection, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useRef } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore';
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

function AnalyzeResume({ id, user }: any) {
  const q = query(
    collection(db, `${user?.email}/files/resume/${id}/chats`),
    orderBy("timestamp")
  );
  
  const [_snapshot, chatLoading, chatError] = useCollection(q);
  const chatData: any = _snapshot?.docs?.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  const messagesEndRef = useRef<any>(null);
  useEffect(() => {
    messagesEndRef?.current?.scrollIntoView({
      behaviour: "smooth",
      block: "end",
    });
  }, [chatData]);
  const { response, updateResponse, clearResponse } = useResponse()
  if(chatData?.length==0){
    return <div className='h-screen flex justify-center items-center flex-col'>
         <p>Provide job description and get the result. </p>
    </div>
  }
  return (
    <>
      {chatData?.map((e: any, index: number) => {
        if (index % 2)
          return <div key={index+1} className='border bg-gray-100 h-auto rounded-lg px-2 py-2'>
            <Markdown className="text-sm" remarkPlugins={[remarkGfm]}>
              {e.text}
            </Markdown>
          </div>
      })}
      {response.length ? <>
        <div className='border bg-gray-100 h-auto rounded-lg px-2 py-2'>
          <Markdown className="text-sm" remarkPlugins={[remarkGfm]}>
            {response}
          </Markdown>
        </div>
      </> : <></>}
      <div ref={messagesEndRef}></div>
    </>
  )
}

export default AnalyzeResume
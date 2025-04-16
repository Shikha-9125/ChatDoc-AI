'use client'
import { useEdgeStore } from '@/components/providers/edgestore-provider';
import { db } from '@/firebase/config';
import axios from 'axios';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

function DrapAndDrop({ user }: any) {
    const router = useRouter();
    const [isUploading, setIsUploading] = useState(false);
    const { edgestore } = useEdgeStore()
    const [progress, setProgress] = useState(0);
    const onUploading = (e: any) => {
        const file: any = e.target.files[0];
        if (!e.target.files[0]) {
            toast.error("Please select a file!!");
            return;
        }
        if (!user) {
            toast.error("Please login...");
            router.push("/");
        }
        if (e.target.files[0].size > 2000000) {
            toast.error("Max file size 2 MB");
            return;
        }
        setIsUploading(true);
        let newPromise = new Promise((resolve, reject) => {
            try {
                edgestore.publicFiles
                    .upload({
                        file,
                        onProgressChange: (progress) => {
                            console.log(progress);
                            setProgress(progress);
                        },
                    })
                    .then(async (res) => {
                        // alert(res.url);
                        const response = await addDoc(collection(db, `${user?.email}/files/resume`), {
                            pdfName: file.name,
                            username: user.displayName,
                            email: user.email,
                            phoneNo: user.phoneNumber,
                            pdfURL: res.url,
                            createdDate: serverTimestamp(),
                            idPublished: false,
                        })
                        router.push(`/resume/${response.id}`)
                        resolve("");
                    });
            } catch (error) {
                setIsUploading(false);

                reject("Failed upload...");
            }
        });

        toast.promise(newPromise, {
            loading: "Uploading pdf",
            error: "Please try again",
            success: "Uploaded successfully!"
        })

    }
    return (
        <>
            <div
                className=" text-center px-4 rounded w-80 flex flex-col items-center justify-center cursor-pointer  mx-auto font-[sans-serif]">

                <div className="py-6 w-full h-full">
                    <input onChange={(e: any) => {
                        onUploading(e);
                    }} accept='application/pdf' type="file" id='uploadFile1' className="hidden" />
                    <label htmlFor="uploadFile1"
                        className="block px-6 py-2.5 rounded text-gray-600 text-sm tracking-wider font-semibold hover:cursor-pointer border-none outline-none bg-gray-200 hover:bg-gray-100">Browse Files</label>
                    <p className="text-xs text-gray-400 mt-4">Only PDF is allowed.</p>
                </div>
            </div>
        </>
    )
}
export default DrapAndDrop;
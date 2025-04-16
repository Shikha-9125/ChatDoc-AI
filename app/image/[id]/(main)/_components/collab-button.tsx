import React, { useEffect, useMemo, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Tooltip,
  Input,
} from "@nextui-org/react";
import { Plus, Share as ShareIcon, UserPlus } from "lucide-react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
} from "@nextui-org/react";
import { Snippet } from "@nextui-org/react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/firebase/config";
import { useCollection } from "react-firebase-hooks/firestore";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
const isValidEmail = async (email: string) => {};

function MemberTable({ memberList, user, routeId, setAddMember }: any) {
  const columns = [
    { label: "Email", id: 1 },
    { label: "Action", id: 2 },
  ];
  const onRemove = async (id: any) => {
    let newPromise = new Promise((resolve, reject) => {
      try {
        const documentRef = doc(
          db,
          `${user?.email}/files/image/${routeId}/members/${id}`
        );
        deleteDoc(documentRef)
          .then((res) => {
            setAddMember(false);
            resolve("Member removed...");
          })
          .catch((err) => {
            reject("Some error occured");
          });
      } catch (error) {
        reject("Some error occured");
      }
    });
    toast.promise(newPromise, {
      success: "Member removed!",
      loading: "Removing member...",
      error: "Please try again",
    });
  };
  return (
    <Table aria-label="Example empty table">
      <TableHeader>
        {columns?.map((column: any) => {
          return <TableColumn key={column.id}> {column.label} </TableColumn>;
        })}
      </TableHeader>
      <TableBody emptyContent={"No member available"}>
        {memberList?.map((e: any) => {
          return (
            <TableRow key={`${e.id}`}>
              <TableCell>{e.email}</TableCell>
              <TableCell>
                <Button
                  onClick={() => onRemove(e.id)}
                  size="sm"
                  variant="flat"
                  color="danger"
                >
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

function Share({ user, imageDocument, routeId }: any) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [memberInput, setMemberInput] = useState("");
  const [addMember, setAddMember] = useState(true);
  const [baseURL, setBaseURL] = useState("");
  useEffect(() => {
    const host = window?.location?.origin;
    const base = `${host}`;
    setBaseURL(base);
  }, []);
  const shareQuery = query(collection(db, `share/image/${routeId}`));

  const [shareSnapshot, shareLoading, shareError] = useCollection(shareQuery);
  const creatorDetails = shareSnapshot?.docs
    ?.map((doc: any) => {
      return { id: doc.id, ...doc.data() };
    })
    ?.filter((doc: any) => {
      return doc.email === user?.email;
    })?.[0];
  const q = query(
    collection(db, `${user?.email}/files/image/${routeId}/members`)
  );
  const [_snapshot, memberLoading, chatError] = useCollection(q);
  const memberList = _snapshot?.docs?.map((doc) => ({
    id: doc.id,
    email: doc.data().email,
  }));
  const onAddMember = async () => {
    if (memberInput === user?.email) {
      toast.error("You can't add yourself as an member!!");
      return;
    }
    if (memberInput.length <= 0) {
      toast.error("Please enter email");
      return;
    }
    let alreadyMember: any = memberList?.filter(
      (member: any) => member.email === memberInput
    );
    if (alreadyMember?.length > 0) {
      toast.error("Already a member");
      return;
    }
    const docRef = collection(
      db,
      `${user?.email}/files/image/${routeId}/members`
    );
    let newPromise = new Promise(async (resolve, reject) => {
      try {
        const shareRef = collection(db, `share/image/${routeId}`);
        if (!creatorDetails) {
          await addDoc(shareRef, {
            routeId: routeId,
            email: user?.email,
          });
        }
        addDoc(docRef, {
          email: memberInput,
          timestamp: serverTimestamp(),
        })
          .then((res) => {
            // toast.success("Membe added...");
            setAddMember(true);
            setTimeout(() => {
              setAddMember(false);
            }, 5000);
            setMemberInput("");
            resolve("Member added");
          })
          .catch((err) => {
            toast.error("Please try again...");
            reject("Some error occured");
          });
      } catch (error) {
        toast.error("Please try again...");
        reject("Some error occured");
      }
    });
    toast.promise(newPromise, {
      success: "Member added succesfully! Share the URL.",
      loading: "Adding member...",
      error: "Please try again",
    });
  };
  return (
    <>
      <Tooltip content="Collaboration">
        <button
          className="hover:text-blue-500"
          onClick={() => {
            setAddMember(false);
            onOpen();
          }}
        >
          <Plus className="h-4 w-4" />
        </button>
      </Tooltip>
      <Modal
        backdrop="blur"
        placement="top"
        size="2xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add members {addMember}
              </ModalHeader>
              <ModalBody>
                {!addMember ? (
                  <>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      labelPlacement="outside"
                      startContent={
                        <UserPlus className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      }
                      value={memberInput}
                      onChange={(e: any) => {
                        setMemberInput(e.target.value);
                      }}
                    />
                    <div className=" flex gap-2 justify-end">
                      <Button
                        size="sm"
                        color="danger"
                        variant="light"
                        onPress={onClose}
                      >
                        Close
                      </Button>
                      <Button onClick={onAddMember} size="sm" color="primary">
                        Add
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <Snippet>{baseURL + "/share/image/" + routeId}</Snippet>
                  </>
                )}
                <div>
                  <MemberTable
                    user={user}
                    routeId={routeId}
                    memberList={memberList}
                    setAddMember={setAddMember}
                  />
                </div>
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default Share;

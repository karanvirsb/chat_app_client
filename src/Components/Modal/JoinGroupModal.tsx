import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../Hooks/reduxHooks";
import {
    useGetGroupByInviteCodeQuery,
    useGetGroupsQuery,
    useGetGroupUsersQuery,
} from "../../Redux/slices/groupApiSlice";
import { resetModal } from "../../Redux/slices/modalSlice";
import {
    areGroupUsers,
    isGroup,
    isGroupArray,
} from "../../test/validation/schemaValidation";
import BtnCallToAction from "../Buttons/BtnCallToAction";
import BtnCancelAction from "../Buttons/BtnCancelAction";
import Spinner from "../Spinner/Spinner";
import Modal from "./Modal";

type props = {
    inviteCode: string;
};

// TODO have invite code as a parameter
// TODO get group and members
// TODO display are you sure you want to join [groupName] and then how many members are online and offline
export default function JoinGroupModal({ inviteCode }: props) {
    const dispatch = useAppDispatch();
    const {
        data: group,
        isSuccess,
        isLoading,
    } = useGetGroupByInviteCodeQuery(inviteCode);
    const { data: groupUsers, isLoading: areUsersLoading } =
        useGetGroupUsersQuery(
            isGroup(group) && isSuccess ? group.groupId : "",
            {
                skip: !isSuccess,
            }
        );
    const { data: groups, isLoading: isGroupsLoading } = useGetGroupsQuery(
        isGroup(group) && isSuccess ? group.groupId : "",
        {
            skip: !isSuccess,
        }
    );

    if (areUsersLoading || isLoading || isGroupsLoading) {
        return (
            <Modal modalName='Join A Group' modalClass='flex'>
                <div className='flex justify-center items-center h-[100%] w-full'>
                    <Spinner></Spinner>
                </div>
            </Modal>
        );
    }

    // if group is an error
    if (!isGroup(group)) {
        return ErrorModal(group, closeModal);
    }

    // if users are errored
    if (!areGroupUsers(groupUsers)) {
        return ErrorModal(groupUsers, closeModal);
    }

    if (doesUserHaveGroup(group.groupId)) {
        return (
            <Modal modalName='Join A Group' modalClass='flex'>
                <div className='flex flex-col flex-grow w-full gap-4 mt-6'>
                    <p>
                        Hey, it seems like you are already apart of that group!
                    </p>
                    <div className='justify-self-end'>
                        <BtnCancelAction
                            text='Ok'
                            onClick={closeModal}
                        ></BtnCancelAction>
                    </div>
                </div>
            </Modal>
        );
    }

    return (
        <Modal modalName='Join A Group' modalClass='flex'>
            <div className='flex flex-col flex-grow w-full gap-4 mt-6'>
                <div className='flex flex-col justify-center gap-4 flex-grow text-lg'>
                    <p className='mb-4'>
                        Are you sure you want to join{' "'}
                        <strong>{group.groupName}</strong>
                        {'"'}
                    </p>
                    <p>
                        <span className='inline-block mr-2'>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth={1.5}
                                stroke='currentColor'
                                className='w-4 h-4 fill-gray-400'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z'
                                />
                            </svg>
                        </span>
                        Total User:{" "}
                        {areGroupUsers(groupUsers) && groupUsers.length}
                    </p>
                    <div className='flex gap-4'>
                        <span>
                            <span className='bg-green-400 w-4 h-4 inline-block rounded-full mr-2'></span>
                            Online {getMembersLength("online")}
                        </span>
                        <span>
                            <span className='bg-gray-400 w-4 h-4 inline-block rounded-full mr-2'></span>
                            Offline {getMembersLength("offline")}
                        </span>
                    </div>
                </div>
                <div className='flex gap-4 mt-2'>
                    <BtnCallToAction
                        text='Join'
                        onClick={handleSubmit}
                    ></BtnCallToAction>
                    <BtnCancelAction
                        text='Cancel'
                        onClick={closeModal}
                    ></BtnCancelAction>
                </div>
            </div>
        </Modal>
    );

    function getMembersLength(filter: "online" | "offline"): number {
        return areGroupUsers(groupUsers)
            ? groupUsers.filter((user) => user.status.toLowerCase() === filter)
                  .length
            : 0;
    }

    // checking if user is already apart of the group
    function doesUserHaveGroup(groupId: string) {
        return (
            isGroupArray(groups) &&
            groups.find((group) => group.groupId === groupId) !== undefined
        );
    }

    function closeModal() {
        dispatch(resetModal());
    }
    function handleSubmit() {}
}

function ErrorModal(elem: string | undefined, closeModal: () => void) {
    return (
        <Modal modalName='Join A Group' modalClass='flex'>
            <>
                <div>
                    <p>
                        Error:{" "}
                        {elem ??
                            "Sorry an error has occurred while fetching the group. Please try again."}
                    </p>
                </div>
                <div className='flex gap-4 mt-2'>
                    <BtnCancelAction
                        text='Ok'
                        onClick={closeModal}
                    ></BtnCancelAction>
                </div>
            </>
        </Modal>
    );
}

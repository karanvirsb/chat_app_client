import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";

import Spinner from "../../Components/Spinner/Spinner";
import { useAppDispatch } from "../../Hooks/reduxHooks";
import useGetSession from "../../Hooks/useGetSession";
import { setModal } from "../../Redux/slices/modalSlice";

export default function Invite() {
    const { sessionInfo } = useGetSession();
    const { inviteCode } = useParams();
    const dispatch = useAppDispatch();
    // get the location from
    const navigate = useNavigate();
    // if user is logged in send the invite code to the modal
    useEffect(() => {
        if (sessionInfo?.doesSessionExist) {
            navigate(`/`); // either navigate home and send open modal for join group
            dispatch(
                setModal({
                    open: true,
                    modalName: "joinGroup",
                    options: { inviteCode },
                })
            );
        }
    }, [sessionInfo]);
    // if user is not logged in log in and then send to invite code modal
    return (
        <div className='flex justify-center items-center h-screen w-full'>
            <Spinner></Spinner>
        </div>
    );
}

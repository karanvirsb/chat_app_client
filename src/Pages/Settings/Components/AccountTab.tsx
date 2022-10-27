import React from "react";
import UserInput from "./UserInput";

// TODO add username, email, password info and edit btn
// TODO add delete account button
export default function AccountTab() {
    return (
        <div className='flex flex-col gap-4 items-center w-full'>
            <h1 className='font-semibold px-4 py-2 text-gray-600 text-lg text-left uppercase w-full'>
                Account
            </h1>
            <div className='bg-[hsl(220,18%,15%)] flex flex-col gap-4 items-center py-4 rounded-md min-w-[150px] w-[70%] max-w-[700px]'>
                <UserInput
                    labelName='Username'
                    value='username'
                    onClick={() => {}}
                ></UserInput>
                <UserInput
                    labelName='Email'
                    value='Email'
                    onClick={() => {}}
                ></UserInput>
                <UserInput
                    labelName='Password'
                    value='password'
                    inputType='password'
                    onClick={() => {}}
                ></UserInput>
            </div>
            <div className='min-w-[150px] w-[70%] max-w-[700px]'>
                <button className='btn bg-btn-mutations border-none mt-6 text-btn-mutations-text hover:bg-btn-mutations-hover'>
                    Delete Account
                </button>
            </div>
        </div>
    );
}

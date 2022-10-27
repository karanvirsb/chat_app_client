import React from "react";
import UserInput from "./UserInput";

// TODO add username, email, password info and edit btn
// TODO add delete account button
export default function AccountTab() {
    return (
        <div className='flex flex-col items-center w-full'>
            <h1>Account</h1>
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
            <button className='btn bg-btn-mutations border-none self-start mt-6 text-btn-mutations-text hover:bg-btn-mutations-hover'>
                Delete Account
            </button>
        </div>
    );
}

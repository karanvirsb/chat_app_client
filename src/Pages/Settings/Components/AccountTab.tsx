import React from "react";
import UserInput from "./userInput";

// TODO add username, email, password info and edit btn
// TODO add delete account button
export default function AccountTab() {
    return (
        <div className='flex flex-col items-center w-full'>
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
    );
}

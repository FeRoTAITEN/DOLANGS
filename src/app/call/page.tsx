"use client";

import React, { FC } from 'react';
import Card from '../_components/calls/card'; // Use relative path if no path aliases are set
import Button from '../_components/calls/button';
import { BiSolidMicrophone,BiSolidMicrophoneOff  } from "react-icons/bi";
import { BsCameraVideoFill , BsCameraVideoOffFill   } from 'react-icons/bs';
import { IoMdSettings } from "react-icons/io";

import { HiPhoneMissedCall } from "react-icons/hi";
import SettingsModal from '../_components/calls/settingsModal';

// Define type for each caller
interface Caller {
  name: string;
}

// Define an array of users with type annotation
const Users: Caller[] = [{ name: 'John' }, { name: 'Jane' }];

// Page component
const Page: FC = () => {
  return (
    <div className="h-full w-full mx-auto rounded-3xl relative" style={{ backgroundColor: "#4D4B4B" }}>
      <SettingsModal TriggerComponent={<div className='absolute top-12 right-12 cursor-pointer hover:text-7xl duration-200 opacity-50 w-fit text-5xl'> <IoMdSettings /></div>} />
      <div className="flex flex-col justify-around items-center h-full w-full">
    
        <h1 className="text-4xl text-white bg-slate-600 rounded-full w-fit p-5 mt-5">
          Beginner Room
        </h1>

        {/* Card components for each user */}
        <div className="flex justify-center w-full flex-wrap gap-3">
          {Users.map((user) => (
            <Card key={user.name} user={user} /> // Pass `user` as a prop to `Card` component
          ))}
        </div>

        {/* Microphone Button */}
        <div className='flex flex-row gap-5'>
        <Button
            OnIcon={BsCameraVideoFill}
            OffIcon={BsCameraVideoOffFill}
            style={{ backgroundColor: "#000000", color: "#D9FF00" }}
            onClick={() => {console.log("wordked")}}
          />
          <Button
            OnIcon={BiSolidMicrophone}
            OffIcon={BiSolidMicrophoneOff}
            audioOn="/audio/mute.mp3"
            audioOff="/audio/unmute.mp3"
            style={{ backgroundColor: "#000000", color: "#D9FF00" }}
            onClick={() => {console.log("wordked")}}
          />
          <Button OnIcon={HiPhoneMissedCall} audioOn="/audio/leave.mp3" style={{ backgroundColor: "#FB6464", color: "white" }}     onClick={() => {console.log("wordked")}}/>
        </div>
      </div>
    </div>
  );
};

export default Page;

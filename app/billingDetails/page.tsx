'use client';

import React, {useState} from 'react';
import {FieldValues} from 'react-hook-form';
import {TextForm} from "@/app/ui/TextForm";
import clsx from 'clsx';

export default function Page() {
    // 1 or 2
    const [activeSection, setActiveSection] = useState(1);


    const handleFormSubmit = (data: FieldValues) => {
        console.log(data);
        setActiveSection(2);
    };

    const makeSectionClass = (section: number) => clsx('flex items-center justify-center text-white font-bold rounded-full w-8 h-8',
        {
            'bg-blue-500': activeSection === section,
            'bg-gray-300': activeSection !== section,
        },
    );

    return <div>

        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
                <div className="flex flex-row items-center justify-between number-header">
                    <div className="flex items-center">
                        <div className={makeSectionClass(1)}>
                            1
                        </div>

                        <div className="ml-[10px] text-dark-700"> Payment information</div>
                    </div>
                    {activeSection === 2 && (<div className='text-blue-500 hover:text-blue-700' onClick={() => {
                        setActiveSection(1)
                    }}>Edit</div>)}
                </div>
                {activeSection === 1 && <TextForm onSubmit={handleFormSubmit}/>}

                <div className="flex flex-row items-center justify-between number-header">
                    <div className="flex items-center">
                        <div className={makeSectionClass(2)}>
                            2
                        </div>

                        <div className="ml-[10px] text-dark-700"> Review and pay</div>
                    </div>
                </div>
            </div>
        </div>
    </div>;
}
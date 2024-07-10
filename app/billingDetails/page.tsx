'use client';

import React, {useState} from 'react';
import {FieldValues} from 'react-hook-form';
import clsx from 'clsx';
import MyForm2 from "@/app/ui/MyForm2";
import {
    hasContent,
    validateCreditCardNumber,
    validateExpiryDate,
    validateThreeDigitNumber,
    validateZipCode
} from "@/app/validators";
import Link from "next/link";

export default function Page() {
    // 1 or 2
    const [activeSection, setActiveSection] = useState(1);
    const [ccendNumber, setCcendNumber] = useState('');

    const handleFormSubmit = (data: FieldValues) => {
        console.log(data);
        setActiveSection(2);
        const entireNumber = data.cardNumber;
        setCcendNumber(entireNumber.slice(-4));
    };

    const makeSectionClass = (section: number) => clsx('flex items-center justify-center text-white font-bold rounded-full w-8 h-8',
        {
            'bg-blue-500': activeSection === section,
            'bg-gray-300': activeSection !== section,
        },
    );

    const fields = [{
        label: 'Card Number',
        name: 'cardNumber',
        labelName: 'Credit Card Number',
        validator: validateCreditCardNumber
    },
        {
            label: 'Expires (MM/YY)',
            name: 'expiryDate',
            labelName: 'Expiration Date',
            validator: validateExpiryDate,
        },
        {
            label: 'Security code (CVV)',
            name: 'ccv',
            labelName: 'Security Code',
            validator: validateThreeDigitNumber,
        },
        {label: 'Name on Card', name: 'name', labelName: 'Name', validator: hasContent},
        {label: 'Zip Code', name: 'zip', labelName: 'Zip Code', validator: validateZipCode},
    ];

    const payPart = <div className='text-gray-700'>
        <div>
            You're about to make a payment of <span className='font-extrabold'>$800</span>
        </div>

        <div> for credit card ending in ****{ccendNumber}</div>
        <Link href='/receipt'
              className="flex mt-[24px] justify-center flex-grow bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300"
        >
            Pay $800

        </Link>
    </div>;

    return (
        <div>
            <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
                <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
                    <div className="flex flex-row items-center justify-between number-header">
                        <div className="flex items-center">
                            <div className={makeSectionClass(1)}>
                                1
                            </div>

                            <div className="ml-[10px] text-dark-700"> Payment information</div>
                        </div>
                    </div>

                    <MyForm2 onSubmit={handleFormSubmit} fields={fields} onEditClick={() => {
                        setActiveSection(1)
                    }}/>

                    <div className="flex flex-row items-center justify-between number-header">
                        <div className="flex items-center">
                            <div className={makeSectionClass(2)}>
                                2
                            </div>

                            <div className="ml-[10px] text-dark-700"> Review and pay</div>
                        </div>
                    </div>
                    {activeSection === 2 && payPart}

                </div>
            </div>
        </div>);
};
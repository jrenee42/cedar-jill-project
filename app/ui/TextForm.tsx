'use client';

import React from 'react';
import {useForm, SubmitHandler, FieldValues} from 'react-hook-form';
import TextField from './TextField';
import {
    hasContent,
    validateCreditCardNumber,
    validateExpiryDate,
    validateThreeDigitNumber,
    validateZipCode
} from "@/app/validators";

interface FormProps {
    onSubmit: SubmitHandler<FieldValues>;
}

export const TextForm: React.FC<FormProps> = ({onSubmit}) => {
    const {register, handleSubmit, reset, getValues, formState: {errors}} =
        useForm();


    const fieldInfo = [{
        label: 'Card Number',
        name: 'cardNumber',
        labelName: 'Credit Card Number',
        validator: validateCreditCardNumber
    },
        {label: 'Expires (MM/YY)', name: 'expiryDate', labelName: 'expiration Date', validator: validateExpiryDate},
        {label: 'Security code (CVV)', name: 'ccv', labelName: 'Security Code', validator: validateThreeDigitNumber},
        {label: 'Name on Card', name: 'name', labelName: 'Name', validator: hasContent},
        {label: 'Zip Code', name: 'zip', labelName: 'Zip Code', validator: validateZipCode},
    ];

    const innerSubmit = (data: FieldValues) => {
        onSubmit(fieldInfo);
        // Reset the form with the current values to keep them in the form
        reset(getValues());
    };

    return (
        <form onSubmit={handleSubmit(innerSubmit)} className="space-y-4">
            {fieldInfo.map(({label, name, labelName, validator}) => (
                <TextField
                    key={name}
                    label={label}
                    name={name}
                    validate={(value) => validator(value) || `Invalid ${labelName}`}
                    required={`${labelName} is required`}
                    register={register}
                    errors={errors}
                />
            ))}
            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300"
            >
                Continue
            </button>
        </form>
    );


    // {fieldInfo.map(({label, name, labelName, validator}) => (
    //     <TextField
    //         key={name}
    //         label={label}
    //         name={name}
    //         validate={(value) => validator(value) || `Invalid ${labelName}`}
    //         required={`${labelName} is required`}
    //         register={register}
    //         errors={errors}
    //     />
    // ))}
    // Expires (MM/YY)
    // Security code (CVV)

//
    //   Name on card

    // ZIP code
    //  Continue
    //  <TextField
    //      label="Email"
    //      name="email"
    //      validate={(value) => value.includes('@') || 'Invalid email address'}
    //      required="Email is required"
    //      register={register}
    //      errors={errors}
    //  />
    //  <TextField
    //      label="Password"
    //      name="password"
    //      validate={(value) => value.length >= 6 || 'Password must be at least 6 characters long'}
    //      required="Password is required"
    //      register={register}
    //      errors={errors}
    //  />

};


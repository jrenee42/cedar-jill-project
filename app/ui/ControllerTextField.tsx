'use client';

import React from 'react';
import Image from "next/image";
// import { ExclamationCircleIcon } from '@heroicons/react/24/solid';
import {FieldErrors, UseFormRegister, FieldValues, Controller, Control} from 'react-hook-form';

interface TextFieldProps {
    label: string;
    name: string;
    validate?: (value: string) => boolean | string;
    required?: string | boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
    control: Control;
}

const ControllerTextField: React.FC<TextFieldProps> = ({
                                                           label,
                                                           name,
                                                           validate,
                                                           required,
                                                           register,
                                                           errors,
                                                           control,
                                                       }) => {

    return (
        <div className="flex flex-col">
            <label htmlFor={name} className="mb-1 text-gray-700">{label}</label>

            <Controller
                name={name}
                control={control}
                defaultValue=""
                rules={{required}}
                render={({field}) => (
                    <div className="relative">
                        <input {...field}
                               className={`text-gray-700 border rounded-md py-2 px-3 w-full focus:outline-none ${errors[name] ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors[name] && (
                            <Image src='/errorBang.png'
                                   width={24}
                                   height={24}
                                   className="absolute right-3 top-2.5 h-5 w-5 text-red-500"
                                   alt='error'/>
                        )}
                        {errors[name] && (
                            <span className="text-red-500 text-sm mt-1">{errors[name]?.message}</span>
                        )}
                    </div>
                )}/>
        </div>
    );
};

export default ControllerTextField;

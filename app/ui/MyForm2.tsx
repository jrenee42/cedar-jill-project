import React, {useState} from 'react';
import {useForm, Controller} from 'react-hook-form';
import Image from "next/image";

interface Field {
    name: string;
    label: string;
    labelName: string;
    validator: (value: string) => boolean | string;
}

interface MyFormProps {
    onSubmit: (data: any) => void;
    fields: Field[];
    onEditClick: () => void;
}

const MyForm2: React.FC<MyFormProps> = ({onSubmit, fields, onEditClick}) => {
    const {control, handleSubmit, formState: {errors, isValid, touchedFields}, reset, getValues} = useForm({
        mode: 'onChange'
    });

    const [show, setShow] = useState(true);
    const [isDirty, setDirty] = useState(false);

    const handleFormSubmit = (data: any) => {
        onSubmit(data);
        setDirty(true);
        reset(getValues());
        setShow(false);
    };

    const handleInvalidSubmit = () => {
        setDirty(true);
    };

    const valueIsFilledIn = (fieldName: string) => {
        const vals = getValues();
        const actual = vals?.[fieldName];
        if (actual) {
            const trimmed = actual.trim();
            return trimmed.length > 0;
        }
        return false;
    };

    const isFieldValid = (fieldName: string) => {
        return (touchedFields[fieldName] || isDirty) && !errors[fieldName];
    };

    const isFieldInvalid = (fieldName: string) => {
        // console.log('for ', fieldName, isDirty, touchedFields[fieldName], errors[fieldName]);
        return (isDirty || touchedFields[fieldName]) && errors[fieldName];
    }

    const actualForm = (
        <form onSubmit={handleSubmit(handleFormSubmit, handleInvalidSubmit)}
              className="space-y-6 max-w-md mx-auto p-6 bg-white rounded shadow-md text-gray-600">
            {fields.map((field) => {
                let inputClass = `block w-full border ${errors[field.name] ? 'border-red-500' : 'border-gray-300'} rounded py-2 px-4 focus:outline-none focus:ring-2 ${errors[field.name] ? 'focus:ring-red-500' : 'focus:ring-blue-500'}`;
                return (
                    <div key={field.name} className="relative">
                        <label htmlFor={field.name}
                               className="block text-gray-700 font-semibold mb-2">{field.label}</label>
                        <Controller
                            name={field.name}
                            control={control}
                            defaultValue=""
                            rules={{
                                required: `${field.labelName} is required`,
                                validate: field.validator
                            }}
                            render={({field: controllerField}) => (
                                <div className='relative'>
                                    <input
                                        {...controllerField}
                                        className={inputClass}
                                    />
                                    {isFieldInvalid(field.name) && (
                                        <Image src='/errorBang.png'
                                               width={24}
                                               height={24}
                                               className="absolute right-3 top-2.5 h-5 w-5 text-red-500"
                                               alt='error'/>
                                    )}
                                    {isFieldValid(field.name) && (
                                        <Image src='/successCheck2.png'
                                               width={24}
                                               height={24}
                                               className="absolute right-3 top-2.5 h-5 w-5 text-green-700"
                                               alt='successr'/>
                                    )}
                                </div>
                            )}
                        />


                        {isFieldInvalid(field.name) &&
                            <span className="text-red-500 text-sm mt-1">{`Invalid ${field.labelName}`}</span>}
                    </div>
                );
            })}

            <button
                type="submit"
                className={`w-full bg-blue-500 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-blue-700`}
            >
                Continue
            </button>
        </form>
    );

    if (show) {
        return actualForm;
    }
    return <div>
        <div className='text-blue-500 hover:text-blue-700' onClick={() => {
            setShow(true);
            onEditClick();
        }}>edit
        </div>
    </div>
};

export default MyForm2;

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
}

const MyForm2: React.FC<MyFormProps> = ({onSubmit, fields}) => {
    const {control, handleSubmit, formState: {errors, isValid, touchedFields}, reset, getValues} = useForm({
        mode: 'onChange'
    });

    const [show, setShow] = useState(true);


    const handleFormSubmit = (data: any) => {
        onSubmit(data);
        reset(getValues());
        setShow(false);
    };

    const isFieldValid = (fieldName: string) => {
        const vals = getValues();
        console.log('vals???', vals);
        return touchedFields[fieldName] && !errors[fieldName];
    };

    const isFieldInvalid = (fieldName: string) => {
        return touchedFields[fieldName] && errors[fieldName];
    }

    const actualForm = (
        <form onSubmit={handleSubmit(handleFormSubmit)}
              className="space-y-6 max-w-md mx-auto p-6 bg-white rounded shadow-md">
            {fields.map((field) => (
                <div key={field.name} className="relative">
                    <label htmlFor={field.name} className="block text-gray-700 font-semibold mb-2">{field.label}</label>
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
                                    className={`block w-full border ${errors[field.name] ? 'border-red-500' : 'border-gray-300'} rounded py-2 px-4 focus:outline-none focus:ring-2 ${errors[field.name] ? 'focus:ring-red-500' : 'focus:ring-blue-500'}`}
                                />
                                {isFieldInvalid(field.name) && (
                                    <Image src='/errorBang.png'
                                           width={24}
                                           height={24}
                                           className="absolute right-3 top-2.5 h-5 w-5 text-red-500"
                                           alt='error'/>
                                )}
                            </div>
                        )}
                    />
                    {isFieldValid(field.name) && (
                        <span className="absolute right-2 top-9 text-green-500">&#10003;</span>
                    )}

                    {isFieldInvalid(field.name) &&
                        <span className="text-red-500 text-sm mt-1">{`Invalid ${field.labelName}`}</span>}
                </div>
            ))}

            <button
                type="submit"
                className={`w-full bg-blue-500 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-blue-700 ${!isValid ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                Submit
            </button>
        </form>
    );

    if (show) {
        return actualForm;
    }
    return <div>
        <button onClick={() => setShow(true)}>edit</button>
    </div>
};

export default MyForm2;

import React, {useState} from 'react';
import {useForm, Controller, SubmitHandler, FieldValues} from 'react-hook-form';
import {hasContent, validateExpiryDate, validateThreeDigitNumber, validateZipCode} from "@/app/validators";

interface FormValues {
    username: string;
    email: string;
    password: string;
    creditCard: string;
}

interface FormProps {
    onSubmit: SubmitHandler<FieldValues>;
}

// @ts-ignore
export const MyForm: React.FC<FormProps> = ({onSubmit}) => {
    const {control, handleSubmit, formState: {errors, isValid, touchedFields}, reset, getValues} = useForm<FormValues>({
        mode: 'onChange'
    });

    const [show, setShow] = useState(false);

    const innerSubmit = (data: FormValues) => {
        console.log(data);
        // Reset the form with the current values to keep them in the form
        reset(getValues());
        onSubmit(data);
        setShow(false);
    };

    const isFieldValid = (fieldName: keyof FormValues) => {
        return touchedFields[fieldName] && !errors[fieldName];
    };

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

    const actualForm = (<form onSubmit={handleSubmit(innerSubmit)} className="space-y-4">
        <div className="relative">
            <label htmlFor="username">Username</label>
            <Controller
                name="username"
                control={control}
                defaultValue=""
                rules={{required: 'Username is required'}}
                render={({field}) => (
                    <input {...field}
                           className={`border ${errors.username ? 'border-red-500' : 'border-gray-300'} pr-10`}/>
                )}
            />
            {isFieldValid('username') && (
                <span className="absolute right-0 top-0 mt-2 mr-2 text-green-500">&#10003;</span>
            )}
            {errors.username && <span className="text-red-500">{errors.username.message}</span>}
        </div>

        <div className="relative">
            <label htmlFor="email">Email</label>
            <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{
                    required: 'Email is required',
                    pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: 'Invalid email address'
                    }
                }}
                render={({field}) => (
                    <input {...field}
                           className={`border ${errors.email ? 'border-red-500' : 'border-gray-300'} pr-10`}/>
                )}
            />
            {isFieldValid('email') && (
                <span className="absolute right-0 top-0 mt-2 mr-2 text-green-500">&#10003;</span>
            )}
            {errors.email && <span className="text-red-500">{errors.email.message}</span>}
        </div>

        <div className="relative">
            <label htmlFor="password">Password</label>
            <Controller
                name="password"
                control={control}
                defaultValue=""
                rules={{required: 'Password is required'}}
                render={({field}) => (
                    <input {...field} type="password"
                           className={`border ${errors.password ? 'border-red-500' : 'border-gray-300'} pr-10`}/>
                )}
            />
            {isFieldValid('password') && (
                <span className="absolute right-0 top-0 mt-2 mr-2 text-green-500">&#10003;</span>
            )}
            {errors.password && <span className="text-red-500">{errors.password.message}</span>}
        </div>

        <div className="relative">
            <label htmlFor="creditCard">Credit Card</label>
            <Controller
                name="creditCard"
                control={control}
                defaultValue=""
                rules={{
                    required: 'Credit card number is required',
                    validate: validateCreditCardNumber
                }}
                render={({field}) => (
                    <input {...field}
                           className={`border ${errors.creditCard ? 'border-red-500' : 'border-gray-300'} pr-10`}/>
                )}
            />
            {isFieldValid('creditCard') && (
                <span className="absolute right-0 top-0 mt-2 mr-2 text-green-500">&#10003;</span>
            )}
            {errors.creditCard && <span className="text-red-500">{errors.creditCard.message}</span>}
        </div>

        <button type="submit" disabled={!isValid}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
            Submit
        </button>
    </form>);

    if (show) {
        return actualForm;
    }
    return <div>
        <button onClick={() => setShow(true)}>edit</button>
    </div>
};

export default MyForm;

const validateCreditCardNumber = (value: string) => {
    // Remove all non-digit characters
    const sanitizedValue = value.replace(/\D/g, '');

    // Check if the sanitized value is empty or does not match the expected length
    if (!sanitizedValue || sanitizedValue.length < 13 || sanitizedValue.length > 19) {
        return 'Invalid credit card number';
    }

    let sum = 0;
    let shouldDouble = false;

    // Loop through the digits of the credit card number
    for (let i = sanitizedValue.length - 1; i >= 0; i--) {
        let digit = parseInt(sanitizedValue[i]);

        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }

        sum += digit;
        shouldDouble = !shouldDouble;
    }

    // Check if the sum is divisible by 10
    if (sum % 10 !== 0) {
        return 'Invalid credit card number';
    }

    return true;
};

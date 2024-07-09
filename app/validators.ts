/**
 * Validates a credit card number using the Luhn algorithm.
 * @param cardNumber - The credit card number as a string.
 * @returns True if the credit card number is valid, false otherwise.
 */
export const validateCreditCardNumber = (cardNumber: string): boolean => {
    // Remove all non-digit characters
    const sanitized = cardNumber.replace(/\D/g, '');

    // Check if the sanitized input is numeric and has a valid length
    if (!/^\d{13,19}$/.test(sanitized)) {
        return false;
    }

    let sum = 0;
    let shouldDouble = false;

    // Iterate over the digits from right to left
    for (let i = sanitized.length - 1; i >= 0; i--) {
        let digit = parseInt(sanitized[i]);

        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }

        sum += digit;
        shouldDouble = !shouldDouble;
    }

    return sum % 10 === 0;
};

// Example usage
// const cardNumber = '4111111111111111';
// const isValid = validateCreditCardNumber(cardNumber);
// console.log(`The credit card number ${cardNumber} is ${isValid ? 'valid' : 'invalid'}.`);

 /**
 * Validates a MM/YY date string and checks if it is in the future.
 * @param date - The date string in MM/YY format.
 * @returns True if the date is valid and in the future, false otherwise.
 */
export const validateExpiryDate = (date: string): boolean => {
    // Check if the date matches the MM/YY format
    const regex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    if (!regex.test(date)) {
        return false;
    }

    // Extract the month and year from the date string
    const [month, year] = date.split('/').map(Number);

    // Get the current date
    const now = new Date();
    const currentMonth = now.getMonth() + 1; // JavaScript months are 0-11
    const currentYear = now.getFullYear() % 100; // Get last two digits of the year

    // Check if the year is in the future or if the year is the current year but the month is in the future
    if (year > currentYear || (year === currentYear && month >= currentMonth)) {
        return true;
    }

    return false;
};

export const validateThreeDigitNumber = (input: string | number): boolean => {
    // Convert the input to a string
    const inputString = input.toString();

    // Check if the input matches the three-digit pattern
    const threeDigitPattern = /^[0-9]{3}$/;

    return threeDigitPattern.test(inputString);
};

export const hasContent = (str: string) : boolean => {
    if (!str) {return false;}
    const trimmed = str.trim();
    return trimmed.length > 0;
};

/**
 * Validates if a given input is a valid US zip code.
 * A valid US zip code can be either 5 digits or 9 digits with a hyphen.
 * @param zipCode - The input to validate.
 * @returns True if the input is a valid US zip code, false otherwise.
 */
export const validateZipCode = (zipCode: string | number): boolean => {
    // Convert the input to a string
    const zipCodeString = zipCode.toString();

    // Check if the input matches the US zip code pattern
    const zipCodePattern = /(^\d{5}$)|(^\d{5}-\d{4}$)/;

    return zipCodePattern.test(zipCodeString);
};
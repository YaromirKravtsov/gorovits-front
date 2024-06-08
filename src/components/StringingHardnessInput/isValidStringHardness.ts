export const isValidString = (str:string) => {
    const decimalRegex = /^\d+\.\d+×\d+\.\d+$/;
    const integerRegex = /^\d+×\d+$/;

    return decimalRegex.test(str) || integerRegex.test(str);
};

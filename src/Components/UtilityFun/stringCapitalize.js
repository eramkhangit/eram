
// _____________ Fun to capital first latter of every word _________
export const capitalizeWords = (name) => {
    return name
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
};
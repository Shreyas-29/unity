export const isImageValid = (url: string) => {
    const regex = /^(http(s)?:\/\/)?[a-zA-Z0-9-.]+\.[a-zA-Z]{2,6}([-a-zA-Z0-9@:%_+.~#?&//=]*)$/;
    return regex.test(url);
};

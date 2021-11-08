export const fetchImage= (url, body = null) => {
    const options = {
        method: 'POST',
        body: body,
    };
    return fetch(url, options);
};

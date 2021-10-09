module.exports = {
    success: (info, data) => {
        console.log(`💋💋💋${ info || '' } success!!!, data is: \r\n${ data || '' }`);
    },
    error: (info, data) => {
        console.log(`❗️❗️❗️${ info || '' } error!!!, data is: \r\n${ data || '' }`);
    }
};

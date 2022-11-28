export const getBindMessage = (did)=>{
    const timestamp = Date.now();
    const message = `Link this account to your did: ${did}\nTimestamp: ${timestamp}`;
    return {
        message,
        timestamp
    };
};

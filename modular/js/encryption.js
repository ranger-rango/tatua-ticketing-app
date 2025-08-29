function enc(data)
{
    return CryptoJS.AES.encrypt(data, secretKey).toString();
}

function dec(data)
{
    const bytes = CryptoJS.AES.decrypt(data, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
}
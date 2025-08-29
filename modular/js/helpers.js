function generateUUID() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

function genID()
{
    let uuid = generateUUID().replace(/-/g, "");
    let bytes = uuid.match(/.{2}/g).map(byte => String.fromCharCode(parseInt(byte, 16)));
    return btoa(bytes.join("")).replace(/=/g, "").substring(0, 16);
}

function genDataTime()
{
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
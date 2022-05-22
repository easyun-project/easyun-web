export default function getAvaliablePaths(svrId, volumes){
    const arr:string[] = [];
    for (let i = 3; i < 26; i++) {
        arr.push('/dev/sd' + String.fromCharCode(97 + i));
    }
    const attaches = volumes.map(vol => vol.volumeAttach).flat().filter(attach=>attach.svrId === svrId);
    return arr.filter(path =>attaches.every(attach => attach.attachPath !== path));
};

export const convertTime=()=>{
    const date=new Date();
    const formatedDate=`${date.toLocaleDateString} ${date.toLocaleTimeString}`;
    return formatedDate;
}

export const shortAddress=(address)=>{
    return (address && `${address.slice(0,6)+"..."+address.slice(36,42)}`);
}
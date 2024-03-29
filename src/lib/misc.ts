export const genIndexes = (count: number) => 
{
    const ret: number[] = [];
    for(let i=0;i<count;i++) ret.push(i);
    return ret;
};

export const getParameterByName = (name: string,url = window.location.href) => 
{
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
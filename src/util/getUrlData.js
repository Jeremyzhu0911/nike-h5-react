export function getUrlData(name) {
    const url = window.location.href
    const index = url.indexOf("?")
    const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
    const r = url.substr(index+1).match(reg);
    if (r != null) return decodeURIComponent(r[2]);
    return null;
}

export function getLinkUrl(name,url) {
    const index = url.indexOf("?")
    const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
    const r = url.substr(index+1).match(reg);
    if (r != null) return decodeURIComponent(r[2]);
    return null;
}

export function convertToChinese(num,week){
    if(week !== "week"){
        let N = [
            "零", "一", "二", "三", "四", "五", "六", "七", "八", "九"
        ];
        let str = num.toString();
        let len = num.toString().length;
        let C_Num = [];
        for(let i = 0; i < len; i++){
            C_Num.push(N[str.charAt(i)]);
        }
        return C_Num.join('');
    }else{
        let N = {
           "week1":"一", "week2":"二","week3":"三", "week4":"四", "week5":"五", "week6":"六", "week7":"日"
        };
        return N["week"+num]
    }

}
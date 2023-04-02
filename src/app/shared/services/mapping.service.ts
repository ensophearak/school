import firebase from 'firebase/compat/app'
import * as moment from 'moment';
import * as _ from 'lodash';
import * as Path from 'path'
export class MappingService {
    static dateKey() {
        return Number(moment().format('YYYYMMDD'))
    }
    static pageKey() {
        return Number(moment().format('YYYYMMDDHHmmss'))
    }
}


export const generateKeywords = (names: string[]) => {
    const keywordName = _.flattenDeep(_.map(names, (m) => createKeywords(m))).filter(a => a)
    return [
        ...new Set([
            '~N/A~',
            ...keywordName
        ])
    ];
}

export const createKeywords = (value: string) => {
    const name = value?.toString();
    const arrName: any[] = [];
    let nextLetter = ''
    name.trim().split(/[ .\-_\s ]/).forEach(letter => {
        let nextWord = ''
        return (letter.split('').forEach(word => {
            nextWord += word;
            arrName.push(toCapitalize(nextWord));
        }))
    })
    name.trim().split("").forEach(word => {
        nextLetter += word;
        arrName.push(toCapitalize(nextLetter));
    })
    return arrName
}
export function toCapitalize(value) {
    let string = null;
    if (value) string = value.toUpperCase().toString().trim();
    return string;
}

export function toNumber(value: unknown) {
    if (value === null || value === "" || value === undefined) {
        return 0;
    }
    if (Number.isNaN(Number(value))) return 0;
    return Number(value);
}

export function pushToArray(snapshot: firebase.firestore.QuerySnapshot): Array<any> {
    if (snapshot.empty) return [];
    return snapshot.docs.map((m: any) => ({ ...m.data(), id: m.id }));
}

export function pushToObject(doc: firebase.firestore.DocumentSnapshot): any {
    if (!doc.exists) return null;
    return { ...doc.data(), key: doc.id }
}

export function orderBy(rows: Array<any>, field: string, ascDesc: any = "asc") {
    return _.orderBy(rows, [field], ascDesc)
}

export function fromDateToDateCustomHours(date: Date, fromHours: string, toHours: string) {
    const fromHour = moment(fromHours.toLocaleUpperCase(), "hh:mm A").format('HHmm')
    const toHour = moment(toHours.toLocaleUpperCase(), "h:mm A").format('HHmm')
    const dateTime = moment(date).format('YYYYMMDD')
    const formDate = `${dateTime}${fromHour}`
    const toDate = `${dateTime}${toHour}`

    return ({
        formDate: moment(formDate, "YYYYMMDDHHmm"),
        toDate: moment(toDate, "YYYYMMDDHHmm")
    })
}

export function fromDateToCustomHours(date: Date) {
    return moment(date)
}
export function toFlatten(rows: Array<any>) {
    return _.flatten(rows)
}

export function TimeLeft(date1: Date, date2: Date) {
    const time1 = moment(date1)
    const time2 = moment(date2)
    return moment.duration(time2.diff(time1)).asSeconds()
}
export function durationLeft(serverTime: Date, startDate: Date | null, duration: number, endDateTime?: Date) {
    const timeLeft = TimeLeft(startDate || serverTime, serverTime)
    const durationLeft = (duration) - timeLeft
    if (endDateTime) {
        const DateTimeLeft = new Date(serverTime.getTime() + (durationLeft * 1000)).getTime()
        if (DateTimeLeft >= endDateTime.getTime()) {
            return TimeLeft(serverTime, endDateTime)
        }
        return durationLeft
    }
    return durationLeft
}


export function pushObjArray(data: Array<any>, newItem: any, field: any = "key") {
    let value = [];
    if (data && data.length > 0) {
        value = data;
        const exist = value.filter(m => m[field] === newItem.key);
        if (exist && exist.length > 0) {
            const index = value.findIndex((obj => obj[field] == newItem.key));
            value[index] = newItem;
        } else {
            value.push(newItem);
        }
    } else {
        value.push(newItem);
    }

    return value;
}

export function orderByData(rows: Array<any>, field: string, ascDesc: any = "asc") {
    return _.orderBy(rows, [field], ascDesc)
}



export type ImageSizeType = '200' | '400' | '680' | '720' | '1024' | '1280'

export function transformImageSameTokenNoWebp(uri: string, size: ImageSizeType) {
    const [pathUrl, token, rawPath] = UrlToPath(uri)
    const [imgPath, name] = fileNameAddSize(pathUrl, size);
    const fileName = Path.parse(name).name
    const pathName = size ? `${imgPath ? `${imgPath}/` : ''}thumbs/${fileName}.webp` : `${imgPath ? `${imgPath}/` : ''}${fileName}.webp`
    const ref = encodeURIComponent(pathName)
    return { uri: `${rawPath}${ref}?${token}` }
}

export function transformImageSameTokenNo(uri: string, size: ImageSizeType) {
    const [pathUrl, token, rawPath] = UrlToPath(uri)
    const [path, name] = fileNameAddSize(pathUrl, size);
    const pathName = size ? `${path ? `${path}/` : ''}thumbs/${name}` : `${path ? `${path}/` : ''}${name}`
    const ref = encodeURIComponent(pathName)
    return { uri: `${rawPath}${ref}?${token}` }
}

export function UrlToPath(url: string) {
    const rawSplit = url?.split('/').pop()?.split('?')
    const rawPath = url.replace(url?.split('/').pop() ?? '', '')
    if (Array.isArray(rawSplit) && rawSplit.length > 0) {
        return [decodeURIComponent(rawSplit[0]), rawSplit[1], rawPath]
    }
    return ['', '', '']
}

export function fileNameAddSize(pathUrl: string, size?: ImageSizeType) {
    const imgName = pathUrl.split('/').pop()?.split('.').slice(0, -1).join('.') || pathUrl.split('/').pop() || ''
    const path = pathUrl.split('/').slice(0, -1).join('/')
    const urlWithoutExt = pathUrl.replace(/\.[^/.]+$/, '') || ''
    const ext = pathUrl.replace(urlWithoutExt, '') || '';
    const imgSize = size ? `_${size}x${size}` : ''
    const name = `${imgName}${imgSize}${ext}`
    return [path, name]
}

export function urlToBase64(url: string) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.setAttribute("crossOrigin", "anonymous");
        img.src = url;
        img.onload = () => {
            const canvas = document.createElement('canvas'),
                ctx = canvas.getContext('2d');
            canvas.height = img.height;
            canvas.width = img.width;
            ctx.fillStyle = "rgba(255, 255, 255, 5)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
            resolve(canvas.toDataURL('image/jpeg'));
        };
        img.onerror = error => reject(error);
    })
}



export function mapRouteWithSchoolKey(item: any[], schoolKey: string) {
    if (!item) return [];
    const arrayRoute = item.map(m => ({ ...m, route: `/${schoolKey}/${m.route}` }));
    return arrayRoute
}

export function mapRouteWithSchoolKeyAndItemKey(item: any[], schoolKey: string, itemKey: string) {
    if (!item) return [];
    const arrayRoute = item.map(m => ({ ...m, route: `/${schoolKey}/${m.route}/${itemKey}/${m.path}` }));
    return arrayRoute
}

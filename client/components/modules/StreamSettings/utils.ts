import { v4 as uuid } from "uuid"

export const generateStreamKey = (str: string): string => str.split('').reduce((a,b)=>{a=((a<<5)-a)+b.charCodeAt(0); return a&a},0).toString()
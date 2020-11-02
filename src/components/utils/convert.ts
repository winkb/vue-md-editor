import { isRef, Ref } from 'vue'

export function toAny(org: any) {
    return org
}

export function toRefValue(refObj: Ref | String) {
    return isRef(refObj) ? refObj.value : refObj
}
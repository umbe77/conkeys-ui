import { BehaviorSubject, debounceTime, from, mergeMap } from "rxjs"

export const createSearchObservable = (searchFunc) => {
    const sbj$ = new BehaviorSubject("")
    const search$ = sbj$.pipe(
        debounceTime(250),
        mergeMap((val) => from(searchFunc(val)))
    )
    return search$
}

let keys$ = null

export const getKeysObservable = (searchFunc) => {
    return (
        keys$ ??
        (() => {
            keys$ = createSearchObservable(searchFunc)
            return keys$
        })()
    )
}

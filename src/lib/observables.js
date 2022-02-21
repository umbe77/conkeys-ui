import { BehaviorSubject, debounceTime, from, mergeMap } from "rxjs"

export const createSearchObservable = (searchFunc) => {
    const keys$ = new BehaviorSubject("")
    const search$ = keys$.pipe(
        debounceTime(250),
        mergeMap((val) => from(searchFunc(val)))
    )
    return search$
}

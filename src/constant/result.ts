export interface Result<T> {
    stats_code: number,
    message: string,
    detail: T
}

export const fail = async (): Promise<undefined> => {
    return undefined
}


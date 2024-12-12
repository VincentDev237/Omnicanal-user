export interface IUser {
    id?: any | null,
    username: string,
    email: string,
    password: string,
    confirmPassword?: string,
    roles?: Array<string>,
}
export type UserType = {
    id: string,
    username: string,
    email: string,
    roles: string[],
    token: string
}

export type LoginDataType = {
    username: string,
    password: string
}

export type SignupUserType = {
    email: string,
    username: string,
    password: string,
}

export type BookType = {
    author: string,
    favourite: boolean,
    googleBookId: string,
    id: number,
    imageUrl: string,
    status: string,
    title: string,
}
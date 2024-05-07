import { NumberSchema } from "yup"

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
    id: string | number,
    imageUrl: string,
    status: string,
    title: string,
}

export type BooksObjectType = {
    READ: BookType[],
    READING: BookType[],
    GOING_TO_READ: BookType[],
}

export type MoodScoresType = {
    IN_LOVE?: number,
    HAPPY?: number,
    RELAXED?: number,
    INTRIGUED?: number,
    SCARED?: number,
    TENSE?: number,
    NOSTALGIC?: number,
    SAD?: number
}

export type BookDetailType = {
    author: string,
    averageRating: number,
    categories: string[],
    description: string,
    endDate: string,
    favourite: boolean,
    googleBookId: string,
    imageUrl: string,
    isbn: string,
    moodsPercentages: object,
    moodsScores: MoodScoresType,
    publishedDate: string,
    review: { score: number, comment: string }
    startDate: string,
    status: string,
    title: string,
    volumeInfo: { title: string, authors: string[] },
    id: string
}

export type FormValuesType = {
    title: string,
    author: string,
    status: string,
    rate: string | number,
    review: string,
    moods: string | string[],
    mood: string,
    moodsrate: {
        in_love: number,
        happy: number,
        relaxed: number,
        intrigued: number,
        scared: number,
        tense: number,
        nostalgic: number,
        sad: number
    },
    startDate: string | number | null,
    endDate: string | number | null,
}
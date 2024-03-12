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

export type BooksObjectType = {
    READ: BookType[],
    READING: BookType[],
    GOING_TO_READ: BookType[],
}

export type BookDetailType = {
    author: string,
    averageRating: number,
    categories: string[],
    description: string,
    endDate: Date | null,
    favourite: boolean,
    googleBookId: string,
    imageUrl: string,
    isbn: string,
    moodsPercentages: object,
    moodsScores: object,
    publishedDate: string,
    review: { score: number, comment: string }
    startDate: Date | null,
    status: string,
    title: string,
    volumeInfo: { title: string, authors: string[] }
}
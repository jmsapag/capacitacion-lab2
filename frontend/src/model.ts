export interface ToDo {
    "id": number,
    "name": string,
    "userId": number,
    "completed": boolean,
    "createdAt": string,
    "updatedAt": string,
    "user": {
        "id": number,
        "firstname": string,
        "lastname": string,
        "email": string,
        "createdAt": string,
        "updatedAt": string
    }
}
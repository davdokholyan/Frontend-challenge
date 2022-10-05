import { ITodo } from "./ITodo";

export interface IUser {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    todoList: ITodo[];
}

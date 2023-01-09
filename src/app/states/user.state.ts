import { User } from "../models/user.model";

export interface UserState{
    isSuccess: any;
    error: string;
    userList: any;
    total: any;
    user: User;
    currentUser: any;
}
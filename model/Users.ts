export interface User {
    username: string;
    password: string;
}

export let users = new Map<string, User>();

users.set('Standard User', {username: 'standard_user', password: 'secret_sauce'});
users.set('Locked User', {username: 'locked_out_user', password: 'secret_sauce'});

export function getUser(username: string): User | undefined {
    return users.get(username);
}
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { User } from '../types/user';

class UserModel {
    private users: User[] = [];

    findByUsername(username: string): User | null {
        return this.users.find(user => user.username === username) || null;
    }

    async login(username: string, password: string): Promise<User | null> {
        const user = this.findByUsername(username);
        if (!user) return null;

        const isMatch = await bcrypt.compare(password, user.password);
        return isMatch ? user : null;
    }

    async create(newUser: Omit<User, 'id'>): Promise<User | false> {
        const existingUser = this.findByUsername(newUser.username);
        if (existingUser) return false;

        const hashedPassword = await bcrypt.hash(newUser.password, 12);
        const user: User = {
            id: uuidv4(),
            ...newUser,
            password: hashedPassword
        };

        this.users.push(user);
        return user;
    }
}

export default new UserModel();

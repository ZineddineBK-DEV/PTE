export class User{
    constructor (
    public    token: string,
    public   expiresIn: number,
    public  fullName: string,
    public image: any,
    public id: string,
    public  roles: string
    ){}
}
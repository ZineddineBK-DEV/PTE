export class User{
    constructor (
    public    token: string,
    public   expiresIn: number,
    public  fullName: string,
    public email :string,
    public image: string,
    public id: string,
    public  roles: string,
    public DateOfBirth: Date,
    public password: string,
    public phone : string,
    public nationality: string,
    public familySituation: string,
    public address: string,
    public department:string,
    public drivingLicense: boolean,
    public gender: string,
    public experience: number,
    public hiringDate: Date,
    public title : string,
    
    ){}
}
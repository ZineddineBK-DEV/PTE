export class User{
    constructor (
    public    token: string,
    public   expiresIn: number,
    public  firstName: string,
    public lastName:string,
    public email :string,
    public image: string,
    public _id: string,
    public  roles: string,
    public DateOfBirth: Date,
    public password: string,
    public phone : number,
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
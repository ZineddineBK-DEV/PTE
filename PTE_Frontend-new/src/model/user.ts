

export class User{
    constructor(

        public image:string,
        public id :string ,
        public fullName:string,
        public email:string,
        public phone:string,
        public password:string,
        public roles:string,
        public familySituation:String,
        public DateOfBirth:Date,
        public address:String,
        public department:String,
        public drivingLicense:Boolean ,
        public gender:String ,
        public isEnabled:Boolean,
        public experience:Number,
        public hiringDate:Date,
        public title:String, 
        public cv :string,
        //public cv: { type: mongoose.Schema.Types.ObjectId, ref: "Cv" },
        //public career: { type: mongoose.Schema.Types.ObjectId, ref: "Career" },

    ){}
}
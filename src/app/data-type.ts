export interface signUp{
    name:"string",
    password:"string",
    email:"string"
}
export interface logIn{
    email:string
    
    password:string
}
export interface product{
    name:string,
    price:number,
    category:string,
    color:string,
    decscription:string,
    image:string,
    id:number
}
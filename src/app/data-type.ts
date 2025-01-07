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
    filter(arg0: any): unknown;
    name:string,
    price:number,
    category:string,
    color:string,
    decscription:string,
    image:string,
    id:number,
    quantity:undefined |number,
    productId:undefined |number,
}
export interface cart{
    name:string,
    price:number,
    category:string,
    color:string,
    decscription:string,
    image:string,
    id:number | undefined,
    quantity:undefined |number;
    userId:number;
    productId:number;
}

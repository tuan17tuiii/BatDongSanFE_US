import { Image } from "./image.entities";
import { TypeRealState } from "./typerealstate.entities";


export class RealState{
    id : string ; 
    title : string ; 
    describe :  string ; 
    price : number ; 
    type : number ; 
    acreage : number ; 
    bedrooms : number  ; 
    bathrooms : number ; 
    status : boolean ; 
    createdAt : string;
    city : string ; 
    street : string ; 
    region : string ; 
    typeRealState : string ; 
    nameusersell:string;
    image:Image[]
    lastImage : Image
    usersellId : string 
    transactionType : string ; 
    sold : boolean ; 
    expired : boolean ; 
    createdEnd : string ; 
}
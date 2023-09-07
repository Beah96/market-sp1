import { NextFunction, Request, Response } from "express"
import { IProduct } from "./interfaces"
import {allProducts} from "./database"

const verifyName = (
    request : Request, 
    response : Response, 
    next : NextFunction) =>{

    const product : IProduct | undefined = allProducts.find(
        (product)=>product.name === request.body.name
    )

    if(product){
        return response.status(409).json({message: "Product already registered."})
    }

    return  next()
}

const verifyID = (
    request : Request, 
    response : Response, 
    next : NextFunction)=>{

    const product : IProduct | undefined = allProducts.find(
        (product)=> product.id === Number(request.params.id)
    )
    
    if(!product){
        return response.status(404).json({message: "Product not found."})
    }
    
    response.locals.product = product

    return next()
}

export { verifyName, verifyID }
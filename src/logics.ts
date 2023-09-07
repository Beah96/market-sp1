import { Request, Response } from "express"
import { allProducts } from "./database"
import { IProduct } from "./interfaces";

const getNextId = (): number => {
    const lastProduct: IProduct | undefined = allProducts
      .sort((a:  IProduct, b:  IProduct): number => a.id - b.id)
      .at(-1);
  
    if (!lastProduct) return 1;
  
    return lastProduct.id + 1;
  };

const totalPrice = (array: IProduct[]): number =>{
    const totalMarket : number[] = []
    array.forEach((product)=>totalMarket.push(product.price))

    if(totalMarket.length === 0){
        return 0
    }
    const priceSum : number = totalMarket.reduce((a, b)=>{return a+b} )

    return priceSum
}

const readMarket = (request : Request, response : Response) : Response => {

    if(request.query.section){
        if(request.query.section !== "food" && request.query.section !== "cleaning"){
            return  response.status(404).json({message: "Section not found"})
        }

       const filteredProducts = allProducts.filter((product)=>{
           return product.section === request.query.section
        })

        const filteredBySection ={
            total: totalPrice(filteredProducts),
            products: filteredProducts
        }

        return response.status(200).json(filteredBySection)

    }

    const market ={
        total: totalPrice(allProducts),
        products: allProducts
    }

    return response.status(200).json(market)
}

const createProduct = (request : Request, response : Response) : Response => {
    const currentDate = new Date();
    const newDate = currentDate.getFullYear() + 1
    currentDate.setFullYear(newDate)

    const newProduct : IProduct = {
        id: getNextId(),
        ...request.body,
        expirationDate: currentDate
    }

    allProducts.push(newProduct)

    return response.status(201).json(newProduct)
}

const getProductByID = (request : Request, response : Response) : Response =>{
    return response.status(200).json(response.locals.product)
}

const updateProduct = (request : Request, response : Response) : Response => {
        const id = request.params.id
        const indexProduct : number = allProducts.findIndex(
            (product : IProduct)=> product.id === Number(id)
        )
        const updateProduct = (allProducts[indexProduct]={
            ...allProducts[indexProduct],
            ...request.body
        })

        return response.status(200).json(updateProduct)
}

const deleteProduct = (request : Request, response : Response) : Response => {
    const id = request.params.id
    const indexProduct : number = allProducts.findIndex(
        (product : IProduct)=> product.id === Number(id)
    )
    allProducts.splice(indexProduct, 1)

    return response.status(204).json()
}

export { readMarket, createProduct, getProductByID, updateProduct, deleteProduct}
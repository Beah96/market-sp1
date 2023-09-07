import express, { Application, json } from "express"
import { verifyID, verifyName }  from "./middlewares"
import { createProduct, deleteProduct, getProductByID, readMarket, updateProduct } from "./logics"

const app : Application = express()
app.use(json())
const PORT: number = 3000
const runningMSG : string = `Server running on http://localhost:${PORT}`

app.get('/products', readMarket)
app.post('/products', verifyName,createProduct )
app.get('/products/:id', verifyID, getProductByID)
app.patch('/products/:id', verifyName, verifyID, updateProduct)
app.delete('/products/:id', verifyID, deleteProduct)


app.listen(PORT, ()=>{
    console.log(runningMSG)
})
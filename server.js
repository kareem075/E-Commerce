let express=require('express')
let server=express()
let products=require('./products.js')
server.use(express.json())
server.get('/products',(req,res)=>{
    if(req.query.category)
    {
        let result= products.filter((n)=>{
            return n.category.toLowerCase()==req.query.category.toLowerCase()
        })
        if(result.length==0)
        {
            return res.status(404).send(`no products found with category : ${req.query.category}`)
        }
        else
        {
            res.json(result)
        }
    }
    else
    {
    res.json(products)
    }
})
server.get('/products/:id',(req,res)=>{
    let result=products.find((n)=>{
        return n.id==req.params.id
    })
    if(!result)
        res.status(404).send(`no product found with id: ${req.params.id}`)
    else
    res.json(result)
})
server.post('/addproduct',(req,res)=>{
    let newproduct= {
        id:req.body.id,
        name:req.body.name,
        category:req.body.category,
        price:req.body.price,
        quantity:req.body.quantity
    }
    products.push(newproduct)
    res.status(200).send("new product added")
})
server.put('/updateproduct/:id',(req,res)=>{
    let index=products.findIndex((n)=>{
        return n.id==req.params.id
    })
    if(index==-1)
        res.status(404).send(`product with id ${req.params.id} not found`)
    else
    {
    products[index].price=req.body.newprice
    res.status(200).send("product updated")
    }

})

server.delete('/deleteproduct/:id',(req,res)=>{
    let newProducts=products.filter((n)=>{
        return n.id!=req.params.id
    })
    products=newProducts
    res.status(200).send("product deleted")
})
server.listen(800,()=>{
    console.log('server is up and listening to port 800')
})

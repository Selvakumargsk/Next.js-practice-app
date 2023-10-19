export default function routesHandler(req , res){
    console.log(req.query);
    res.status(404).send(`result for ${req.query.params} is not found`)
}
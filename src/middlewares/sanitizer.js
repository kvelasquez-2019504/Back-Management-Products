
const cleanData = (data)=>{
    Object.entries(data).map(([key,value])=>{
        data[key]=String(value).trim().replace(/<script.*?>.*?<\/script>/gi,'');
        data[key]=data[key].replace(/[^a-zA-Z0-9áéíóúüñÑ\s]/g,'');
    })
    return data;
}

export const sanitizer =(req,res,next)=>{
    if(req.body){
        req.body=cleanData(req.body);
    }
    next();
}
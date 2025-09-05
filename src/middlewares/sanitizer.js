const exceptions=["price"]
const cleanData = (data)=>{
    Object.entries(data).map(([key,value])=>{
        data[key]=String(value).trim().replace(/<script.*?>.*?<\/script>/gi,'');
        if(exceptions.includes(key)){
            switch(exceptions[key]){
                case "price":
                    if(isNaN(value)){
                        data[key]=0;
                    }
                    data[key]=data[key].replace(/[^0-9.]/g,'');
                    break;
            }
            return;
        };
        data[key]=data[key].replace(/[^a-zA-Z0-9áéíóúüñÑ\s]/g,'');
    })
    return data;
}

export const sanitizer =async(req,res,next)=>{
    if(req.body){
        req.body=cleanData(req.body);
    }
    next();
}
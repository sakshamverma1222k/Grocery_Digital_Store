export interface ResponseData {
    status: number;
    statusMessge:string;
    data:any
}

export function buildResponse(status:number, statusMessage:string, data:any){
    var r:ResponseData = { 
        status:status,
        statusMessge:statusMessage, 
        data:data
     } 
     return r;
}
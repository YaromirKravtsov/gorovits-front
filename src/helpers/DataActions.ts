export class DataActions{
    static deleteById(arr:any[], id:number){
        return arr.filter(element =>{
            return element.id !== id;
        })
    } 
    static update(arr:any[], newElement:any){
        return arr.map(element =>{
            if (element.id === newElement.id){
                return newElement;
            }else{
                return element;
            }
        })
    } 
    static addToStart(arr:any[], newElement:any){
        return [newElement, ...arr]
    } 
}
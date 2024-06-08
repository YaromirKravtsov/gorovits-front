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

    static base64ToBlob(base64: string, contentType: string) {
        // Убедитесь, что строка корректно закодирована
        function isBase64(str: string) {
            try {
                return btoa(atob(str)) === str;
            } catch (err) {
                return false;
            }
        }
    
        // Удалите префикс, если он есть
        const base64Cleaned = base64.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
    
        if (!isBase64(base64Cleaned)) {
            throw new Error("The string to be decoded is not correctly encoded.");
        }
    
        const byteCharacters = atob(base64Cleaned);
        const byteArrays = [];
    
        for (let offset = 0; offset < byteCharacters.length; offset += 512) {
            const slice = byteCharacters.slice(offset, offset + 512);
            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
    
        const blob = new Blob(byteArrays, { type: contentType });
        return blob;
    }
    
    
    static convertImageToBase64(url:string, callback:(value:any) => void) {
        // Загрузка изображения
        fetch(url)
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok.');
                return response.blob(); // Получаем изображение как Blob
            })
            .then(blob => {
                // Используем FileReader для преобразования Blob в base64
                const reader = new FileReader();
                reader.onloadend = () => {
                    // В reader.result содержится base64 строка
                    callback(reader.result);
                };
                reader.readAsDataURL(blob); // Считываем Blob, получая результат в формате base64
            })
            .catch(error => {
                console.error('Error fetching and parsing the image', error);
            });
    }
    
    static async checkImageAvailability(imageUrl:string) {
        try {
          const response = await fetch(imageUrl);
          if (response.ok) {
            if (response.status === 204 || response.status === 205) {
              return false;
            } else {
              return true;
            }
          } else {
            return false; 
          }
        } catch (error) {
          console.error('Ошибка загрузки изображения:', error);
          return false; 
        }
      }
      
    
}
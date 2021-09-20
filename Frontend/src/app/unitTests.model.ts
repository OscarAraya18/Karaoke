export class unitTests{

    letraCancion = [{tiempo:"",letra:""}];
    transformarLRC(letra:string): any{
        let linea = "";
        this.letraCancion = [];
        for(var caracter of letra){
        
            if(caracter!="\n"){
            
                linea += caracter
            }else{
                this.letraCancion.push({tiempo:linea.substring(1,9),letra:linea.substring(10)});
                linea = ""
            }
        }
        this.letraCancion.push({tiempo:linea.substring(1,9),letra:linea.substring(10)});

        return this.letraCancion;
    }


    
}
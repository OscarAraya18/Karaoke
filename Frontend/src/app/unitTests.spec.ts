import { unitTests } from "./unitTests.model";

fdescribe('Tests unitarios para el componente Player', () => {

    describe('Tests para el la función transformarLRC()',() => {
        it('Debe retornar un array de objetos JSON que contienen el tiempo y la letra de cada momento específico de la canción, a partir de un String en formato LRC.', () => {
            const test = new unitTests();
            const LRC = 
            `[00:10.59]Una Noche Más Y Copas De Más
[00:15.41]Tú No Me Dejas En Paz, De Mi Mente No Te Vas
[00:20.35]Aunque Sé Que No Debo, Ey`
            const LRCJSON = [
                {tiempo:"00:10.59",letra:"Una Noche Más Y Copas De Más"},
                {tiempo:"00:15.41",letra:"Tú No Me Dejas En Paz, De Mi Mente No Te Vas"},
                {tiempo:"00:20.35",letra:"Aunque Sé Que No Debo, Ey"}]

            test.transformarLRC(LRC);

            expect(test.letraCancion).toEqual(LRCJSON);
        })


        it('Debe retornar un array de objetos JSON de 3 elementos, que contienen el tiempo y la letra de cada momento específico de la canción, a partir de un String en formato LRC.', () => {
            const test = new unitTests();
            const LRC = 
            `[00:10.59]Una Noche Más Y Copas De Más
[00:15.41]Tú No Me Dejas En Paz, De Mi Mente No Te Vas
[00:20.35]Aunque Sé Que No Debo, Ey`
            const LRCJSON = [
                {tiempo:"00:10.59",letra:"Una Noche Más Y Copas De Más"},
                {tiempo:"00:15.41",letra:"Tú No Me Dejas En Paz, De Mi Mente No Te Vas"},
                {tiempo:"00:20.35",letra:"Aunque Sé Que No Debo, Ey"}]

            test.transformarLRC(LRC);

            expect(test.letraCancion).toHaveSize(3);
        })

        it('Debe retornar error, ya que el string no contiene un formato LRC válido.', () => {
            const test = new unitTests();
            const LRC = 
            `[00:10.59]Una Noche Más Y Copas De Más[00:15.41]Tú No Me Dejas En Paz, De Mi Mente No Te Vas[00:20.35]Aunque Sé Que No Debo, Ey`
            const LRCJSON = [
                {tiempo:"00:10.59",letra:"Una Noche Más Y Copas De Más"},
                {tiempo:"00:15.41",letra:"Tú No Me Dejas En Paz, De Mi Mente No Te Vas"},
                {tiempo:"00:20.35",letra:"Aunque Sé Que No Debo, Ey"}]

            test.transformarLRC(LRC);

            let error = false
            if(test.letraCancion!=LRCJSON){
                error = true;
            }
            
            expect(error).toEqual(true);
        })



        it('Debe retornar error, ya que el string no contiene un formato LRC válido (v2).', () => {
            const test = new unitTests();
            const LRC = 
            `Una Noche Más Y Copas De Más. Tú No Me Dejas En Paz, De Mi Mente No Te Vas. Aunque Sé Que No Debo, Ey`
            const LRCJSON = [
                {tiempo:"00:10.59",letra:"Una Noche Más Y Copas De Más"},
                {tiempo:"00:15.41",letra:"Tú No Me Dejas En Paz, De Mi Mente No Te Vas"},
                {tiempo:"00:20.35",letra:"Aunque Sé Que No Debo, Ey"}]

            test.transformarLRC(LRC);

            let error = false
            if(test.letraCancion!=LRCJSON){
                error = true;
            }
            
            expect(error).toEqual(true);
        })



        it('Debe retornar un array vacío, al no contener letra LRC en el string.', () => {
            const test = new unitTests();
            const LRC = ``
            let LRCJSON = [{tiempo:"",letra:""}];
            

            test.transformarLRC(LRC);

            expect(test.letraCancion).toEqual(LRCJSON);
        })
    })

    



})
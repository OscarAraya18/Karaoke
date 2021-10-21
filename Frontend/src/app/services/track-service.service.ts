import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TrackServiceService {

  constructor(private http: HttpClient) { }

  address = 'http://3.128.226.40:4000/';

  songIdToPlay: string = '';


  obtenerListaCanciones(){
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Access-Control-Allow-Origin':'*',
      })
    };
    const method = 'tracks/get/all';
    
    return this.http.get(this.address + method, httpOptions);
  }

  obtenerAudio(id: string){
    const method = 'tracks/';

    return this.http.get(this.address + method + id);
  }

  obtenerLetra(id: string){
    const method = 'tracks/letra/';
    
    return this.http.get(this.address + method + id);
  }

  filtrarCancion(letra: string, nombre: string, album: string, artista: string){
    const method = 'tracks/find/criterio?';
    
    const httpParams = new HttpParams()
    .set('letra', letra)
    .set('nombre', nombre)
    .set('album', album)
    .set('artista', artista);

    return this.http.get(this.address + method + httpParams);

  }

  agregarCancion(data: any){
    const method = 'tracks';
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Access-Control-Allow-Origin':'*',
      })
    };

    return this.http.post(this.address + method, data, httpOptions);
  }

  actualizarCancion(id: string, data: any){
    const method = 'tracks/';

    return this.http.put(this.address + method + id, data);
  }

  eliminarCancion(id: string){
    const method = 'tracks/';

    return this.http.delete(this.address + method + id);
  }

}

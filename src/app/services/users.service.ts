import { computed, inject, Injectable, signal } from '@angular/core';
import { User, UserResponse, UsersResponse } from '../interfaces/reqres';
import { HttpClient } from '@angular/common/http';
import { delay, map } from 'rxjs';

interface State{
  users: User[];
  loading: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private http = inject(HttpClient);

  //Con el # hacemos que sea privada tambien al pasar a js, a diferencia de private que solo es para ts
  #state = signal<State>({
    loading: true,
    users: []
  });

  public users = computed(() => this.#state().users);
  public loading = computed(() => this.#state().loading);

  constructor() {

    this.http.get<UsersResponse>('https://reqres.in/api/users')
      .pipe(delay(1500)) //Esto solo es para poder ver como carga, porque si no lo hace muy rapido
      .subscribe(res => {
        this.#state.set({
          loading: false,
          users: res.data
        })
      });
  }

  getUserById(id: string){

    return this.http.get<UserResponse>(`https://reqres.in/api/users/${id}`)
    .pipe(
      delay(1500), //Esto solo es para poder ver como carga, porque si no lo hace muy rapido
      map(resp => resp.data)
    );


  }


}

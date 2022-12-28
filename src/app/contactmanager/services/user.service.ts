import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../models/user';

@Injectable()
export class UserService {

  private _users: BehaviorSubject<User[]>;

  private dataStore: {
    users: User[]
  }

  constructor(private httpClient: HttpClient) {
    this.dataStore = { users: [] };
    this._users = new BehaviorSubject<User[]>([]);
  }

  get users(): Observable<User[]> {
    return this._users.asObservable();
  }

  userById(id: number): User|undefined {
    return this.dataStore.users.find(x=> x.id == id );
  }

  loadAll() {
    const userURL = "https://angular-material-api.azurewebsites.net/users";

    this.httpClient.get<User[]>(userURL).subscribe(data => {
      this.dataStore.users = data;
      this._users.next(Object.assign({}, this.dataStore).users);
    }, error => {
      console.log("Error Fetching Data");
    });
  }
}

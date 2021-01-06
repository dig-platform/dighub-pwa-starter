import { Injectable } from '@angular/core';
import {StateService} from '../modules/state';
import {AppUser} from '../interfaces/app-user';
import {AngularFireAuth} from '@angular/fire/auth';
import {AppState} from '../interfaces/app-state';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  private store = this.stateService.store('app', environment.defaultState);

  get state(): any {
    return this.store.current;
  }

  get state$(): Observable<AppState> {
    return this.store.current$;
  }

  constructor(private stateService: StateService) {
  }

  setTitle(title: string) {
    this.store.update({title});
  }

  getTitle(): Observable<string> {
    return this.state$.pipe(map((state: any) => state.title));
  }

  setUser(user: AppUser) {
    this.store.update({user});
  }

  getUser(): Observable<AppUser> {
    return this.state$.pipe(map((state: any) => state.user));
  }
}

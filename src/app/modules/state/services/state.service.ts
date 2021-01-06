import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private stores: StateContainer[] = [];

  constructor() {}

  store(key, defaultState = {}) {
    let store = this.stores.find((s: any) => s.key === key);
    if (! store) {
      store = new StateContainer(key);
      store.set(defaultState);
      this.stores.push(store);
    }
    return store;
  }
}


export class StateContainer {
  private readonly store = new BehaviorSubject<any>(null);

  get current(): any {
    return this.store.getValue();
  }

  readonly current$: Observable<any> = this.store.asObservable();

  update(data: any) {
    // todo make support arrays
    const state = Object.assign({}, this.current, data);
    this.store.next(state);
  }

  set(data: any) {
    // todo make support arrays
    const state = Object.assign({}, data);
    this.store.next(state);
  }

  unset() {
    this.store.next(null);
  }

  constructor(private key: string) {
  }

  match(key: string) {
    return this.key === key;
  }
}

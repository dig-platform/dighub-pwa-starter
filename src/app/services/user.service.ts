import {Injectable} from '@angular/core';
import {ActionSheetController} from '@ionic/angular';
import {AngularFireAuth} from '@angular/fire/auth';
import {Subject} from 'rxjs';
import firebase from 'firebase';
import {AppStateService} from './app-state.service';
import {AppUser} from '../interfaces/app-user';

export interface UserMenuOptions {
    title?: string;
    subtitle?: string;
    buttons?: any[];
}

export interface UsersSignInOptions {
    redirect?: any[];
    title: string;
    message?: string;
    provider?: string;
    scope?: string; // provider scope
}

@Injectable({
    providedIn: 'root'
})
export class UserService {
    public readonly current$ = this.appState.getUser();

    constructor(
        public actionSheetController: ActionSheetController,
        private auth: AngularFireAuth,
        private appState: AppStateService
    ) {
        this.auth.authState.subscribe(a => this.appState.setUser(this.factory(a)));
    }

    async menu(options: UserMenuOptions = {}) {
        const buttons = [];
        const current = !! this.appState.state.user;
        if (current) {
            buttons.push({
                text: 'Sign out',
                handler: () => {
                    this.signOut();
                }
            });
        } else {
            buttons.push({
                text: 'Sign in with Google',
                icon: 'logo-google',
                handler: () => {
                    this.googleSignIn({});
                }
            });
        }
        buttons.push({
            text: 'Cancel',
            icon: 'close',
            role: 'cancel',
            handler: () => {
                console.log('Cancel clicked');
            }
        });
        const actionSheet = await this.actionSheetController.create({
            header: options.title,
            subHeader: options.subtitle,
            cssClass: 'user-menu',
            buttons
        });
        await actionSheet.present();
    }

    signOut() {
        return this.auth.signOut();
    }

    private googleSignIn(options: any) {
        options.provider = 'google';
        const response = new Subject();
        const provider = new firebase.auth.GoogleAuthProvider();
        // todo support scope
        // todo add state
        if (options.scope) {
            // 'repo read:org'
            provider.addScope(options.scope);
        }
        this.auth
            .signInWithPopup(provider)
            .then(res => {
                response.next(this.factory(res.user));
            });
        return response;
    }

    factory(data: any): AppUser {
        if (! data) {
            return null;
        }
        return {
            uid: data.uid,
            displayName: data.displayName,
            email: data.providerData[0].email,
            photoURL: data.photoURL,
            phone: data.phone
        };
    }
}

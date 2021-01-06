import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {AppStateService} from './services/app-state.service';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {UserService} from './services/user.service';

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        AngularFireModule.initializeApp(environment.firebase),
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule],
    providers: [
        AppStateService,
        StatusBar,
        SplashScreen,
        UserService,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

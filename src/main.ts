import {bootstrap} from '@angular/platform-browser-dynamic'
import {App} from './app/app';
import {HTTP_PROVIDERS} from "@angular/http";
import {appRouterProviders} from "./app/app.routes";

//noinspection TypeScriptValidateTypes
bootstrap(App, [
    ...HTTP_PROVIDERS,
    appRouterProviders
]).catch(err => console.error(err));

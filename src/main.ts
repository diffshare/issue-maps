import {bootstrap} from '@angular/platform-browser-dynamic'
import {App} from './app/app';
import {HTTP_PROVIDERS} from "@angular/http";
import {appRouterProviders} from "./app/app.routes";
import {LocationStrategy, HashLocationStrategy} from "@angular/common";
import {provide} from "@angular/core";

//noinspection TypeScriptValidateTypes
bootstrap(App, [
    ...HTTP_PROVIDERS,
    appRouterProviders,
    provide(LocationStrategy, {useClass: HashLocationStrategy})
]).catch(err => console.error(err));

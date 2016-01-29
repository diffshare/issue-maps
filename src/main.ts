import 'es6-shim';
import 'es6-promise';
import 'zone.js/lib/browser/zone-microtask';
import 'reflect-metadata'

import {bootstrap} from 'angular2/platform/browser'
import {App} from './app/app';
import {HTTP_PROVIDERS} from "angular2/http";
import {ROUTER_PROVIDERS} from "angular2/router";
import {provide} from "angular2/core";
import {LocationStrategy} from "angular2/router";
import {HashLocationStrategy} from "angular2/router";

bootstrap(App, [
    ...HTTP_PROVIDERS,
    ...ROUTER_PROVIDERS,
    provide(LocationStrategy, {useClass: HashLocationStrategy})
]).catch(err => console.error(err));

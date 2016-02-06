import {Component} from 'angular2/core';
import {RouteConfig} from "angular2/router";
import {ROUTER_DIRECTIVES} from "angular2/router";
import {ROUTER_PROVIDERS} from "angular2/router";
import {Home} from "./components/home";

require('./app.sass');

@Component({
    selector: 'app',
    directives: [...ROUTER_DIRECTIVES],
    template: require('./app.slim')
})
@RouteConfig([
    {path: '/', component: Home, name: "Home"},
])
export class App {
    constructor() {}
}

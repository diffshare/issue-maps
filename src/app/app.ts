import {Component} from 'angular2/core';
import {RouteConfig} from "angular2/router";
import {ROUTER_DIRECTIVES} from "angular2/router";
import {ROUTER_PROVIDERS} from "angular2/router";
import {Home} from "./components/home";
import {Page1} from "./components/page1";

@Component({
    selector: 'app',
    directives: [...ROUTER_DIRECTIVES],
    template: require('./app.slim')
})
@RouteConfig([
    {path: '/', component: Home, name: "Home"},
    {path: '/page1', component: Page1, name: "Page1"}
])
export class App {
    constructor() {

    }
}

import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';

require('./app.sass');

@Component({
    selector: 'app',
    template: require('./app.slim'),
    directives: [ROUTER_DIRECTIVES]
})
export class App {
    constructor() {
    }
}

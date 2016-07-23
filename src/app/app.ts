import {Component} from '@angular/core';

require('./app.sass');

@Component({
    selector: 'app',
    template: require('./app.slim')
})
export class App {
    constructor() {

    }
}

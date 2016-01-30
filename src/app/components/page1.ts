import {Component} from "angular2/core";
import {Title} from "angular2/src/platform/browser/title";
import {BROWSER_PROVIDERS} from "angular2/src/platform/browser_common";

@Component({
    providers: [Title],
    template: require("./page1.slim")
})
export class Page1 {

    constructor(private title:Title) {
        title.setTitle("Page1");
    }

}

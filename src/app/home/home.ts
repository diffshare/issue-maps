import {Component} from '@angular/core';
import {RedmineService} from "../services/redmine.service";
import {IssueFilterPipe} from "../pipes/issue.filter.pipe";

require("./home.sass");

@Component({
    template: require("./home.slim"),
    providers: [RedmineService],
    pipes: [IssueFilterPipe]
})
export class Home {
    private issues;

    constructor(private redmine:RedmineService) {
    }

    ngOnInit() {
        this.redmine.fetch().subscribe((json:any) => {
            this.issues = json.issues;
        });
    }
}

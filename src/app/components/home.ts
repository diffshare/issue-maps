import {Component} from "angular2/core";
import {ListService} from "../services/list_service";

@Component({
    providers: [ListService],
    template: require("./home.slim")
})
export class Home {

    list: Array<any>;

    constructor(private listService:ListService) {}

    ngOnInit() {
        this.listService.fetch()
            .subscribe((result:any) => {
                this.list = result;
            });
    }
}
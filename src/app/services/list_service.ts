import {Injectable} from "angular2/core";
import {Http} from "angular2/http";
import {Response} from "angular2/http";
import "rxjs/add/operator/map"

@Injectable()
export class ListService {

    constructor(private http: Http) {}

    fetch() {
        let url:string = "https://spreadsheets.google.com/feeds/cells/1UX5JseKusqnzfCTrK5LKRi607m2Ezh-WupcwysWogyk/od6/public/values?alt=json";
        return this.http.get(url).map((res: Response) => this.format(res.json()));
    }

    private format(input:any):Array<any> {
        var key = {};
        var output = [];
        input.feed.entry.forEach((entry:any)=> {
            let cell:any = entry.gs$cell;
            if (cell.row == "1") {
                key[cell.col] = cell.$t;
            }
            else {
                let index = parseInt(cell.row) - 2;
                if (!output[index]) output[index] = {};
                output[index][key[cell.col]] = cell.$t;
            }
        });
        return output;
    }
}
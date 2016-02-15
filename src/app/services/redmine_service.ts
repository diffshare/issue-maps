import {Injectable} from "angular2/core";
import {Http} from "angular2/http";
import {Response} from "angular2/http";
import "rxjs/add/operator/map";
import {Headers} from "angular2/http";

@Injectable()
export class RedmineService {

    private static xRedmineApiKey : string;

    constructor(private http:Http) {
    }

    static getAPIKey() {
        if (!localStorage.getItem("X-Redmine-API-Key")) {
            var key = prompt("Redmineのkeyを入力");
            localStorage.setItem("X-Redmine-API-Key", key);
        }

        return localStorage.getItem("X-Redmine-API-Key");
    }

    static clearAPIKey():void {
        localStorage.clear();
    }

    fetch() {
        var authHeader = new Headers();
        authHeader.append("X-Redmine-API-Key", RedmineService.getAPIKey());
        var url = process.env.REDMINE_ISSUE_URL + "?status_id=*&limit=100";
        return this.http.get(url, {headers: authHeader}).map((res:Response) => this.format(res.json()));
    }

    format(response:any) {
        console.log(response);
        response.issues.forEach((issue:any)=> {
            issue.custom_fields.forEach((field:any)=> {
                if (field.name == "場所") {
                    issue.lat = parseFloat(field.value.split(",")[0]);
                    issue.lng = parseFloat(field.value.split(",")[1]);
                }

            });
        });
        return response;
    }
}

import {Injectable} from "angular2/core";
import {Http} from "angular2/http";
import {Response} from "angular2/http";
import "rxjs/add/operator/map";
import {Headers} from "angular2/http";

@Injectable()
export class RedmineService {

    constructor(private http:Http) {
    }

    fetch() {
        var authHeader = new Headers();
        authHeader.append("X-Redmine-API-Key", process.env.REDMINE_API_KEY);
        var url = process.env.REDMINE_ISSUE_URL;
        return this.http.get(url, {headers: authHeader}).map((res:Response) => this.format(res.json()));
    }

    format(response:any) {
        response.issues.forEach((issue:any)=> {
            issue.custom_fields.forEach((field:any)=> {
                if (field.name == "場所") {
                    issue.lat = field.value.split(",")[0];
                    issue.lng = field.value.split(",")[1];
                }

            });
        });
        return response;
    }
}

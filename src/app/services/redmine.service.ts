import {Injectable} from '@angular/core';
import {Http, Headers, Response} from "@angular/http";

@Injectable()

@Injectable()
export class RedmineService {
    constructor(private http:Http) {
    }

    static getAPIKey() {
        if (!localStorage.getItem("X-Redmine-API-Key")) {
            var key = prompt("RedmineのAPIキーを入力");
            localStorage.setItem("X-Redmine-API-Key", key);
        }

        return localStorage.getItem("X-Redmine-API-Key");
    }

    fetch() {
        let headers = new Headers();
        headers.append("X-Redmine-API-Key", RedmineService.getAPIKey());
        const url = process.env.REDMINE_ISSUE_URL + "?status_id=*&limit=100";
        return this.http.get(url, {headers: headers}).map((response:Response) => {
            let json = response.json();
            json.issues.forEach((issue) => {
                issue.custom_fields.forEach((field) => {
                    if (field.name == "参加者")
                        issue.participants = field.value;
                    else if (field.name == "実施日")
                        issue.do_date = field.value;
                });
                delete issue.custom_fields;
            });
            return json;
        });
    }
}

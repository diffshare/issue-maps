import ENDPOINT from "../Setting";

export default class IssueService {

    constructor(private $http:ng.IHttpService, private $window:ng.IWindowService, private $rootScope:ng.IRootScopeService) {
    }

    fetchIssues():ng.IPromise<any> {
        if (ENDPOINT.endpoint_type == "redmine")
            return this.fetchRedmineIssues();

        let url = "/assets/issues.json";
        return this.$http.get(url).then(IssueService.onResult);
    }

    checkLoggedIn() {
        if (this.getRedmineAccessKey() == null) throw new Error("auth error");
    }

    isLoggedIn():boolean {
        if (ENDPOINT.endpoint_type == "redmine")
            return this.isRedmineLoggedIn();

        return true;
    }

    isRedmineLoggedIn():boolean {
        // 鍵があればログインしているということにする
        return this.getRedmineAccessKey() != null;
    }

    inputRedmineKey() {
        // ここでGUIに関わるコードは良くない
        let key = this.$window.prompt("Redmine Access Keyを入力してください");
        if (key && key.length > 0)
            this.$window.localStorage.setItem("redmine-access-key", key);
        else
            this.$window.localStorage.removeItem("redmine-access-key");
    }

    setRedmineAccessKey(accessKey:string):void {
        this.$window.localStorage.setItem("redmine-access-key", accessKey);
    }

    getRedmineAccessKey():string {
        return this.$window.localStorage.getItem("redmine-access-key");
    }

    prepareAccessKey() {
        this.$http.defaults.headers.common["X-Redmine-API-Key"] = this.getRedmineAccessKey();
    }

    fetchRedmineIssues():ng.IPromise<any> {
        //if (!this.isRedmineLoggedIn()) this.inputRedmineKey();
        this.checkLoggedIn();
        this.prepareAccessKey();
        let url = ENDPOINT.issues_url;
        //return this.$http.jsonp(url).then(IssueService.onResult);
        return this.$http.get(url).then(IssueService.onResult);
    }

    static onResult(result:any) {
        return IssueService.formatIssues(result.data.issues);
    }

    fetchRedmineIssue(id:number):ng.IPromise<any> {
        this.prepareAccessKey();
        let url = ENDPOINT.issue_url
            .replace(":id", id.toString());
        return this.$http.get(url).then((result:any)=> {
            return result.data.issue;
        });
    }

    updateRedmineIssue(id:number, issue:any):ng.IPromise<any> {
        this.prepareAccessKey();
        let url = ENDPOINT.issue_url
            .replace(":id", id.toString());
        return this.$http.put(url, {issue: issue}).then((result:any)=> {
            console.log(result);
        });
    }

    // 整形は利用するエンドポイントごとに異なるので、APIに押し込む
    static formatIssues(issues:Array<any>) {
        return issues.map(IssueService.formatIssue);
    }

    static formatIssue(issue:any):Object {
        for (var c of issue.custom_fields) {
            if (c.name == "場所")
                [issue.latitude, issue.longitude] = c.value.split(",");
        }
        return {
            id: issue.id,
            latitude: issue.latitude,
            longitude: issue.longitude,
            title: issue.subject,
            description: issue.description,
            author: issue.author.name,
            start_date: issue.start_date,
            created_on: issue.created_on,
            category: issue.category && issue.category.name
        };
    }
}
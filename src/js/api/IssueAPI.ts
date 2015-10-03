export default class IssueAPI {

    constructor(public $http:ng.IHttpService) {

    }

    fetchIssues():ng.IPromise<any> {
        let url = "/assets/issues.json";
        return this.$http.get(url);
    }
}
export default class IssueAPI {

    constructor(public $http:ng.IHttpService) {

    }

    fetchIssues():ng.IPromise<any> {
        let url = "/assets/issues.json";
        return this.$http.get(url)
            .then((result:any)=> {
                // 整形は利用するエンドポイントごとに異なるので、APIに押し込む
                return result.data.issues.map((issue:any) => {
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
                        //author: issue.author.name
                    };
                });
            });
    }
}
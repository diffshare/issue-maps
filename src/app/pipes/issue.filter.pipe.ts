import {Pipe, PipeTransform} from "@angular/core";
@Pipe({name: "issueFilter"})
export class IssueFilterPipe implements PipeTransform {
    transform(value, args) {
        if (!args) {
            return value;
        } else if (value) {
            return value.filter(item => {
                return this.filter(item, args);
            });
        }
    }

    filter(item, args):boolean {
        for (let key in item) {
            let target = item[key];
            let result = false;
            if (typeof target === "object")
                result = this.filter(target, args);
            else if (typeof target === "Array")
                result = this.filter(target, args);
            else if ((target.toString().indexOf(args) !== -1)) {
                return true;
            }

            if (result) return true;
        }
        return false;
    }
}

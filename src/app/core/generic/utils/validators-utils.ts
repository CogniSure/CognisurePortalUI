import { ValidationErrors } from "@angular/forms";

export const ValidatorErrorMessage = (validatorName: string, validatorErrors?: ValidationErrors): string|undefined => {
    let args = messages.get(validatorName)?.validatorErrorsKey?.map(name => validatorErrors?.[name]);
    return (args) ? stringFormat(validatorName,messages.get(validatorName)?.message,...args) : messages.get(validatorName)?.message;
}

const  messages = new Map<string, {message : string,validatorErrorsKey? : string[]}>([
    ['required',  { message : 'This field is required'} ],
    ['minlength', { message : 'Field must be at least {0} characters long' ,   validatorErrorsKey :['requiredLength']}],
    ['maxlength', { message : 'Field cannot be more than {0} characters long', validatorErrorsKey :['requiredLength']}],
    ['email', { message : 'Email must be a valid email address'}],
    ['pattern', { message : 'Invalid format'}],
    ['matching', { message : 'Value does not Match'}],
]);

function stringFormat(validatorName:string,template: string|undefined, ...args: any[]) {
    if(template){
        return template.replace(/{(\d+)}/g, (match, index) => {
        return typeof args[index] !== 'undefined'
            ? args[index]
            : match;
        });
    }
    return undefined;
 }
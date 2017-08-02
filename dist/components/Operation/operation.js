'use strict';
import { Input, HostBinding, ChangeDetectorRef, Component, ViewChild, ChangeDetectionStrategy, } from '@angular/core';
import JsonPointer from '../../utils/JsonPointer';
import { BaseComponent, SpecManager } from '../base';
import { SchemaHelper } from '../../services/schema-helper.service';
import { OptionsService, MenuService, AppStateService } from '../../services/';
import { ParamsList } from '../ParamsList/params-list';
import Swagger from 'swagger-client';
import { statusCodeType } from '../../utils/helpers';
var TryWithResponse = (function () {
    function TryWithResponse(response, spec) {
        this.statusCode = response.status;
        this.body = response.body;
        this.headers = response.headers;
        this.text = response.text;
        var respInfo = spec.responses[this.statusCode] || spec.responses['default'];
        var respDescription = respInfo && respInfo.description || response.statusText || response.message;
        this.status = this.statusCode + " " + respDescription;
        this.type = statusCodeType(this.statusCode);
        this.headers = Object.keys(response.headers || {}).map(function (name) {
            return {
                name: name,
                value: response.headers[name]
            };
        });
    }
    return TryWithResponse;
}());
export { TryWithResponse };
var Operation = (function (_super) {
    __extends(Operation, _super);
    function Operation(specMgr, appState, optionsService, cdr, menu) {
        var _this = _super.call(this, specMgr) || this;
        _this.appState = appState;
        _this.optionsService = optionsService;
        _this.cdr = cdr;
        _this.menu = menu;
        _this.editMode = false;
        _this.tryWithInProgress = false;
        _this.tryWithResponseError = null;
        _this.pathInMiddlePanel = optionsService.options.pathInMiddlePanel;
        return _this;
    }
    Operation.prototype.toggleEditMode = function () {
        this.editMode = !this.editMode;
        this.tryWithResponse = null;
    };
    Operation.prototype.clear = function () {
        this.tryWithResponse = null;
        this.tryWithInProgress = false;
    };
    Operation.prototype.execute = function () {
        var _this = this;
        if (!this.appState.securities.value) {
            this.openAuthModal();
            return;
        }
        var paramsMap = this.paramsList.model;
        var params = Object.assign.apply(Object, [{}].concat(Object.keys(paramsMap).map(function (key) { return paramsMap[key]; })));
        for (var _i = 0, _a = Object.keys(params); _i < _a.length; _i++) {
            var k = _a[_i];
            if (params[k] === null || params[k] === '')
                delete params[k];
        }
        var opts = {
            spec: this.specMgr.specWithServer(this.activeServerUrl),
            pathName: this.operation.path,
            method: this.operation.verb,
            parameters: params,
            responseContentType: params['accept'] ? null : 'application/json',
            requestContentType: (params['content-type'] || params['Content-Type'] || paramsMap.formData)
                ? null : 'application/json',
            securities: { authorized: this.appState.securities.value } || {}
        };
        this.tryWithResponse = null;
        this.tryWithResponseError = null;
        if (!this.paramsList.tryWithForm.valid) {
            this.paramsList.tryWithForm.form.setValue(this.paramsList.tryWithForm.form.value);
            for (var i in this.paramsList.tryWithForm.form.controls) {
                this.paramsList.tryWithForm.form.controls[i].markAsTouched();
            }
            return;
        }
        this.tryWithInProgress = true;
        var httpWrap = function (request) {
            if (request.headers['Authorization'] && request.headers['authorization']) {
                request.headers['Authorization'] = request.headers['authorization'];
                delete request.headers['authorization'];
            }
            return Swagger.http(request);
        };
        Swagger.execute(__assign({}, opts, { http: httpWrap })).then(function (response) {
            _this.tryWithInProgress = false;
            _this.tryWithResponse = new TryWithResponse(response, _this.componentSchema);
            _this.cdr.markForCheck();
        }).catch(function (err) {
            _this.tryWithInProgress = false;
            if (err.response) {
                _this.tryWithResponse = new TryWithResponse(err.response, _this.componentSchema);
            }
            else {
                _this.tryWithResponseError = "Failed to make a request: " + err.message;
            }
            _this.cdr.markForCheck();
        });
    };
    Operation.prototype.openAuthModal = function () {
        this.appState.openAuthModal(true);
    };
    Operation.prototype.init = function () {
        this.operationId = this.componentSchema.operationId;
        this.operation = {
            verb: JsonPointer.baseName(this.pointer),
            path: JsonPointer.baseName(this.pointer, 2),
            info: {
                description: this.componentSchema.description,
                tags: this.filterMainTags(this.componentSchema.tags)
            },
            bodyParam: this.findBodyParam(),
            summary: SchemaHelper.operationSummary(this.componentSchema),
            anchor: this.buildAnchor(),
            externalDocs: this.componentSchema.externalDocs
        };
        this.servers = this.specMgr.getServers(false);
        this.activeServerUrl = this.servers[0].url;
    };
    Operation.prototype.buildAnchor = function () {
        return this.menu.hashFor(this.pointer, { type: 'operation', operationId: this.operationId, pointer: this.pointer }, this.parentTagId);
    };
    Operation.prototype.filterMainTags = function (tags) {
        var tagsMap = this.specMgr.getTagsMap();
        if (!tags)
            return [];
        return tags.filter(function (tag) { return tagsMap[tag] && tagsMap[tag]['x-traitTag']; });
    };
    Operation.prototype.findBodyParam = function () {
        var params = this.specMgr.getOperationParams(this.pointer);
        var bodyParam = params.find(function (param) { return param.in === 'body'; });
        return bodyParam;
    };
    Operation.prototype.ngOnInit = function () {
        this.preinit();
    };
    return Operation;
}(BaseComponent));
export { Operation };
Operation.decorators = [
    { type: Component, args: [{
                selector: 'operation',
                template: '<div class="operation" *ngIf="operation"><div class="operation-content"><h2 class="operation-header sharable-header"><a class="share-link" href="#{{operation.anchor}}"></a>{{operation.summary}}</h2><endpoint-link *ngIf="pathInMiddlePanel" [verb]="operation.verb" [path]="operation.path"></endpoint-link><div class="try-with-controls"><a class="open-auth" [ngClass]="{\'authorized\': (appState.securities | async)}" (click)="openAuthModal()"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve"><path d="M384,224v-96C384,57.438,326.594,0,256,0c-70.578,0-128,57.438-128,128v96c-35.344,0-64,28.656-64,64v160c0,35.344,28.656,64,64,64h256c35.344,0,64-28.656,64-64V288C448,252.656,419.344,224,384,224z M272,379.094V432c0,8.844-7.156,16-16,16s-16-7.156-16-16v-52.906c-9.391-5.563-16-15.375-16-27.094c0-17.688,14.328-32,32-32s32,14.313,32,32C288,363.719,281.391,373.531,272,379.094z M320,224H192v-96c0-35.313,28.703-64,64-64c35.281,0,64,28.688,64,64V224z"/></svg></a><div class="toggle-edit-button"><input (change)="toggleEditMode()" type="checkbox" id="{{operation.path}}{{operation.verb}}" class="ios-toggle"><label for="{{operation.path}}{{operation.verb}}" class="checkbox-label" data-off="Try it out!" data-on=""></label></div></div><div class="operation-tags" *ngIf="operation.info.tags.length"><a *ngFor="let tag of operation.info.tags" attr.href="#tag/{{tag}}">{{tag}}</a></div><p *ngIf="operation.info.description" class="operation-description" [innerHtml]="operation.info.description | marked"></p><redoc-externalDocs [docs]="operation.externalDocs"></redoc-externalDocs><params-list pointer="{{pointer}}/parameters" [editMode]="editMode"></params-list><div class="edit-mode-response" [ngClass]="{\'executed\': !!tryWithResponse}" *ngIf="editMode"><div class="buttons"><button class="clear" (click)="clear()">Clear</button><div class="group"><drop-down [(active)]="activeServerUrl"><option [value]="server.url" *ngFor="let server of servers">{{server.description}}</option></drop-down><button class="execute" (click)="execute()">Execute</button></div></div><div class="loading" [hidden]="!tryWithInProgress">Loading...</div><div class="response-error" [hidden]="!tryWithResponseError">{{tryWithResponseError}}</div><div *ngIf="tryWithResponse" class="response-details" [ngClass]="tryWithResponse.type"><h2>Response from Server</h2><h3>Status:</h3><div class="response-status">{{tryWithResponse.status}}</div><ng-template [ngIf]="tryWithResponse.headers.length"><h3>Response Headers:</h3><ul class="response-headers"><li *ngFor="let header of tryWithResponse.headers"><strong>{{header.name}}</strong>: {{header.value}}</li></ul></ng-template><h3>Payload:</h3><pre [ngClass]="{empty: !tryWithResponse.body}" [innerHtml]="tryWithResponse.body | json | prism:\'javascript\'"></pre></div></div><responses-list pointer="{{pointer}}/responses"></responses-list></div><div class="operation-samples"><endpoint-link #servers *ngIf="!pathInMiddlePanel" [verb]="operation.verb" [path]="operation.path"></endpoint-link><div><request-samples [pointer]="pointer" [schemaPointer]="operation.bodyParam?._pointer"></request-samples></div><div><br><responses-samples pointer="{{pointer}}/responses"></responses-samples></div></div></div>',
                styles: ['.open-auth,[select-on-click]{cursor:pointer}:host{padding-bottom:100px;display:block;border-bottom:1px solid rgba(127,127,127,.25);margin-top:1em;transform:translateZ(0);z-index:2}.operation-header{margin-bottom:calc(1em - 6px)}.operation-tags{margin-top:20px}.operation-tags>a{font-size:16px;color:#999;display:inline-block;padding:0 .5em;text-decoration:none}.operation-tags>a:before{content:\'#\';margin-right:-.4em}.operation-tags>a:first-of-type{padding:0}.operation-content,.operation-samples{display:block;box-sizing:border-box;float:left}.operation-content{width:60%;padding:40px}.operation-samples{color:#e3ebf0;width:40%;padding:40px;background:#151f26}.operation-samples pre{color:#e3ebf0}.operation-samples header,.operation-samples>h5{color:#81a2b9;text-transform:uppercase}.operation-samples>h5{margin-bottom:8px}.operation-samples schema-sample{display:block}.operation:after{content:"";display:table;clear:both}.operation-description{padding:6px 0 10px;margin:0}@media (max-width:1100px){.operations:before{display:none}.operation-content,.operation-samples{width:100%}.operation-samples{margin-top:2em}:host{padding-bottom:0}}.operation-content /deep/ endpoint-link{margin-bottom:16px}.operation-content /deep/ endpoint-link .operation-endpoint[class]{padding:5px 30px 5px 5px;border:0;border-bottom:1px solid #ccc;border-radius:0;background-color:transparent}.operation-content /deep/ endpoint-link .operation-api-url-path{color:#151f26}.operation-content /deep/ endpoint-link .expand-icon{top:8px;background-color:#ccc}.operation-content /deep/ endpoint-link .servers-overlay{border:1px solid #ccc;border-top:0}.edit-mode-response .buttons{display:flex;margin-top:1em;justify-content:flex-end}.edit-mode-response button{border:0;padding:5px 15px;text-align:center;font-size:13px;height:36px;font-weight:700;background-color:#fefefe;transition:all .25s ease-in-out;cursor:pointer;outline:0;box-shadow:0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12),0 3px 1px -2px rgba(0,0,0,.2)}.edit-mode-response button:hover{background-color:#fff;box-shadow:0 3px 3px 0 rgba(0,0,0,.14),0 1px 7px 0 rgba(0,0,0,.12),0 3px 1px -1px rgba(0,0,0,.2)}.edit-mode-response .clear{display:none}.edit-mode-response.executed .buttons{justify-content:space-between}.edit-mode-response.executed .clear{display:block}.edit-mode-response drop-down{display:inline-block;vertical-align:bottom;height:37px}.edit-mode-response /deep/ .dk-select{min-width:150px}.edit-mode-response /deep/ .dk-option,.edit-mode-response /deep/ .dk-selected{line-height:30px;padding:2px 1.5em 2px .5em}.edit-mode-response /deep/ .dk-selected{border-radius:0;border-right:none}.edit-mode-response button.execute{background-color:#203f80;color:#fff}.edit-mode-response button.execute:hover{background-color:#2a53a9}.edit-mode-response .loading,.edit-mode-response .response-error{text-align:center;padding:10px;font-size:14px}.edit-mode-response .response-error{color:#e53935}.edit-mode-response pre{background:#222d32;word-wrap:break-word;word-break:break-all;white-space:pre-wrap;padding:20px;border-radius:4px;margin-bottom:10px;max-height:250px;overflow:auto;font-family:monospace;color:#fff;border:none}.edit-mode-response h3{font-size:14px;font-weight:700;color:#fff}.response-details{margin-top:20px;padding:10px 20px;background:#151f26;box-shadow:0 0 2px 0 rgba(21,31,38,.2);border-radius:4px}.response-details>h2{margin:-10px -20px 13px;padding:10px 20px;font-size:15px;color:#fff;background:#000;font-weight:700;border-radius:4px 4px 0 0}.response-details .response-status{margin-bottom:20px;font-size:15px;padding-left:1em}.response-details.info .response-status,.response-details.success .response-status{color:#00dd19}.response-details.error .response-status{color:#eb6562}.response-details.redirect .response-status{color:#ffd625}.response-details pre.empty:before{content:"Empty response";font-style:italic}.response-details .response-headers{color:#fff;list-style:none;padding:5px 5px 5px 1em;margin:1em 0;font-size:.85em;font-family:monospace;background:#222d32}.toggle-edit-button{width:60px;display:inline-block}.open-auth{display:inline-block;box-sizing:border-box;vertical-align:top;padding:3px 10px}.open-auth path{fill:#bbb}.open-auth:hover path{fill:#666}.open-auth.authorized path{fill:#00aa13}.open-auth.authorized:hover path{fill:#00c416}.checkbox-label,.checkbox-label:after,.checkbox-label:before{box-sizing:border-box;margin:0;padding:0;-webkit-transition:.25s ease-in-out;-moz-transition:.25s ease-in-out;-o-transition:.25s ease-in-out;transition:.25s ease-in-out;outline:0}.ios-toggle,.ios-toggle:active{position:absolute;height:0;width:0;opacity:0;border:none;outline:0}.checkbox-label{display:block;position:relative;padding:10px;margin-bottom:20px;font-size:12px;line-height:16px;width:100%;height:26px;-webkit-border-radius:18px;-moz-border-radius:18px;border-radius:18px;background:#f8f8f8;cursor:pointer}.checkbox-label:after,.checkbox-label:before{display:block;position:absolute;top:0;width:26px}.checkbox-label:before{content:\'\';z-index:1;line-height:34px;text-indent:40px;height:26px;-webkit-border-radius:100%;-moz-border-radius:100%;border-radius:100%;left:0;right:auto;background:#fff;-webkit-box-shadow:0 3px 3px rgba(0,0,0,.2),0 0 0 2px #ddd;-moz-box-shadow:0 3px 3px rgba(0,0,0,.2),0 0 0 2px #ddd;box-shadow:0 3px 3px rgba(0,0,0,.2),0 0 0 2px #ddd}.checkbox-label:after{content:attr(data-off);z-index:0;left:60px;font-size:14px;padding:5px 10px;height:100%;text-align:right;color:#bfbfbf;white-space:nowrap}.ios-toggle:checked+.checkbox-label:before{left:calc(100% - 26px);-webkit-box-shadow:0 0 0 2px transparent,0 3px 3px rgba(0,0,0,.3);-moz-box-shadow:0 0 0 2px transparent,0 3px 3px rgba(0,0,0,.3);box-shadow:0 0 0 2px transparent,0 3px 3px rgba(0,0,0,.3)}.ios-toggle:checked+.checkbox-label:after{color:#13bf11}.ios-toggle:checked+.checkbox-label{-webkit-box-shadow:inset 0 0 0 18px #13bf11,0 0 0 2px #13bf11;-moz-box-shadow:inset 0 0 0 18px #13bf11,0 0 0 2px #13bf11;box-shadow:inset 0 0 0 18px #13bf11,0 0 0 2px #13bf11}.ios-toggle+.checkbox-label{-webkit-box-shadow:inset 0 0 0 0 #13bf11,0 0 0 2px #ddd;-moz-box-shadow:inset 0 0 0 0 #13bf11,0 0 0 2px #ddd;box-shadow:inset 0 0 0 0 #13bf11,0 0 0 2px #ddd}'],
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
Operation.ctorParameters = function () { return [
    { type: SpecManager, },
    { type: AppStateService, },
    { type: OptionsService, },
    { type: ChangeDetectorRef, },
    { type: MenuService, },
]; };
Operation.propDecorators = {
    'pointer': [{ type: Input },],
    'parentTagId': [{ type: Input },],
    'operationId': [{ type: HostBinding, args: ['attr.operation-id',] },],
    'paramsList': [{ type: ViewChild, args: [ParamsList,] },],
};
//# sourceMappingURL=operation.js.map
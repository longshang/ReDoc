'use strict';
import { Component, ChangeDetectionStrategy, ElementRef } from '@angular/core';
import { SpecManager, BaseComponent } from '../base';
import { OptionsService, Marker } from '../../services/index';
var ApiInfo = (function (_super) {
    __extends(ApiInfo, _super);
    function ApiInfo(specMgr, optionsService, elRef, marker) {
        var _this = _super.call(this, specMgr) || this;
        _this.optionsService = optionsService;
        _this.info = {};
        marker.addElement(elRef.nativeElement);
        return _this;
    }
    ApiInfo.prototype.init = function () {
        this.info = this.componentSchema.info;
        this.specUrl = this.specMgr.specUrl;
        if (!isNaN(parseInt(this.info.version.toString().substring(0, 1)))) {
            this.info.version = 'v' + this.info.version;
        }
    };
    ApiInfo.prototype.ngOnInit = function () {
        this.preinit();
    };
    return ApiInfo;
}(BaseComponent));
export { ApiInfo };
ApiInfo.decorators = [
    { type: Component, args: [{
                selector: 'api-info',
                styles: [':host>.api-info-wrapper{box-sizing:border-box;padding:40px;width:60%}@media (max-width:1100px){:host>.api-info-wrapper{width:100%}}.openapi-button{border:1px solid #0033a0;color:#0033a0;font-weight:400;margin-left:.5em;padding:3px 8px 4px}:host /deep/ [section]{padding-top:80px}'],
                template: '<div class="api-info-wrapper"><h1>{{info.title}} <span class="api-info-version">({{info.version}})</span></h1><p class="download-openapi" *ngIf="specUrl">Download OpenAPI (fka Swagger) specification: <a class="openapi-button" download target="_blank" attr.href="{{specUrl}}">Download</a></p><p><span *ngIf="info?.contact?.url || info?.contact?.email">Contact: <a *ngIf="info.contact.url" href="{{info.contact.url}}">{{info.contact.name || info.contact.url}}</a> <a *ngIf="info.contact.email" href="mailto:{{info.contact.email}}">{{info.contact.email}}</a> </span><span *ngIf="info.license">License: <a *ngIf="info.license.url" href="{{info.license.url}}">{{info.license.name}} </a><span *ngIf="!info.license.url">{{info.license.name}}</span></span><redoc-externalDocs [docs]="componentSchema.externalDocs"></redoc-externalDocs></p><span class="redoc-markdown-block"><dynamic-ng2-viewer [html]="info[\'x-redoc-html-description\']"></dynamic-ng2-viewer></span></div>',
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
ApiInfo.ctorParameters = function () { return [
    { type: SpecManager, },
    { type: OptionsService, },
    { type: ElementRef, },
    { type: Marker, },
]; };
//# sourceMappingURL=api-info.js.map
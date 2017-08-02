'use strict';
import { Component, ChangeDetectionStrategy } from '@angular/core';
var RedocContainer = (function () {
    function RedocContainer() {
    }
    return RedocContainer;
}());
export { RedocContainer };
RedocContainer.decorators = [
    { type: Component, args: [{
                selector: 'redoc-container',
                styles: [':host{display:block;box-sizing:border-box;-webkit-tap-highlight-color:transparent;-moz-tap-highlight-color:transparent;-ms-tap-highlight-color:transparent;-o-tap-highlight-color:transparent;tap-highlight-color:transparent;-webkit-font-smoothing:antialiased;font-smoothing:antialiased;-webkit-osx-font-smoothing:grayscale;-moz-osx-font-smoothing:grayscale;osx-font-smoothing:grayscale;-moz-text-size-adjust:100%;-webkit-text-shadow:1px 1px 1px rgba(0,0,0,.004);-ms-text-shadow:1px 1px 1px rgba(0,0,0,.004);text-shadow:1px 1px 1px rgba(0,0,0,.004);text-rendering:optimizeSpeed!important;font-smooth:always;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;text-size-adjust:100%}:host.panel-hidden /deep/ .operation-samples{display:none}:host.panel-hidden /deep/ .operation-content{width:100%}:host.panel-hidden /deep/ api-info>.api-info-wrapper{width:100%}:host /deep/ .menu-item-header>span{display:inline-block;vertical-align:middle}:host /deep/ .menu-item-header>.operation-type+.menu-item-title{width:calc(100% - 32px)}:host /deep/ .menu-item-header>.operation-type{width:26px;display:inline-block;height:13px;background-color:#333;border-radius:3px;vertical-align:top;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAACgCAYAAADuDlcXAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpFNjQ5N0JDQUE3OTYxMUU0ODNGMUE0RUM3NjRDRTQyNyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpFNjQ5N0JDQkE3OTYxMUU0ODNGMUE0RUM3NjRDRTQyNyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkU2NDk3QkM4QTc5NjExRTQ4M0YxQTRFQzc2NENFNDI3IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkU2NDk3QkM5QTc5NjExRTQ4M0YxQTRFQzc2NENFNDI3Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+mIrGwQAAAZ9JREFUeNrsmtuOwyAMRBmU//9lbx9208ayjQ1EarSDVFW56ARIGGZIIK/S3gWvX3X7LN3a6WxDHdPnnDBpcZHEOe3wrmLUMg2zatKykPOq1/5fK71tLIQR9jjYsaJfWdWAAcRsM2W1z9LNGcFkRlmtPhvpf7qmHAGEESZqLFr/qbHaCy4Is6oxLdvT+nWr0lLPCCPsFn+mA5e2UjLycL1o6qLMiapqRGoifVCDinrgU2mRyJthzZg3CSPs+2HhIM4YGq0a4oDgiGjYTKw20/OwUzAEuXz73YSqtdsV+F1a3eZpweFEGGG7Y3ULbJRk4nYPlEHbUi86wpNtbz4oB37PICOrLEdC9DKzFv7EkQ8tYY8Nr8tuyJrRsdpMrIJ0n4GPBmGEEUbYzRMKnFwug1B7rppmbCiyBjBrQ1vC8KW/CxrF7osNrRbxMjofWsIIuwU2vapnZfTRq4/wFXl3hG9bMzP6ZWV47LoB+Gym1/EyUleKI2GEPW8pQpu80bHLvsifSWFVAVEzo2VDTxxb9T16eO7sF0vmxPNPxPFHgAEA/rGUMXq/uWcAAAAASUVORK5CYII=);background-repeat:no-repeat;background-position:6px 4px;text-indent:-9000px;margin-right:6px;margin-top:2px}:host /deep/ .menu-item-header>.operation-type.get{background-position:8px -12px;background-color:#6bbd5b}:host /deep/ .menu-item-header>.operation-type.post{background-position:6px 4px;background-color:#248fb2}:host /deep/ .menu-item-header>.operation-type.put{background-position:8px -28px;background-color:#9b708b}:host /deep/ .menu-item-header>.operation-type.options{background-position:4px -148px;background-color:#d3ca12}:host /deep/ .menu-item-header>.operation-type.patch{background-position:4px -114px;background-color:#e09d43}:host /deep/ .menu-item-header>.operation-type.delete{background-position:4px -44px;background-color:#e27a7a}:host /deep/ .menu-item-header>.operation-type.basic{background-position:5px -79px;background-color:#999}:host /deep/ .menu-item-header>.operation-type.link{background-position:4px -131px;background-color:#31bbb6}:host /deep/ h1{margin-top:0;font-family:Montserrat,sans-serif;font-weight:400;line-height:1.5;margin-bottom:.5em;font-size:1.85714em;color:#0033a0}:host /deep/ h2{margin-top:0;font-family:Montserrat,sans-serif;color:#263238;font-weight:400;line-height:1.5;margin-bottom:.5em;font-size:1.57143em}:host /deep/ h3{margin-top:0;font-family:Montserrat,sans-serif;color:#263238;font-weight:400;line-height:1.5;margin-bottom:.5em;font-size:1.28571em}:host /deep/ h4{margin-top:0;font-family:Montserrat,sans-serif;color:#263238;font-weight:400;line-height:1.5;margin-bottom:.5em;font-size:1.14286em}:host /deep/ h5{margin-top:0;font-family:Montserrat,sans-serif;color:#263238;font-weight:400;margin-bottom:.5em;font-size:.929em;line-height:20px}:host /deep/ p{font-family:Roboto,sans-serif;font-weight:300;margin:0 0 1em;line-height:1.5em}:host /deep/ a{text-decoration:none;color:#0033a0}:host /deep/ p>code{color:#e53935;border:1px solid rgba(38,50,56,.1)}:host /deep/ .hint--inversed:before{border-top-color:#fff}:host /deep/ .hint--inversed:after{background:#fff;color:#383838}:host /deep/ .share-link{cursor:pointer;margin-left:-15px;padding:0;line-height:1;width:15px;display:inline-block}:host /deep/ .share-link:before{content:"";width:15px;height:15px;background-size:contain;background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeD0iMCIgeT0iMCIgd2lkdGg9IjUxMiIgaGVpZ2h0PSI1MTIiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA1MTIgNTEyIiB4bWw6c3BhY2U9InByZXNlcnZlIj48cGF0aCBmaWxsPSIjMDEwMTAxIiBkPSJNNDU5LjcgMjMzLjRsLTkwLjUgOTAuNWMtNTAgNTAtMTMxIDUwLTE4MSAwIC03LjktNy44LTE0LTE2LjctMTkuNC0yNS44bDQyLjEtNDIuMWMyLTIgNC41LTMuMiA2LjgtNC41IDIuOSA5LjkgOCAxOS4zIDE1LjggMjcuMiAyNSAyNSA2NS42IDI0LjkgOTAuNSAwbDkwLjUtOTAuNWMyNS0yNSAyNS02NS42IDAtOTAuNSAtMjQuOS0yNS02NS41LTI1LTkwLjUgMGwtMzIuMiAzMi4yYy0yNi4xLTEwLjItNTQuMi0xMi45LTgxLjYtOC45bDY4LjYtNjguNmM1MC01MCAxMzEtNTAgMTgxIDBDNTA5LjYgMTAyLjMgNTA5LjYgMTgzLjQgNDU5LjcgMjMzLjR6TTIyMC4zIDM4Mi4ybC0zMi4yIDMyLjJjLTI1IDI0LjktNjUuNiAyNC45LTkwLjUgMCAtMjUtMjUtMjUtNjUuNiAwLTkwLjVsOTAuNS05MC41YzI1LTI1IDY1LjUtMjUgOTAuNSAwIDcuOCA3LjggMTIuOSAxNy4yIDE1LjggMjcuMSAyLjQtMS40IDQuOC0yLjUgNi44LTQuNWw0Mi4xLTQyYy01LjQtOS4yLTExLjYtMTgtMTkuNC0yNS44IC01MC01MC0xMzEtNTAtMTgxIDBsLTkwLjUgOTAuNWMtNTAgNTAtNTAgMTMxIDAgMTgxIDUwIDUwIDEzMSA1MCAxODEgMGw2OC42LTY4LjZDMjc0LjYgMzk1LjEgMjQ2LjQgMzkyLjMgMjIwLjMgMzgyLjJ6Ii8+PC9zdmc+Cg==);opacity:.5;visibility:hidden;display:inline-block;vertical-align:middle}:host /deep/ .sharable-header:hover .share-link:before,:host /deep/ .share-link:hover:before{visibility:visible}:host /deep/ .redoc-markdown-block pre{font-family:Courier,monospace;white-space:pre-wrap;background-color:#263238;color:#fff;padding:12px 14px 15px;overflow-x:auto;line-height:normal;border-radius:2px;border:1px solid rgba(38,50,56,.1)}:host /deep/ .redoc-markdown-block pre code{background-color:transparent;color:#fff}:host /deep/ .redoc-markdown-block pre code:after,:host /deep/ .redoc-markdown-block pre code:before{content:none}:host /deep/ .redoc-markdown-block code{font-family:Courier,monospace;background-color:rgba(38,50,56,.04);padding:.1em 0 .2em;font-size:1em;border-radius:2px;color:#e53935;border:1px solid rgba(38,50,56,.1)}:host /deep/ .redoc-markdown-block code:after,:host /deep/ .redoc-markdown-block code:before{letter-spacing:-.2em;content:"\00a0"}:host /deep/ .redoc-markdown-block p:last-of-type{margin-bottom:0}:host /deep/ .redoc-markdown-block blockquote{margin:0 0 1em;padding:0 15px;color:#777;border-left:4px solid #ddd}:host /deep/ .redoc-markdown-block img{max-width:100%;box-sizing:content-box}:host /deep/ .redoc-markdown-block ol,:host /deep/ .redoc-markdown-block ul{padding-left:2em;margin:0 0 1em}:host /deep/ .redoc-markdown-block table{display:block;width:100%;overflow:auto;word-break:normal;word-break:keep-all;border-collapse:collapse;border-spacing:0;margin-top:.5em;margin-bottom:.5em}:host /deep/ .redoc-markdown-block table tr{background-color:#fff;border-top:1px solid #ccc}:host /deep/ .redoc-markdown-block table tr:nth-child(2n){background-color:#f8f8f8}:host /deep/ .redoc-markdown-block table td,:host /deep/ .redoc-markdown-block table th{padding:6px 13px;border:1px solid #ddd}:host /deep/ .redoc-markdown-block table th{text-align:left;font-weight:700}:host /deep/ .redoc-markdown-block .alert{border-left:4px solid red;padding:13px 13px 13px 23px;position:relative;margin-bottom:1.5em}:host /deep/ .redoc-markdown-block .alert>p>strong:first-child{display:block}:host /deep/ .redoc-markdown-block .alert.alert-warning{background-color:#fcf8f2;border-color:#f0ad4e}:host /deep/ .redoc-markdown-block .alert.alert-warning>p>strong:first-child{color:#f0ad4e}:host /deep/ .redoc-markdown-block .alert.alert-info{background-color:#e3edf2;border-color:#5bc0de}:host /deep/ .redoc-markdown-block .alert.alert-info>p>strong:first-child{color:#5bc0de}:host /deep/ .redoc-markdown-block .alert.alert-success{background-color:#f3f8f3;border-color:#50af51}:host /deep/ .redoc-markdown-block .alert.alert-success>p>strong:first-child{color:#50af51}:host /deep/ .redoc-markdown-block .alert.alert-danger{background-color:#fdf7f7;border-color:#d9534f}:host /deep/ .redoc-markdown-block .alert.alert-danger>p>strong:first-child{color:#d9534f}'],
                template: '<ng-content></ng-content>',
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
RedocContainer.ctorParameters = function () { return []; };
//# sourceMappingURL=redoc-container.js.map
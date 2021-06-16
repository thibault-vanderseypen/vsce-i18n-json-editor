import * as vscode from 'vscode';
import * as fs from 'fs';
import * as _path from 'path';

import { IJEData } from './ije-data';
import { IJEDataTranslation } from './models/ije-data-translation';
import { IJEConfiguration } from './ije-configuration';

export class IJEManager {

    get isWorkspace() {
        return this.folderPath === null;
    }

    private _data: IJEData;

    constructor(private _context: vscode.ExtensionContext, private _panel: vscode.WebviewPanel, public folderPath: string) {
        this._data = new IJEData(this);
        this._initEvents();
        this._initTemplate();
        _panel.webview.html = this.getTemplate();
    }


    _initEvents() {
        this._panel.webview.onDidReceiveMessage(
            (message) => {
                switch (message.command) {
                    case 'add': this._data.add(); return;
                    case 'mark': this._data.mark(message.id); return;
                    case 'navigate': this._data.navigate(message.page); return;
                    case 'pageSize': this._data.pageSize(+message.value); return;
                    case 'refresh': this.refreshDataTable(); return;
                    case 'remove': this._data.remove(message.id); return;
                    case 'save': this._data.save(); return;
                    case 'filterFolder': this._data.filterFolder(message.value); return;
                    case 'search': this._data.search(message.value); return;
                    case 'select': this._data.select(message.id); return;
                    case 'sort': this._data.sort(message.column, message.ascending); return;
                    case 'switch-view': this._data.switchView(message.view); return;
                    case 'update': this._data.update(message.id, message.value, message.language); return;
                    case 'folder': this._data.changeFolder(message.id, message.value); return;
                }
            });
    }


    _initTemplate() {
        if (this.isWorkspace) {
            this._panel.webview.postMessage({ command: 'folders', folders: IJEConfiguration.FOLDERS });
        }
    }

    refreshDataTable() {
        this._panel.webview.postMessage({ command: 'content', render: this._data.render() });
    }

    updateTranslation(translation: IJEDataTranslation) {
        this._panel.webview.postMessage({ command: 'update', translation: translation });
    }


    getTemplate(): string {
        const template = vscode.Uri.file(_path.join(this._context.extensionPath, 'media', 'template.html'));

        const linksPath = [
            vscode.Uri.file(_path.join(this._context.extensionPath, 'media', 'bootstrap.min.css')),
            vscode.Uri.file(_path.join(this._context.extensionPath, 'media', 'template.css')),
            vscode.Uri.file(_path.join(this._context.extensionPath, 'media', 'fontello', 'css', 'fontello.css'))
        ];

        const scriptsPath = [
            vscode.Uri.file(_path.join(this._context.extensionPath, 'media', 'template.js')),
        ];

        return fs.readFileSync(template.fsPath)
            .toString()
            .replace('{{LINKS}}',
                linksPath.map(l => `<link rel="stylesheet" href="${this._panel.webview.asWebviewUri ?
                    this._panel.webview.asWebviewUri(l) : l.with({ scheme: 'vscode-resource' })}">`).join('\n')

            )
            .replace('{{SCRIPTS}}',
                scriptsPath.map(l => `<script src="${this._panel.webview.asWebviewUri ?
                    this._panel.webview.asWebviewUri(l) : l.with({ scheme: 'vscode-resource' })}"></script>`).join('\n')
            );
    }
}

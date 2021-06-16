import * as vscode from "vscode";
import * as fs from 'fs';
import * as _path from "path";

import { IJEFolder } from "./models/ije-folder";

export class IJEConfiguration {
  static get FORCE_KEY_UPPERCASE(): boolean {
    const value = vscode.workspace.getConfiguration().get<boolean>("i18nJsonEditor.forceKeyUPPERCASE");
    return value !== undefined ? value : true;
  }

  static get JSON_SPACE(): string | number {
    const value = vscode.workspace.getConfiguration().get<string | number>("i18nJsonEditor.jsonSpace");
    return value !== undefined ? value : 2;
  }

  static get SUPPORTED_FOLDERS(): string[] {
    const value = vscode.workspace.getConfiguration().get<string[]>("i18nJsonEditor.supportedFolders");
    return value !== undefined ? value : ["i18n"];
  }

  static get FOLDERS(): IJEFolder[] {
    const folders = vscode.workspace.getConfiguration().get<IJEFolder[]>("i18nJsonEditor.workspaceFolders");
    let workspaceFolder: vscode.WorkspaceFolder | undefined = vscode.workspace.workspaceFolders[0];

    const _folders: IJEFolder[] = [];
    folders.forEach((d) => {
      var path = vscode.Uri.file(_path.join(workspaceFolder.uri.fsPath, d.path)).fsPath;
      if (fs.existsSync(path)) {
        _folders.push({ name: d.name, path: path });
      }
    });

    return _folders !== undefined ? _folders : [];
  }
}

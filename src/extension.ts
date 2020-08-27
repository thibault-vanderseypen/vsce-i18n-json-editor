import * as vscode from 'vscode';
import * as _path from 'path';

import { IJEManager } from './i18n-json-editor/ije-manager';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerCommand('i18n-json-editor', (uri: vscode.Uri) => {
			const panel = vscode.window.createWebviewPanel(
				'i18n-json-editor',
				'i18n-json-editor',
				vscode.ViewColumn.One,
				{
					retainContextWhenHidden: true,
					enableScripts: true,
					localResourceRoots: [
						vscode.Uri.file(_path.join(context.extensionPath, 'media')) //
					  ]
				}
				
			);

			const manager = new IJEManager(context, panel, uri.fsPath);
			
		})
	);
}

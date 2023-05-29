import * as vscode from 'vscode'
import { getWorkspaceFolder, isProperSubpathOf } from './utils/workspace-utils'
import { WorkspaceContext } from './workspace'

export function activate(context: vscode.ExtensionContext) {

	let workspaceRoot: string = getWorkspaceFolder(
		vscode.workspace.workspaceFolders as vscode.WorkspaceFolder[],
		vscode.window.activeTextEditor
	)
	const workspaceContext = new WorkspaceContext(context, workspaceRoot)
	workspaceContext.registerCommands()

	const disposable = vscode.window.onDidChangeActiveTextEditor(editor => {
		if (editor?.document?.uri) {
			const newWorkSpaceRoot = getWorkspaceFolder(
				[vscode.workspace.getWorkspaceFolder(editor.document.uri)] as vscode.WorkspaceFolder[],
				vscode.window.activeTextEditor
			)

			if (workspaceContext.workspaceRoot === newWorkSpaceRoot) {
				//当工作区与之前保持相同时，防止刷新所有内容
				return
			}
			if (isProperSubpathOf(newWorkSpaceRoot, workspaceContext.workspaceRoot)) {
				return
			}
      workspaceContext.workspaceRoot = newWorkSpaceRoot
      workspaceContext.registerCommands()
		}
	})
	context.subscriptions.push(disposable)
}

// This method is called when your extension is deactivated
export function deactivate() {}

import { Disposable, ExtensionContext, commands, window } from 'vscode'
import { WebViewComponent } from './webview'

export class WorkspaceContext {
	private webview: WebViewComponent
	private addNoteRegistration!: Disposable
	private openSelectionRegistration!: Disposable
	constructor(private context: ExtensionContext, public workspaceRoot: string) {
		this.webview = new WebViewComponent(context)
		this.setup()
	}

	setup() {}

	registerCommands() {
		this.openSelectionRegistration = commands.registerCommand('codereview.openview', () => {
			console.log('打开完善页面')
		})

		this.addNoteRegistration = commands.registerCommand('codereview.add', () => {
			if (!window.activeTextEditor?.selection) {
				window.showErrorMessage('请选择您要检视的代码块,然后重试!')
				return
			}
			const { start, end } = window.activeTextEditor.selection
			if (start.line === end.line && start.character === end.character) {
				window.showErrorMessage('请选择您要检视的代码块,然后重试!')
				return
			}
		})
	}
}

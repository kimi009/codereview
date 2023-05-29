import { ExtensionContext, workspace } from 'vscode'

export class WebViewComponent {
	/**
	 * 存储所有的配置信息
	 */
	private categories: string[] = []
	constructor(public context: ExtensionContext) {
		this.categories = workspace.getConfiguration().get('codereview.categories') as string[]
	}
}

import { DecorationOptions, Range, TextEditor, window, workspace } from 'vscode'

const smallNumDecoration = window.createTextEditorDecorationType({
	border: '1px',
	borderStyle: 'solid',
	borderColor: '#fff'
})

const bigNumDecoration = window.createTextEditorDecorationType({
	backgroundColor: 'blue'
})

export class DecorationNumber {
	private editor: TextEditor | undefined

	constructor() {
		this.editor = window.activeTextEditor

		window.onDidChangeActiveTextEditor(() => {
			this.editor = window.activeTextEditor
			this.decNumber()
		})

		workspace.onDidChangeTextDocument(() => {
			this.decNumber()
		})
	}

	public decNumber() {
		if (!this.editor) {
			return
		}
		//获取当前文本的全部信息
		let doc = this.editor.document

		//获取文本的内容
		let text = doc.getText()

		//创建两个用来存放正则判断出来的数字的数组
		let smallNumbers: DecorationOptions[] = []
		let bigNumbers: DecorationOptions[] = []

		const regExp = /\d+/g

		let match
		while ((match = regExp.exec(text))) {
			//获取数字开始和结束位置
			const startPos = doc.positionAt(match.index)
			const endPos = doc.positionAt(match.index + match[0].length)

			//获取数字的位置范围，并且当鼠标要覆盖时，有我们想要的文字展示
			const decoration = {
				range: new Range(startPos, endPos),
				hoverMessage: 'Number **' + match[0] + '**'
			}

			//根据不同的长度，分别存入不同的数组中
			if (match[0].length < 3) {
				smallNumbers.push(decoration)
			} else {
				bigNumbers.push(decoration)
			}
		}

		this.editor.setDecorations(smallNumDecoration, smallNumbers)
		this.editor.setDecorations(bigNumDecoration, bigNumbers)
	}

	dispose() {}
}

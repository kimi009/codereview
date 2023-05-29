import path from 'path'
import { TextEditor, WorkspaceFolder } from 'vscode'

export const getWorkspaceFolder = (
	folders: WorkspaceFolder[] | undefined,
	activeTextEditor?: TextEditor
): string => {
	if (!folders || !folders[0] || !folders[0].uri || !folders[0].uri.fsPath) {
		const currentFile = activeTextEditor?.document.fileName
		return currentFile ? path.dirname(currentFile) : ''
	}
	return folders[0].uri.fsPath
}
/**
 * 判断dir是否是base子目录
 * @param dir
 * @param base
 * @returns
 */
export const isProperSubpathOf = (dir: string, base: string): boolean => {
	const relative = path.relative(base, dir)
	return !!relative && !!relative.startsWith('..') && !path.isAbsolute(relative)
}

export const removeLeadingSlash = (s: string): string => s.replace(/^\/|^\\/, '')

export const toAbsolutePath = (workspaceRoot: string, filename: string): string => {
	//统一文件名
	const harmonizedFileName = filename.replace(/\\/g, '/')
	return path.resolve(workspaceRoot, removeLeadingSlash(harmonizedFileName))
}

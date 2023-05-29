import { existsSync } from 'fs'
import path from 'path'
import { workspace } from 'vscode'
import { toAbsolutePath } from './utils/workspace-utils'

export enum CheckFlag {
	format = 0x1,
	migrage = 0x2
}

export class FileGenerator {
	private readonly defaultExtension = 'xlsx'
	private defaultFileName = 'codereview'
	constructor(private workspaceRoot: string) {
		const configFileName = workspace.getConfiguration().get('codereview.fileName') as string
		if (configFileName) {
			this.defaultFileName = configFileName
		}
	}

	public get reviewFilePath(): string {
		return FileGenerator.withSuffix(this.defaultFileName, this.defaultExtension)
	}

	public get absoluteReviewFilePath(): string {
		if (path.isAbsolute(this.reviewFilePath)) {
			return this.reviewFilePath
		} else {
			return toAbsolutePath(this.workspaceRoot, this.reviewFilePath)
		}
	}

	/**
	 * 获取带后缀的文件名
	 * @param file
	 * @param suffix
	 * @returns
	 */
	public static withSuffix(file: string, suffix: string): string {
		const ext = path.extname(file)
		if (ext === '') {
			return `${file}.${suffix}`
		}
		if (ext === '.') {
			return `${file}${suffix}`
		}
		if (ext.toLowerCase() === `.${suffix}`) {
			return file
		}
		return `${path.basename(file, ext)}.${suffix}`
	}

	public check(flags: CheckFlag = CheckFlag.format): boolean {
		if (!existsSync(this.absoluteReviewFilePath)) {
			return true
		}
		let result: boolean = true
		if (flags & CheckFlag.format) {
			result = this.checkFormat()
		}
		if (!result && flags & CheckFlag.migrage) {
			result = this.migrate()
		}
		return result
	}

	public checkFormat(): boolean {
		// todo:
		return true
	}

	public migrate(): boolean {
		//todo
		return true
	}

	public create(): boolean {
		if (existsSync(this.absoluteReviewFilePath)) {
			if (!this.check()) {
				return false
			}
		} else {
      //创建xlsx文件
		}

    return true
	}
}

import Config from "./Config.js";
import { _path } from "../model/path.js";

/**
 * 获取自定义shell命令参数名和执行结果
 * @return {Promise<Object>} 包含自定义参数名和shell执行结果
 */

export async function getShell() {
    const { shell } = Config.getConfig();
    return (await Promise.all(shell.map(async ({ name: name, command: shellCommand }) => {
        return { name, stdout: Buffer((await Bot.exec(shellCommand, { cwd: _path, encoding: '', timeout: 5000 })).stdout).toString() };
    })));
};
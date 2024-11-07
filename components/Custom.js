import Config from "./Config.js";
import iconv from 'iconv-lite';
import { exec } from 'child_process'
import os from 'os';

const isWindows = os.platform() === 'win32';

Bot.exec = Bot.exec || ((cmd, opts = {}) => {
    return new Promise((resolve) => {
        if (!opts.quiet) {
            logger.info(`[Neko状态] 执行命令：${logger.blue(cmd)}`);
        }
        opts.windowsHide = opts.windowsHide ?? true;
        exec(cmd, opts, (error, stdout, stderr) => {
            resolve({ error, stdout, stderr });
            if (opts.quiet) {
                return
            }
            logger.mark(`[Neko状态] 执行命令完成：${logger.blue(cmd)}${stdout ? `\n${String(stdout).trim()}` : ""}${stderr ? logger.red(`\n${String(stderr).trim()}`) : ""}`);
            if (error) {
                logger.mark(`[Neko状态] 执行命令错误：${logger.blue(cmd)}\n${logger.red((error?.message || error)?.trim?.() ?? '未知错误')}`);
            }
        });
    });
});

export async function getCustom() {
    const { custom } = Config.getConfig();

    const results = await Promise.all(custom.map(async ({ name, command }) => {
        const { stdout } = await Bot.exec(command, { encoding: isWindows ? 'binary' : 'utf8', timeout: 5000 });
        const output = isWindows ? iconv.decode(Buffer.from(stdout, 'binary'), 'gbk') : stdout || '';
        return { name, stdout: output };
    }));

    return results;
}
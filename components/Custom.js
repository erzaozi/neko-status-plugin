import Config from "./Config.js";
import iconv from 'iconv-lite';
import os from 'os';

const isWindows = os.platform() === 'win32';

export async function getCustom() {
    const { custom } = Config.getConfig();

    const results = await Promise.all(custom.map(async ({ name, command }) => {
        const { stdout } = await Bot.exec(command, { encoding: isWindows ? 'binary' : 'utf8', timeout: 5000 });
        const output = isWindows ? iconv.decode(Buffer.from(stdout, 'binary'), 'gbk') : stdout || '';
        return { name, stdout: output };
    }));

    return results;
}
import fs from 'fs';

/**
 * 获取插件数量信息
 * @return {Promise<Object>} 包含插件数量信息的对象
 */
export function getPluginNumInfo() {
    try {
        const pluginsDir = './plugins';
        const excludedDirs = ['example', 'genshin', 'other', 'system', 'bin', 'adapter'];
        const pluginFolders = fs.readdirSync(pluginsDir)
            .map(folderName => ({
                name: folderName,
                path: `${pluginsDir}/${folderName}`,
            }))
            .filter(folder => {
                const stats = fs.statSync(folder.path);
                return stats.isDirectory() && !excludedDirs.includes(folder.name);
            });

        const pluginsCount = pluginFolders.length || 0;

        const exampleDir = './plugins/example';
        const jsFilesCount = fs.existsSync(exampleDir)
            ? fs.readdirSync(exampleDir)
                  .filter(fileName => fileName.endsWith('.js')).length
            : 0;

        return {
            key: 'Plugins',
            value: `${pluginsCount} plugin & ${jsFilesCount} js loaded`
        };
    } catch (error) {
        console.error('获取插件信息时出错:', error);
        return {
            key: 'Plugins',
            value: "获取插件信息失败"
        };
    }
}
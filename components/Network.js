import systemInformation from 'systeminformation';

/**
 * 转换字节大小为更易读的格式（KB, MB, GB 等）
 * @param {number} bytes - 字节数
 * @return {string} 转换后的大小
 */
function formatSizeUnits(bytes) {
    if (bytes >= 1073741824) {
        return (bytes / 1073741824).toFixed(2) + ' GB';
    } else if (bytes >= 1048576) {
        return (bytes / 1048576).toFixed(2) + ' MB';
    } else if (bytes >= 1024) {
        return (bytes / 1024).toFixed(2) + ' KB';
    } else if (bytes > 1) {
        return bytes.toFixed(2) + ' B';
    } else if (bytes === 1) {
        return bytes + ' byte';
    } else {
        return '0 bytes';
    }
}

/**
 * 获取当前网络接口的上行下行速度
 * @return {Promise<Object>} 包含上行和下行速度的对象
 */
export async function getNetworkSpeed() {
  try {
    const info = await systemInformation.get({
      networkStats: "rx_sec,tx_sec",
    })

    if (!info.networkStats || info.networkStats.length === 0) {
      throw new Error('无法获取网络状态信息');
    }

    const primaryInterface = info.networkStats[0];

    return {
      text: `↑ ${formatSizeUnits(primaryInterface.tx_sec)}/s ↓ ${formatSizeUnits(primaryInterface.rx_sec)}/s`,
      progress: primaryInterface.tx_sec / (primaryInterface.tx_sec + primaryInterface.rx_sec)
    };
  } catch (error) {
    logger.error('获取网络速度时出错:', error);
    return {
        text: '↑ 0 B/s ↓ 0 B/s',
        progress: 0
    };
  }
}
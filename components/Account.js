export async function getAccountInfo(bot) {
    const friendNumber = bot.fl.size
    const groupNumber = bot.gl.size
    return {
        key: 'Account',
        value: `${friendNumber} Friends & ${groupNumber} Groups`
    }
}
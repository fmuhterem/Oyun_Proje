/**
 * NEON VOID SURVIVOR - Poki web advertising integration.
 *
 * Poki injects PokiSDK on the published game page. The local fallback keeps
 * development and preview builds playable without granting ad rewards.
 */
const PokiAds = {
    gameOverCount: 0,
    interstitialEvery: 2,
    initialized: false,

    async init() {
        if (!window.PokiSDK) {
            console.info('[Poki] SDK unavailable; ads disabled in this build.');
            return;
        }
        try {
            await window.PokiSDK.init();
            window.PokiSDK.setDebug?.(false);
            this.initialized = true;
        } catch (error) {
            console.warn('[Poki] SDK initialization failed:', error);
        }
    },

    async maybeShowInterstitial() {
        this.gameOverCount++;
        if (this.gameOverCount % this.interstitialEvery !== 0 || !window.PokiSDK?.commercialBreak) return;
        try {
            await window.PokiSDK.commercialBreak();
        } catch (error) {
            console.warn('[Poki] Interstitial failed:', error);
        }
    },

    async showRewarded(mode = 'revive') {
        if (!window.PokiSDK?.rewardedBreak) {
            console.info('[Poki] Rewarded ads are unavailable in this preview.');
            return;
        }
        try {
            const result = await window.PokiSDK.rewardedBreak();
            if (result === true || result?.rewarded === true) this.grantReward(mode);
        } catch (error) {
            console.warn('[Poki] Rewarded ad failed:', error);
        }
    },

    grantReward(mode) {
        if (mode === 'xpBoost' && typeof player !== 'undefined' && player) {
            player.xpMultiplier = 2;
            player.xpBoostTimer = 30000;
            document.getElementById('xpBoostBtn')?.classList.add('hidden');
            return;
        }
        if (mode === 'coinBoost' && typeof coins !== 'undefined') {
            coins += 500;
            if (typeof saveMeta === 'function') saveMeta();
            document.getElementById('adCoinBtn')?.classList.add('hidden');
            return;
        }
        if (typeof player === 'undefined' || !player) return;
        player.health = Math.ceil(player.maxHealth * 0.5);
        if (player.shield > 0) player.shield = Math.ceil(player.maxShield * 0.5);
        if (typeof gameState !== 'undefined') gameState.status = 'PLAYING';
        document.getElementById('gameOverScreen')?.classList.add('hidden');
        document.getElementById('hud')?.classList.remove('hidden');
        document.getElementById('rewardedAdBtn')?.classList.add('hidden');
        if (typeof loop === 'function') loop();
    },

    showXPBoost() { return this.showRewarded('xpBoost'); },
    showCoinReward() { return this.showRewarded('coinBoost'); }
};

document.addEventListener('DOMContentLoaded', () => PokiAds.init());

/**
 * NEON VOID SURVIVOR - AdMob Configuration
 * Replace TEST IDs with real IDs from AdMob console before publishing
 */

const ADMOB_CONFIG = {
    // --- REAL PRODUCTION ADMOB IDs ---
    APP_ID:           'ca-app-pub-1981864744211677~6041022093',
    BANNER_ID:        'ca-app-pub-1981864744211677/8835854202',
    INTERSTITIAL_ID:  'ca-app-pub-1981864744211677/2443872100',
    REWARDED_ID:      'ca-app-pub-1981864744211677/1574633243',
    // -----------------------------------------------

    TEST_MODE: false,  // Production Mode: REAL ADS ENABLED
    interstitialCount: 0,
    interstitialEvery: 2  // Show interstitial every N game-overs
};

const AdMobHelper = {
    admob: null,

    async init() {
        // Only works inside Capacitor (native Android/iOS)
        if (!window.Capacitor || !window.Capacitor.isNativePlatform()) {
            console.log('[AdMob] Web mode — ads disabled');
            return;
        }

        try {
            const { AdMob } = await import('@capacitor-community/admob');
            this.admob = AdMob;

            await AdMob.initialize({
                testingDevices: ADMOB_CONFIG.TEST_MODE ? ['EMULATOR'] : [],
                initializeForTesting: ADMOB_CONFIG.TEST_MODE
            });

            // Prepare banner for main menu
            this.showBanner();

            // Preload interstitial
            this.prepareInterstitial();

            // Preload rewarded
            this.prepareRewarded();

            console.log('[AdMob] Initialized');
        } catch (e) {
            console.warn('[AdMob] Init failed:', e);
        }
    },

    async showBanner() {
        if (!this.admob) return;
        try {
            const { BannerAdPosition, BannerAdSize } = await import('@capacitor-community/admob');
            await this.admob.showBanner({
                adId: ADMOB_CONFIG.BANNER_ID,
                adSize: BannerAdSize.ADAPTIVE_BANNER,
                position: BannerAdPosition.BOTTOM_CENTER,
                margin: 0
            });
        } catch (e) {
            console.warn('[AdMob] Banner error:', e);
        }
    },

    async hideBanner() {
        if (!this.admob) return;
        try { await this.admob.hideBanner(); } catch (e) {}
    },

    async prepareInterstitial() {
        if (!this.admob) return;
        try {
            await this.admob.prepareInterstitial({ adId: ADMOB_CONFIG.INTERSTITIAL_ID });
        } catch (e) {
            console.warn('[AdMob] Interstitial prepare error:', e);
        }
    },

    async maybeShowInterstitial() {
        ADMOB_CONFIG.interstitialCount++;
        if (ADMOB_CONFIG.interstitialCount % ADMOB_CONFIG.interstitialEvery !== 0) return;
        if (!this.admob) return;
        try {
            await this.admob.showInterstitial();
            // Preload next one
            setTimeout(() => this.prepareInterstitial(), 1000);
        } catch (e) {
            console.warn('[AdMob] Interstitial show error:', e);
        }
    },

    async prepareRewarded() {
        if (!this.admob) return;
        try {
            await this.admob.prepareRewardVideoAd({ adId: ADMOB_CONFIG.REWARDED_ID });
        } catch (e) {
            console.warn('[AdMob] Rewarded prepare error:', e);
        }
    },

    /**
     * Shows a rewarded ad and calls _onRewardGranted with the given mode on success.
     * Fixed: mode parameter is now forwarded correctly (was always defaulting to revive).
     * @param {'revive'|'xpBoost'|'coinBoost'} mode
     */
    async showRewarded(mode = 'revive') {
        if (!this.admob) {
            // Web fallback: skip ad and grant reward immediately
            this._onRewardGranted(mode);
            return;
        }
        try {
            const result = await this.admob.showRewardVideoAd();
            if (result && result.type === 'rewarded') {
                this._onRewardGranted(mode);
            }
            setTimeout(() => this.prepareRewarded(), 1000);
        } catch (e) {
            console.warn('[AdMob] Rewarded show error:', e);
        }
    },


    _onRewardGranted(mode) {
        if (mode === 'xpBoost') {
            // 2x XP for 30 seconds
            if (typeof player !== 'undefined' && player) {
                player.xpMultiplier = 2.0;
                player.xpBoostTimer = 30000;
            }
            const btn = document.getElementById('xpBoostBtn');
            if (btn) btn.style.display = 'none';
            return;
        }
        if (mode === 'coinBoost') {
            if (typeof coins !== 'undefined') {
                coins += 500;
                if (typeof saveMeta === 'function') saveMeta();
                if (typeof updateShopUI === 'function') updateShopUI();
                const shopBtn = document.getElementById('adCoinBtn');
                if (shopBtn) {
                    shopBtn.innerText = "THANKS! (+500 🟡)";
                    shopBtn.disabled = true;
                    setTimeout(() => {
                        shopBtn.innerText = "▶ GET 500 🟡 (Ad)";
                        shopBtn.disabled = false;
                    }, 5000); // 5 sec cooldown
                }
            }
            return;
        }
        // Revive mode
        if (typeof player !== 'undefined' && player) {
            player.health = Math.ceil(player.maxHealth * 0.5);
            if (player.shield > 0) player.shield = Math.ceil(player.maxShield * 0.5);
            if (typeof gameState !== 'undefined') gameState.status = 'PLAYING';
            const gameOverEl = document.getElementById('gameOverScreen');
            if (gameOverEl) gameOverEl.classList.add('hidden');
            const hudEl = document.getElementById('hud');
            if (hudEl) hudEl.classList.remove('hidden');
            if (typeof loop === 'function') loop();
        }
        const btn = document.getElementById('rewardedAdBtn');
        if (btn) btn.style.display = 'none';
    },

    async showXPBoost() {
        if (!this.admob) {
            this._onRewardGranted('xpBoost');
            return;
        }
        try {
            const result = await this.admob.showRewardVideoAd();
            if (result && result.type === 'rewarded') this._onRewardGranted('xpBoost');
            setTimeout(() => this.prepareRewarded(), 1000);
        } catch (e) {
            console.warn('[AdMob] XPBoost ad error:', e);
        }
    },

    async showCoinReward() {
        if (!this.admob) {
            this._onRewardGranted('coinBoost');
            return;
        }
        try {
            const result = await this.admob.showRewardVideoAd();
            if (result && result.type === 'rewarded') this._onRewardGranted('coinBoost');
            setTimeout(() => this.prepareRewarded(), 1000);
        } catch (e) {
            console.warn('[AdMob] CoinBoost ad error:', e);
        }
    }
};

// Auto-initialize when Capacitor is ready
document.addEventListener('DOMContentLoaded', () => {
    AdMobHelper.init();
});

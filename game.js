/**
 * ============================================================
 *  NEON VOID SURVIVOR  v2.0
 *  Core Game Logic — Refactored, cleaned & extended
 * ============================================================
 *
 *  Sections:
 *   1.  TRANSLATIONS        - Multi-language text strings
 *   2.  CONFIG              - All game constants in one place
 *   3.  DOM CACHE           - Cached element references
 *   4.  SOUND MANAGER       - Web Audio API synthesized sounds
 *   5.  LANGUAGE MANAGER    - i18n helpers
 *   6.  GAME STATE          - Mutable runtime variables
 *   7.  META PROGRESSION    - Persistent cross-run upgrades
 *   8.  CAMERA              - Viewport tracking, clamped to world
 *   9.  ENTITY CLASSES      - Player, enemies, pickups, bullets
 *  10.  UTILITIES           - Shared helper functions
 *  11.  GAME SYSTEMS        - Wave, combo, spawn, aura logic
 *  12.  GAME LOOP           - Main update + draw cycle
 *  13.  HUD & UI            - All overlay and screen functions
 *  14.  INPUT               - Keyboard, mouse, touch, joystick
 *  15.  CHARACTER SYSTEM    - Customization screen & preview
 *  16.  SHOP SYSTEM         - Persistent upgrades store
 *  17.  MENU ANIMATION      - Animated particle background
 *  18.  INITIALIZATION      - Bootstrap & event wiring
 * ============================================================
 */

/* =============================================================
   1. TRANSLATIONS
   ============================================================= */
const TRANSLATIONS = {
    en: {
        startBg: 'START GAME',       highScores: 'HIGH SCORES',   tapToPlay: 'Tap / Click to Play',
        hp: 'HP',   xp: 'XP',        score: 'SCORE',              stats: 'STATS',
        dmg: 'DMG', spd: 'SPD',      rof: 'ROF',                  blt: 'BLT',
        multi: 'MULTI', mag: 'MAG',  prc: 'PRC',                  allies: 'ALLIES',
        kills: 'KILLS', aura: 'AURA', vamp: 'VAMP',               dash: 'DASH',
        levelUp: 'LEVEL UP!',         chooseUpgrade: 'Choose your upgrade',
        paused: 'PAUSED',             volume: 'MASTER VOLUME',
        resume: 'RESUME',             mainMenu: 'MAIN MENU',
        gameOver: 'GAME OVER',        survived: 'SURVIVED',
        finalScore: 'SCORE',          tryAgain: 'TRY AGAIN',
        // Upgrades
        u_rapidFire:   'Rapid Fire',       d_rapidFire:   '+20% Fire Rate',
        u_highCaliber: 'High Caliber',     d_highCaliber: '+10 Damage',
        u_swiftness:   'Swiftness',        d_swiftness:   '+15% Speed',
        u_velocity:    'Velocity',         d_velocity:    '+25% Bullet Speed',
        u_doubleShot:  'Double Shot',      d_doubleShot:  '+1 Projectile',
        u_magnet:      'Magnet',           d_magnet:      '+50% Pickup Range',
        u_piercing:    'Piercing Rounds',  d_piercing:    'Pierce +1 Enemy',
        u_regen:       'Regeneration',     d_regen:       '+2 HP/sec',
        u_heal:        'Emergency Heal',   d_heal:        'Heal 50% HP',
        u_shield:      'Force Shield',     d_shield:      '+50 Shield HP',
        u_maxHp:       'Fortify',          d_maxHp:       '+25 Max HP',
        u_vampirism:   'Vampirism',        d_vampirism:   '+1 HP per Kill',
        u_aura:        'Damage Aura',      d_aura:        '15 DPS to Nearby Foes',
        u_luck:        'Fortune',          d_luck:        '+20% XP Gain',
        u_overclock:   'Overclock',        d_overclock:   '-1s Dash Cooldown',
        // Menu & misc
        rateUs: '\u2B50 Rate Us',          privacy: 'Privacy Policy',
        bossWarning: '\u26A0 BOSS INCOMING \u26A0',
        shop: 'SHOP',
        shop_hp_desc:    'Increases starting Health.',
        shop_dmg_desc:   'Increases base Damage.',
        shop_spd_desc:   'Increases base Speed.',
        shop_greed:      'Greed',
        shop_greed_desc: 'Increase Coin drop rate.',
        close: 'CLOSE',
        notEnoughCoins:  'Not enough coins!',
        dashReady: 'DASH READY',
    },
    tr: {
        startBg: 'OYUNA BA\u015eLA',   highScores: 'SKOR TABLOSU',  tapToPlay: 'Oynamak i\u00e7in T\u0131kla',
        hp: 'CAN', xp: 'TP',          score: 'SKOR',               stats: '\u0130STAT\u0130ST\u0130K',
        dmg: 'HASAR', spd: 'HIZ',     rof: 'ATI\u015e HIZI',       blt: 'MERM\u0130 HIZI',
        multi: '\u00c7OKLU', mag: 'MIKNATIS', prc: 'DELME',          allies: 'DOSTLAR',
        kills: 'EL\u0130ME', aura: 'AURA', vamp: 'VAMPIR',          dash: 'KO\u015eU',
        levelUp: 'SEV\u0130YE ATLADIN!', chooseUpgrade: 'Geli\u015ftirmeni Se\u00e7',
        paused: 'DURAKLATILDI',        volume: 'SES D\u00dcZEY\u0130',
        resume: 'DEVAM ET',            mainMenu: 'ANA MEN\u00dc',
        gameOver: 'OYUN B\u0130TT\u0130', survived: 'HAYATTA KALMA',
        finalScore: 'SKOR',           tryAgain: 'TEKRAR DENE',
        u_rapidFire:   'Seri At\u0131\u015f',     d_rapidFire:   '+%20 At\u0131\u015f H\u0131z\u0131',
        u_highCaliber: 'Y\u00fcksek Kalibre',     d_highCaliber: '+10 Hasar',
        u_swiftness:   '\u00c7eviklik',            d_swiftness:   '+%15 H\u0131z',
        u_velocity:    'Namlu H\u0131z\u0131',     d_velocity:    '+%25 Mermi H\u0131z\u0131',
        u_doubleShot:  '\u00c7ifte At\u0131\u015f', d_doubleShot: '+1 Mermi',
        u_magnet:      'M\u0131knat\u0131s',       d_magnet:      '+%50 Toplama Alan\u0131',
        u_piercing:    'Delici Mermi',             d_piercing:    '+1 D\u00fc\u015fman Delme',
        u_regen:       'Yenilenme',                d_regen:       '+2 Can/sn',
        u_heal:        'Acil \u015eifa',           d_heal:        '%50 Can Yenile',
        u_shield:      'Kuvvet Kalkan\u0131',      d_shield:      '+50 Kalkan',
        u_maxHp:       'G\u00fc\u00e7lendir',      d_maxHp:       '+25 Maks Can',
        u_vampirism:   'Vampirlik',                d_vampirism:   '+1 Can/\u00d6ld\u00fcrme',
        u_aura:        'Hasar Auras\u0131',        d_aura:        'Yak\u0131ndaki d\u00fc\u015fmanlara 15 DPS',
        u_luck:        '\u015eans',                d_luck:        '+%20 Tecr\u00fcbe Puan\u0131',
        u_overclock:   'H\u0131zlanma',            d_overclock:   '-1sn Ko\u015fu Bekleme',
        rateUs: '\u2B50 Puan Ver',                 privacy: 'Gizlilik Politikas\u0131',
        bossWarning: '\u26A0 PATRON GEL\u0130YOR \u26A0',
        shop: 'D\u00dcKKAN',
        shop_hp_desc: 'Ba\u015flang\u0131\u00e7 Can\u0131n\u0131 art\u0131r\u0131r.',
        shop_dmg_desc: 'Temel Hasar\u0131 art\u0131r\u0131r.',
        shop_spd_desc: 'Temel H\u0131z\u0131 art\u0131r\u0131r.',
        shop_greed: 'A\u00e7g\u00f6zl\u00fcl\u00fck',
        shop_greed_desc: 'Alt\u0131n d\u00fc\u015fme oran\u0131n\u0131 art\u0131r\u0131r.',
        close: 'KAPAT',
        notEnoughCoins: 'Yeterli sikke yok!',
        dashReady: 'KO\u015eU HAZIR',
    },
    de: {
        startBg: 'SPIEL STARTEN',     highScores: 'BESTENLISTE',   tapToPlay: 'Tippen zum Spielen',
        hp: 'LP', xp: 'EP',           score: 'PUNKTE',             stats: 'WERTE',
        dmg: 'SCHDN', spd: 'GESCHW',  rof: 'FEUERRATE',            blt: 'PROJEKTIL',
        multi: 'MEHRFACH', mag: 'MAGNET', prc: 'DURCHDR',          allies: 'VERB\u00dcNDETE',
        kills: 'KILLS', aura: 'AURA', vamp: 'VAMPIR',              dash: 'DASH',
        levelUp: 'LEVEL AUFSTIEG!',   chooseUpgrade: 'W\u00e4hle dein Upgrade',
        paused: 'PAUSIERT',           volume: 'LAUTST\u00c4RKE',
        resume: 'WEITER',             mainMenu: 'HAUPTMEN\u00dc',
        gameOver: 'GAME OVER',        survived: '\u00dcBERLEBT',
        finalScore: 'PUNKTE',         tryAgain: 'NEUSTART',
        u_rapidFire: 'Schnellfeuer',  d_rapidFire: '+20% Feuerrate',
        u_highCaliber: 'Gro\u00dfkaliber', d_highCaliber: '+10 Schaden',
        u_swiftness: 'Schnelligkeit', d_swiftness: '+15% Tempo',
        u_velocity: 'Geschwindigkeit',d_velocity: '+25% Projektiltempo',
        u_doubleShot: 'Doppelschuss', d_doubleShot: '+1 Projektil',
        u_magnet: 'Magnet',           d_magnet: '+50% Reichweite',
        u_piercing: 'Durchdringung',  d_piercing: 'Durchdringt +1 Feind',
        u_regen: 'Regeneration',      d_regen: '+2 LP/Sek',
        u_heal: 'Notheilung',         d_heal: 'Heilt 50% LP',
        u_shield: 'Kraftschild',      d_shield: '+50 Schild',
        u_maxHp: 'Befestigen',        d_maxHp: '+25 Max LP',
        u_vampirism: 'Vampirismus',   d_vampirism: '+1 LP pro Kill',
        u_aura: 'Schadensaura',       d_aura: '15 SPS f\u00fcr nahe Feinde',
        u_luck: 'Gl\u00fcck',         d_luck: '+20% EP Gewinn',
        u_overclock: '\u00dcbertakten', d_overclock: '-1s Dash-Abklingzeit',
        rateUs: '\u2B50 Bewerten',    privacy: 'Datenschutz',
        bossWarning: '\u26A0 BOSS KOMMT \u26A0',
        shop: 'LADEN', shop_hp_desc: 'Erh\u00f6ht Start-LP.',
        shop_dmg_desc: 'Erh\u00f6ht Basisschaden.', shop_spd_desc: 'Erh\u00f6ht Basisgeschwindigkeit.',
        shop_greed: 'Gier', shop_greed_desc: 'Erh\u00f6ht M\u00fcnzabwurfrate.',
        close: 'SCHLIESSEN', notEnoughCoins: 'Nicht genug M\u00fcnzen!', dashReady: 'DASH BEREIT',
    },
    es: {
        startBg: 'EMPEZAR',           highScores: 'PUNTUACIONES',  tapToPlay: 'Toca para Jugar',
        hp: 'VIDA', xp: 'EXP',        score: 'PUNTOS',             stats: 'ESTAD\u00cdSTICAS',
        dmg: 'DA\u00d1O', spd: 'VEL', rof: 'CADENCIA',             blt: 'BALA',
        multi: 'MULTI', mag: 'IM\u00c1N', prc: 'PERF',             allies: 'ALIADOS',
        kills: 'BAJAS', aura: 'AURA', vamp: 'VAMPIRO',             dash: 'DASH',
        levelUp: '\u00a1SUBIDA DE NIVEL!', chooseUpgrade: 'Elige tu mejora',
        paused: 'PAUSA',              volume: 'VOLUMEN',
        resume: 'REANUDAR',           mainMenu: 'MEN\u00dc PRINCIPAL',
        gameOver: 'FIN DEL JUEGO',    survived: 'SOBREVIVIDO',
        finalScore: 'PUNTOS',         tryAgain: 'REINTENTAR',
        u_rapidFire: 'Fuego R\u00e1pido',  d_rapidFire: '+20% Cadencia',
        u_highCaliber: 'Alto Calibre',     d_highCaliber: '+10 Da\u00f1o',
        u_swiftness: 'Rapidez',            d_swiftness: '+15% Velocidad',
        u_velocity: 'Velocidad Bala',      d_velocity: '+25% Vel. Proyectil',
        u_doubleShot: 'Disparo Doble',     d_doubleShot: '+1 Proyectil',
        u_magnet: 'Im\u00e1n',             d_magnet: '+50% Rango',
        u_piercing: 'Perforante',          d_piercing: 'Perfora +1 Enemigo',
        u_regen: 'Regeneraci\u00f3n',      d_regen: '+2 Vida/seg',
        u_heal: 'Curaci\u00f3n',           d_heal: 'Cura 50% Vida',
        u_shield: 'Escudo Fuerza',         d_shield: '+50 Escudo',
        u_maxHp: 'Fortaleza',              d_maxHp: '+25 Vida M\u00e1x',
        u_vampirism: 'Vampirismo',         d_vampirism: '+1 Vida por Kill',
        u_aura: 'Aura de Da\u00f1o',       d_aura: '15 DPS a cercanos',
        u_luck: 'Fortuna',                 d_luck: '+20% EXP',
        u_overclock: 'Sobrevelocidad',     d_overclock: '-1s Cooldown Dash',
        rateUs: '\u2B50 Valorar',          privacy: 'Privacidad',
        bossWarning: '\u26A0 JEFE ENTRANTE \u26A0',
        shop: 'TIENDA', shop_hp_desc: 'Aumenta Vida inicial.',
        shop_dmg_desc: 'Aumenta Da\u00f1o base.', shop_spd_desc: 'Aumenta Velocidad base.',
        shop_greed: 'Codicia', shop_greed_desc: 'Aumenta tasa de monedas.',
        close: 'CERRAR', notEnoughCoins: '\u00a1Monedas insuficientes!', dashReady: 'DASH LISTO',
    },
    ru: {
        startBg: '\u041d\u0410\u0427\u0410\u0422\u042c \u0418\u0413\u0420\u0423', highScores: '\u0420\u0415\u041a\u041e\u0420\u0414\u042b', tapToPlay: '\u041d\u0430\u0436\u043c\u0438\u0442\u0435, \u0447\u0442\u043e\u0431\u044b \u0438\u0433\u0440\u0430\u0442\u044c',
        hp: '\u041e\u0417', xp: '\u041e\u041f\u042b\u0422', score: '\u0421\u0427\u0415\u0422', stats: '\u0421\u0422\u0410\u0422\u0418\u0421\u0422\u0418\u041a\u0410',
        dmg: '\u0423\u0420\u041e\u041d', spd: '\u0421\u041a\u041e\u0420', rof: '\u0421\u041a.\u0421\u0422\u0420', blt: '\u0421\u041d.\u0421\u041a\u0420',
        multi: '\u041c\u0423\u041b\u042c\u0422\u0418', mag: '\u041c\u0410\u0413\u041d\u0418\u0422', prc: '\u041f\u0420\u041e\u0411\u0418\u0412', allies: '\u0421\u041e\u042e\u0417\u041d\u0418\u041a\u0418',
        kills: '\u0423\u0411\u0418\u0419\u0421\u0422\u0412\u0410', aura: '\u0410\u0423\u0420\u0410', vamp: '\u0412\u0410\u041c\u041f\u0418\u0420', dash: '\u0420\u042b\u0412\u041e\u041a',
        levelUp: '\u041d\u041e\u0412\u042b\u0419 \u0423\u0420\u041e\u0412\u0415\u041d\u042c!', chooseUpgrade: '\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0443\u043b\u0443\u0447\u0448\u0435\u043d\u0438\u0435',
        paused: '\u041f\u0410\u0423\u0417\u0410', volume: '\u0413\u0420\u041e\u041c\u041a\u041e\u0421\u0422\u042c',
        resume: '\u041f\u0420\u041e\u0414\u041e\u041b\u0416\u0418\u0422\u042c', mainMenu: '\u0413\u041b\u0410\u0412\u041d\u041e\u0415 \u041c\u0415\u041d\u042e',
        gameOver: '\u0418\u0413\u0420\u0410 \u041e\u041a\u041e\u041d\u0427\u0415\u041d\u0410', survived: '\u0412\u0420\u0415\u041c\u042f',
        finalScore: '\u0421\u0427\u0415\u0422', tryAgain: '\u0415\u0429\u0415 \u0420\u0410\u0417',
        u_rapidFire: '\u0421\u043a\u043e\u0440\u043e\u0441\u0442\u0440\u0435\u043b\u044c\u043d\u043e\u0441\u0442\u044c', d_rapidFire: '+20% \u0421\u043a. \u0421\u0442\u0440\u0435\u043b\u044c\u0431\u044b',
        u_highCaliber: '\u041a\u0440\u0443\u043f\u043d\u044b\u0439 \u041a\u0430\u043b\u0438\u0431\u0440', d_highCaliber: '+10 \u0423\u0440\u043e\u043d',
        u_swiftness: '\u041b\u043e\u0432\u043a\u043e\u0441\u0442\u044c', d_swiftness: '+15% \u0421\u043a\u043e\u0440\u043e\u0441\u0442\u044c',
        u_velocity: '\u0421\u043a\u043e\u0440\u043e\u0441\u0442\u044c \u041f\u0443\u043b\u0438', d_velocity: '+25% \u0421\u043a. \u0421\u043d\u0430\u0440\u044f\u0434\u0430',
        u_doubleShot: '\u0414\u0432\u043e\u0439\u043d\u043e\u0439 \u0412\u044b\u0441\u0442\u0440\u0435\u043b', d_doubleShot: '+1 \u0421\u043d\u0430\u0440\u044f\u0434',
        u_magnet: '\u041c\u0430\u0433\u043d\u0438\u0442', d_magnet: '+50% \u0420\u0430\u0434\u0438\u0443\u0441 \u0421\u0431\u043e\u0440\u0430',
        u_piercing: '\u041f\u0440\u043e\u0431\u0438\u0432\u0430\u043d\u0438\u0435', d_piercing: '\u041f\u0440\u043e\u0431\u0438\u0432\u0430\u0435\u0442 +1 \u0412\u0440\u0430\u0433\u0430',
        u_regen: '\u0420\u0435\u0433\u0435\u043d\u0435\u0440\u0430\u0446\u0438\u044f', d_regen: '+2 \u041e\u0417/\u0441\u0435\u043a',
        u_heal: '\u041b\u0435\u0447\u0435\u043d\u0438\u0435', d_heal: '\u0412\u043e\u0441\u0441\u0442. 50% \u041e\u0417',
        u_shield: '\u0421\u0438\u043b\u043e\u0432\u043e\u0439 \u0429\u0438\u0442', d_shield: '+50 \u0429\u0438\u0442',
        u_maxHp: '\u0423\u043a\u0440\u0435\u043f\u043b\u0435\u043d\u0438\u0435', d_maxHp: '+25 \u041c\u0430\u043a\u0441 \u041e\u0417',
        u_vampirism: '\u0412\u0430\u043c\u043f\u0438\u0440\u0438\u0437\u043c', d_vampirism: '+1 \u041e\u0417 \u0437\u0430 \u0443\u0431\u0438\u0439\u0441\u0442\u0432\u043e',
        u_aura: '\u0410\u0443\u0440\u0430 \u0443\u0440\u043e\u043d\u0430', d_aura: '15 \u0414\u041f\u0421 \u0431\u043b\u0438\u0436\u043d\u0438\u043c \u0432\u0440\u0430\u0433\u0430\u043c',
        u_luck: '\u0423\u0434\u0430\u0447\u0430', d_luck: '+20% \u043e\u043f\u044b\u0442\u0430',
        u_overclock: '\u0420\u0430\u0437\u0433\u043e\u043d', d_overclock: '-1\u0441 \u043f\u0435\u0440\u0435\u0437\u0430\u0440\u044f\u0434\u043a\u0430 \u0440\u044b\u0432\u043a\u0430',
        rateUs: '\u2B50 \u041e\u0446\u0435\u043d\u0438\u0442\u044c', privacy: '\u041f\u043e\u043b\u0438\u0442\u0438\u043a\u0430',
        bossWarning: '\u26A0 \u0411\u041e\u0421\u0421 \u0418\u0414\u0401\u0422 \u26A0',
        shop: '\u041c\u0410\u0413\u0410\u0417\u0418\u041d', shop_hp_desc: '\u0423\u0432\u0435\u043b\u0438\u0447\u0438\u0432\u0430\u0435\u0442 \u043d\u0430\u0447\u0430\u043b\u044c\u043d\u044b\u0435 \u041e\u0417.',
        shop_dmg_desc: '\u0423\u0432\u0435\u043b\u0438\u0447\u0438\u0432\u0430\u0435\u0442 \u0443\u0440\u043e\u043d.', shop_spd_desc: '\u0423\u0432\u0435\u043b\u0438\u0447\u0438\u0432\u0430\u0435\u0442 \u0441\u043a\u043e\u0440\u043e\u0441\u0442\u044c.',
        shop_greed: '\u0416\u0430\u0434\u043d\u043e\u0441\u0442\u044c', shop_greed_desc: '\u0423\u0432\u0435\u043b\u0438\u0447\u0438\u0432\u0430\u0435\u0442 \u0448\u0430\u043d\u0441 \u043c\u043e\u043d\u0435\u0442.',
        close: '\u0417\u0410\u041a\u0420\u042b\u0422\u042c', notEnoughCoins: '\u041d\u0435\u0434\u043e\u0441\u0442\u0430\u0442\u043e\u0447\u043d\u043e \u043c\u043e\u043d\u0435\u0442!', dashReady: '\u0420\u042b\u0412\u041e\u041a \u0413\u041e\u0422\u041e\u0412',
    },
    cn: {
        startBg: '\u5f00\u59cb\u6e38\u620f', highScores: '\u9ad8\u5206\u699c', tapToPlay: '\u70b9\u51fb\u5f00\u59cb',
        hp: '\u751f\u547d', xp: '\u7ecf\u9a8c', score: '\u5206\u6570', stats: '\u5c5e\u6027',
        dmg: '\u4f24\u5bb3', spd: '\u901f\u5ea6', rof: '\u5c04\u901f', blt: '\u5f39\u901f',
        multi: '\u591a\u91cd', mag: '\u78c1\u9435', prc: '\u7a7f\u900f', allies: '\u76df\u53cb',
        kills: '\u51fb\u6740', aura: '\u5149\u73af', vamp: '\u5438\u8840', dash: '\u51b2\u523a',
        levelUp: '\u5347\u7ea7\uff01', chooseUpgrade: '\u9009\u62e9\u5347\u7ea7',
        paused: '\u6682\u505c', volume: '\u97f3\u91cf',
        resume: '\u7ee7\u7eed', mainMenu: '\u4e3b\u83dc\u5355',
        gameOver: '\u6e38\u620f\u7ed3\u675f', survived: '\u5b58\u6d3b\u65f6\u95f4',
        finalScore: '\u5206\u6570', tryAgain: '\u91cd\u8bd5',
        u_rapidFire: '\u6025\u901f\u5c04\u51fb', d_rapidFire: '+20% \u5c04\u901f',
        u_highCaliber: '\u5927\u53e3\u5f84', d_highCaliber: '+10 \u4f24\u5bb3',
        u_swiftness: '\u8fc5\u6377', d_swiftness: '+15% \u79fb\u52a8\u901f\u5ea6',
        u_velocity: '\u9ad8\u901f\u5f39\u836f', d_velocity: '+25% \u5b50\u5f39\u901f\u5ea6',
        u_doubleShot: '\u53cc\u91cd\u5c04\u51fb', d_doubleShot: '+1 \u5b50\u5f39\u6570\u91cf',
        u_magnet: '\u78c1\u9435', d_magnet: '+50% \u62fe\u53d6\u8303\u56f4',
        u_piercing: '\u7a7f\u900f\u5f39', d_piercing: '\u7a7f\u900f +1 \u654c\u4eba',
        u_regen: '\u518d\u751f', d_regen: '+2 \u751f\u547d/\u79d2',
        u_heal: '\u7d27\u6025\u6cbb\u7597', d_heal: '\u6062\u590d 50% \u751f\u547d',
        u_shield: '\u529b\u573a\u62a4\u76fe', d_shield: '+50 \u62a4\u76fe',
        u_maxHp: '\u5f3a\u5316', d_maxHp: '+25 \u6700\u5927\u751f\u547d',
        u_vampirism: '\u5438\u8840', d_vampirism: '+1 \u751f\u547d/\u51fb\u6740',
        u_aura: '\u4f24\u5bb3\u5149\u73af', d_aura: '\u5bf9\u9644\u8fd1\u654c\u4eba 15 DPS',
        u_luck: '\u5e78\u8fd0', d_luck: '+20% \u7ecf\u9a8c',
        u_overclock: '\u8d85\u9891', d_overclock: '-1\u79d2\u51b2\u523a\u51b7\u5374',
        rateUs: '\u2B50 \u8bc4\u5206', privacy: '\u9690\u79c1\u653f\u7b56',
        bossWarning: '\u26A0 BOSS \u6765\u88ad \u26A0',
        shop: '\u5546\u5e97', shop_hp_desc: '\u589e\u52a0\u521d\u59cb\u751f\u547d\u3002',
        shop_dmg_desc: '\u589e\u52a0\u57fa\u7840\u4f24\u5bb3\u3002', shop_spd_desc: '\u589e\u52a0\u57fa\u7840\u901f\u5ea6\u3002',
        shop_greed: '\u8d2a\u5a6a', shop_greed_desc: '\u589e\u52a0\u91d1\u5e01\u638c\u843d\u7387\u3002',
        close: '\u5173\u95ed', notEnoughCoins: '\u91d1\u5e01\u4e0d\u8db3\uff01', dashReady: '\u51b2\u523a\u51c6\u5907',
    },
    jp: {
        startBg: '\u30b2\u30fc\u30e0\u958b\u59cb', highScores: '\u30cf\u30a4\u30b9\u30b3\u30a2', tapToPlay: '\u30bf\u30c3\u30d7\u3057\u3066\u30d7\u30ec\u30a4',
        hp: 'HP', xp: '\u7d4c\u9a13\u5024', score: '\u30b9\u30b3\u30a2', stats: '\u30b9\u30c6\u30fc\u30bf\u30b9',
        dmg: '\u653b\u6483\u529b', spd: '\u901f\u5ea6', rof: '\u9023\u5c04', blt: '\u5f3e\u901f',
        multi: '\u30de\u30eb\u30c1', mag: '\u78c1\u77f3', prc: '\u8cab\u901a', allies: '\u5473\u65b9',
        kills: '\u30ad\u30eb', aura: '\u30aa\u30fc\u30e9', vamp: '\u5438\u8840', dash: '\u30c0\u30c3\u30b7\u30e5',
        levelUp: '\u30ec\u30d9\u30eb\u30a2\u30c3\u30d7\uff01', chooseUpgrade: '\u30a2\u30c3\u30d7\u30b0\u30ec\u30fc\u30c9\u3092\u9078\u629e',
        paused: '\u4e00\u6642\u505c\u6b62', volume: '\u97f3\u91cf',
        resume: '\u518d\u958b', mainMenu: '\u30e1\u30a4\u30f3\u30e1\u30cb\u30e5\u30fc',
        gameOver: '\u30b2\u30fc\u30e0\u30aa\u30fc\u30d0\u30fc', survived: '\u751f\u5b58\u6642\u9593',
        finalScore: '\u30b9\u30b3\u30a2', tryAgain: '\u30ea\u30c8\u30e9\u30a4',
        u_rapidFire: '\u30e9\u30d4\u30c3\u30c9\u30d5\u30a1\u30a4\u30a2', d_rapidFire: '+20% \u9023\u5c04\u901f\u5ea6',
        u_highCaliber: '\u30cf\u30a4\u30ad\u30e3\u30ea\u30d0\u30fc', d_highCaliber: '+10 \u30c0\u30e1\u30fc\u30b8',
        u_swiftness: '\u8fc5\u901f', d_swiftness: '+15% \u79fb\u52d5\u901f\u5ea6',
        u_velocity: '\u9ad8\u901f\u5f3e', d_velocity: '+25% \u5f3e\u901f',
        u_doubleShot: '\u30c0\u30d6\u30eb\u30b7\u30e7\u30c3\u30c8', d_doubleShot: '+1 \u767a\u5c04\u6570',
        u_magnet: '\u30de\u30b0\u30cd\u30c3\u30c8', d_magnet: '+50% \u53ce\u96c6\u7bc4\u56f2',
        u_piercing: '\u30d4\u30a2\u30c3\u30b7\u30f3\u30b0', d_piercing: '\u8cab\u901a +1 \u654c',
        u_regen: '\u518d\u751f', d_regen: '+2 HP/\u79d2',
        u_heal: '\u7dca\u6025\u56de\u5fa9', d_heal: '50% HP\u56de\u5fa9',
        u_shield: '\u30d5\u30a9\u30fc\u30b9\u30b7\u30fc\u30eb\u30c9', d_shield: '+50 \u30b7\u30fc\u30eb\u30c9',
        u_maxHp: '\u5f37\u5316', d_maxHp: '+25 \u6700\u5927HP',
        u_vampirism: '\u5438\u8840\u9b3c', d_vampirism: '+1 HP/\u30ad\u30eb',
        u_aura: '\u30c0\u30e1\u30fc\u30b8\u30aa\u30fc\u30e9', d_aura: '\u8fd1\u304f\u306e\u654c\u306b 15 DPS',
        u_luck: '\u5e78\u904b', d_luck: '+20% \u7d4c\u9a13\u5024',
        u_overclock: '\u30aa\u30fc\u30d0\u30fc\u30af\u30ed\u30c3\u30af', d_overclock: '-1\u79d2\u30c0\u30c3\u30b7\u30e5CD',
        rateUs: '\u2B50 \u8a55\u4fa1', privacy: '\u30d7\u30e9\u30a4\u30d0\u30b7\u30fc',
        bossWarning: '\u26A0 BOSS \u6765\u8972 \u26A0',
        shop: '\u30b7\u30e7\u30c3\u30d7', shop_hp_desc: '\u958b\u59cbHP\u3092\u5897\u52a0\u3002',
        shop_dmg_desc: '\u57fa\u672c\u30c0\u30e1\u30fc\u30b8\u3092\u5897\u52a0\u3002', shop_spd_desc: '\u57fa\u672c\u901f\u5ea6\u3092\u5897\u52a0\u3002',
        shop_greed: '\u5f37\u6b32', shop_greed_desc: '\u30b3\u30a4\u30f3\u306e\u30c9\u30ed\u30c3\u30d7\u7387\u3092\u5897\u52a0\u3002',
        close: '\u9589\u3058\u308b', notEnoughCoins: '\u30b3\u30a4\u30f3\u304c\u8db3\u308a\u306a\u3044\uff01', dashReady: '\u30c0\u30c3\u30b7\u30e5\u6e96\u5099\u5b8c\u4e86',
    },
};

/* =============================================================
   2. CONFIG — All game constants in one place
   ============================================================= */
const CONFIG = {
    WORLD_WIDTH:         3000,
    WORLD_HEIGHT:        3000,
    ZOOM:                0.6,

    PLAYER_SPEED:        5,
    PLAYER_BASE_HP:      150,
    PROJECTILE_SPEED:    12,

    ENEMY_SPAWN_RATE_MS: 1050,
    ENEMY_BASE_SPEED:    2,

    BOX_SPAWN_CHANCE:    0.003,  // per-frame probability of spawning a mystery box

    VOLUME:              0.3,

    THEMES: {
        'Neon Void': {
            BG: '#050510',
            GRID: 'rgba(0,243,255,0.1)',
            BORDER: 'rgba(255, 0, 0, 0.5)',
            PLAYER: '#00f3ff',
            ENEMY: '#ff3333',
            ALLY: '#00ff66',
            PROJECTILE: '#ff00ff',
            XP: '#00ff66',
            BOX: '#ffd700',
            COIN: '#ffcc00'
        },
        'Blood & Gore': {
            BG: '#1a0505',
            GRID: 'rgba(255,0,0,0.15)',
            BORDER: 'rgba(255,0,0,0.8)',
            PLAYER: '#ff4444',
            ENEMY: '#880000',
            ALLY: '#ffaaaa',
            PROJECTILE: '#ff0000',
            XP: '#ff3333',
            BOX: '#ffaa00',
            COIN: '#ffdd00'
        },
        'Garden': {
            BG: '#0a1f0a',
            GRID: 'rgba(0,255,100,0.1)',
            BORDER: 'rgba(0,255,0,0.5)',
            PLAYER: '#00ff66',
            ENEMY: '#ff00ff',
            ALLY: '#00ffff',
            PROJECTILE: '#ffff00',
            XP: '#00ff00',
            BOX: '#ff00ff',
            COIN: '#ffff00'
        },
        'Toxic': {
            BG: '#0f1a0f',
            GRID: 'rgba(173,255,47,0.15)',
            BORDER: 'rgba(173,255,47,0.5)',
            PLAYER: '#adff2f',
            ENEMY: '#8b008b',
            ALLY: '#00ffcc',
            PROJECTILE: '#32cd32',
            XP: '#7fff00',
            BOX: '#ff00ff',
            COIN: '#adff2f'
        },
        'Ice': {
            BG: '#05101a',
            GRID: 'rgba(0,191,255,0.15)',
            BORDER: 'rgba(0,191,255,0.5)',
            PLAYER: '#00bfff',
            ENEMY: '#4169e1',
            ALLY: '#87ceeb',
            PROJECTILE: '#e0ffff',
            XP: '#00ffff',
            BOX: '#add8e6',
            COIN: '#f0f8ff'
        },
        'Crimson Night': {
            BG: '#100510',
            GRID: 'rgba(255,0,255,0.1)',
            BORDER: 'rgba(138,43,226,0.5)',
            PLAYER: '#da70d6',
            ENEMY: '#dc143c',
            ALLY: '#ff69b4',
            PROJECTILE: '#8a2be2',
            XP: '#ff1493',
            BOX: '#ba55d3',
            COIN: '#dda0dd'
        }
    },
    COLORS: {
        BG:         '#050510',
        GRID:       'rgba(0,243,255,0.1)',
        BORDER:     'rgba(255, 0, 0, 0.5)',
        PLAYER:     '#00f3ff',
        ENEMY:      '#ff3333',
        ALLY:       '#00ff66',
        PROJECTILE: '#ff00ff',
        XP:         '#00ff66',
        BOX:        '#ffd700',
        COIN:       '#ffcc00'
    }
};

/* =============================================================
   3. DOM CACHE — Element references grabbed once at startup
   ============================================================= */
const canvas = document.getElementById('gameCanvas');
const ctx    = canvas.getContext('2d');

const ui = {
    menu:           document.getElementById('mainMenu'),
    hud:            document.getElementById('hud'),
    gameOver:       document.getElementById('gameOverScreen'),
    levelUp:        document.getElementById('upgradeModal'),
    pauseMenu:      document.getElementById('pauseMenu'),
    score:          document.getElementById('scoreValue'),
    scoreLabel:     document.getElementById('scoreLabel'),
    timer:          document.getElementById('timerValue'),
    healthBar:      document.getElementById('healthBar'),
    xpBar:          document.getElementById('xpBar'),
    level:          document.getElementById('levelIndicator'),
    finalScore:     document.getElementById('finalScore'),
    finalTime:      document.getElementById('finalTime'),
    upgradeOptions: document.getElementById('upgradeOptions'),
    scoreList:      document.getElementById('scoreList'),
    volumeSlider:   document.getElementById('volumeSlider'),
    langSelect:     document.getElementById('langSelect'),
    btns: {
        start:        document.getElementById('startBtn'),
        retry:        document.getElementById('retryBtn'),
        resume:       document.getElementById('resumeBtn'),
        quit:         document.getElementById('quitBtn'),
        menuGameOver: document.getElementById('menuBtn'),
    },
    stats: {
        dmg:    document.getElementById('statDamage'),
        spd:    document.getElementById('statSpeed'),
        rof:    document.getElementById('statFireRate'),
        blt:    document.getElementById('statBulletSpeed'),
        multi:  document.getElementById('statMultishot'),
        mag:    document.getElementById('statMagnet'),
        prc:    document.getElementById('statPierce'),
        allies: document.getElementById('statAllies'),
        aura:   document.getElementById('statAura'),
        vamp:   document.getElementById('statVamp'),
    },
    theme: {
        main: document.getElementById('mainThemeSelect'),
        pause: document.getElementById('pauseThemeSelect')
    }
};

/* =============================================================
   4. SOUND MANAGER — Synthesized sounds via Web Audio API
   ============================================================= */
class SoundManager {
    constructor() {
        this.ctx         = new (window.AudioContext || window.webkitAudioContext)();
        this.masterGain  = this.ctx.createGain();
        this.masterGain.connect(this.ctx.destination);
        this.setVolume(CONFIG.VOLUME);
        this.initialized = false;
    }

    /** Must be called after a user gesture to unlock the audio context. */
    init() {
        if (!this.initialized) {
            this.ctx.resume().then(() => { this.initialized = true; });
        }
    }

    setVolume(val) {
        this.masterGain.gain.setValueAtTime(val, this.ctx.currentTime);
    }

    // --- Private helper ---
    _playOsc(type, freqStart, freqEnd, duration, gainStart = 0.3) {
        if (this.ctx.state === 'suspended') return;
        const osc  = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const now  = this.ctx.currentTime;

        osc.type = type;
        osc.frequency.setValueAtTime(freqStart, now);
        if (freqEnd !== null) osc.frequency.exponentialRampToValueAtTime(freqEnd, now + duration);
        gain.gain.setValueAtTime(gainStart, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + duration);

        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(now);
        osc.stop(now + duration);
    }

    // --- Public sounds ---
    playShoot()   { this._playOsc('triangle', 800, 100, 0.1, 0.3); }
    playHit()     { this._playOsc('sawtooth', 150,  50, 0.1, 0.3); }
    playCollect() { this._playOsc('sine',    1200, 2000, 0.1, 0.2); }
    playDash()    { this._playOsc('sine',     400, 1200, 0.15, 0.2); }

    playExplosion() {
        if (this.ctx.state === 'suspended') return;
        const sr      = this.ctx.sampleRate;
        const size    = Math.floor(sr * 0.5);
        const buffer  = this.ctx.createBuffer(1, size, sr);
        const data    = buffer.getChannelData(0);
        for (let i = 0; i < size; i++) data[i] = Math.random() * 2 - 1;

        const noise  = this.ctx.createBufferSource();
        const filter = this.ctx.createBiquadFilter();
        const gain   = this.ctx.createGain();
        const now    = this.ctx.currentTime;

        noise.buffer         = buffer;
        filter.type          = 'lowpass';
        filter.frequency.setValueAtTime(1000, now);
        filter.frequency.linearRampToValueAtTime(100, now + 0.5);
        gain.gain.setValueAtTime(0.5, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);
        noise.start();
    }

    playLevelUp() {
        if (this.ctx.state === 'suspended') return;
        const now   = this.ctx.currentTime;
        const notes = [440, 554, 659, 880];
        notes.forEach((freq, i) => {
            const osc  = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type           = 'square';
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0.1, now + i * 0.1);
            gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.1 + 0.2);
            osc.connect(gain);
            gain.connect(this.masterGain);
            osc.start(now + i * 0.1);
            osc.stop(now + i * 0.1 + 0.2);
        });
    }
}

/* =============================================================
   5. LANGUAGE MANAGER
   ============================================================= */
class LanguageManager {
    constructor() {
        this.currentLang = localStorage.getItem('neonVoidLang') || 'en';
        const select = document.getElementById('langSelect');
        if (select) select.value = this.currentLang;
        this.updateDOM();
    }

    setLanguage(lang) {
        if (!TRANSLATIONS[lang]) return;
        this.currentLang = lang;
        localStorage.setItem('neonVoidLang', lang);
        this.updateDOM();
    }

    getText(key) {
        return (TRANSLATIONS[this.currentLang]?.[key]) ?? (TRANSLATIONS['en'][key]) ?? key;
    }

    /** Refreshes all elements that have a data-lang attribute. */
    updateDOM() {
        document.querySelectorAll('[data-lang]').forEach(el => {
            const key = el.getAttribute('data-lang');
            if (key) el.innerText = this.getText(key);
        });
    }
}

/* =============================================================
   6. GAME STATE — All mutable runtime variables
   ============================================================= */
let gameState = {
    status:          'MENU',  // 'MENU'|'COUNTDOWN'|'PLAYING'|'PAUSED'|'LEVEL_UP'|'GAME_OVER'
    score:           0,
    kills:           0,
    wave:            1,
    timeElapsed:     0,       // ms elapsed in the current run
    comboCount:      0,
    comboTimer:      0,       // ms remaining before combo resets
    screenShake:     0,
    hitPauseTimer:   0,       // ms of intentional freeze on boss kill
    runCoins:        0,       // coins earned during this run
    enemySlowFactor: 1.0,     // global multiplier on enemy speed (1 = normal)
    _lastFrameTime:  0,
    difficulty:      'medium',
    // Input
    keys:  {},
    mouse: { x: 0, y: 0, down: false },
    touch: { active: false, startX: 0, startY: 0, currX: 0, currY: 0 },
};

/* =============================================================
   7. META PROGRESSION — Persists across runs via localStorage
   ============================================================= */
let metaStats = JSON.parse(localStorage.getItem('neonVoidMeta') || '{"hp":0,"dmg":0,"spd":0,"coin":0}');
let coins     = parseInt(localStorage.getItem('neonVoidCoins') || '0');

let charConfig = JSON.parse(
    localStorage.getItem('neonVoidChar') ||
    JSON.stringify({ gender: 'male', hair: 'short', hairColor: '#1a1a1a', suitColor: '#00f3ff' })
);

function saveCharConfig() {
    localStorage.setItem('neonVoidChar', JSON.stringify(charConfig));
}

function saveMeta() {
    localStorage.setItem('neonVoidMeta', JSON.stringify(metaStats));
    localStorage.setItem('neonVoidCoins', coins.toString());
    updateMenuCoinUI();
}

function updateMenuCoinUI() {
    const menuCoin = document.getElementById('menuCoinCount');
    const shopCoin = document.getElementById('shopCoinCount');
    const hudCoin  = document.getElementById('hudCoinCount');
    if (menuCoin) menuCoin.innerText = coins;
    if (shopCoin) shopCoin.innerText = coins;
    if (hudCoin)  hudCoin.innerText  = gameState.runCoins;
}

/* =============================================================
   8. CAMERA — Follows player, clamped to world bounds
   ============================================================= */
const camera = {
    x: 0, y: 0,
    cameraWidth: 0, cameraHeight: 0,

    update() {
        const viewW = canvas.width  / CONFIG.ZOOM;
        const viewH = canvas.height / CONFIG.ZOOM;
        this.cameraWidth  = viewW;
        this.cameraHeight = viewH;
        this.x = Math.max(0, Math.min(player.x - viewW / 2, CONFIG.WORLD_WIDTH  - viewW));
        this.y = Math.max(0, Math.min(player.y - viewH / 2, CONFIG.WORLD_HEIGHT - viewH));
    }
};

/* =============================================================
   9. ENTITY CLASSES
   ============================================================= */

// ─── PLAYER ──────────────────────────────────────────────────
class Player {
    constructor() {
        this.x = CONFIG.WORLD_WIDTH  / 2;
        this.y = CONFIG.WORLD_HEIGHT / 2;
        this.radius = 15;

        // Movement
        this.baseSpeed       = CONFIG.PLAYER_SPEED + (metaStats.spd * 0.5);
        this.speedMultiplier = 1.0;

        // Health
        this.maxHealth = CONFIG.PLAYER_BASE_HP + (metaStats.hp * 25);
        this.health    = this.maxHealth;
        this.shield    = 0;
        this.maxShield = 0;

        // XP
        this.level         = 1;
        this.xp            = 0;
        this.xpToNextLevel = 100;
        this.xpMultiplier  = 1.0;
        this.xpBoostTimer  = 0;
        this.luckBonus     = 0;   // additive multiplier from Fortune upgrade

        // Combat
        this.baseDamage                = 25 + (metaStats.dmg * 5);
        this.damageMultiplier          = 1.0;
        this.baseFireRate              = 500;  // ms between shots
        this.fireRateMultiplier        = 1.0;
        this.lastShotTime              = 0;
        this.projectileSpeedMultiplier = 1.0;
        this.multishotLevel            = 0;
        this.piercingLevel             = 0;

        // Utility
        this.magnetMultiplier = 1.0;
        this.regenRate        = 0;   // HP healed per second
        this.regenTimer       = 0;

        // Vampirism — HP healed per kill
        this.vampireHeal = 0;

        // Damage Aura — passive area damage
        this.auraRange  = 0;   // world-units; 0 = inactive
        this.auraDamage = 0;   // DPS applied every second
        this._auraTimer = 0;

        // Dash ability
        this.dashCooldownMax = 4000;  // ms total cooldown
        this.dashTimer       = 4000;  // starts fully charged
        this.isDashing       = false;
        this._dashDuration   = 0;
        this.DASH_DURATION   = 300;  // ms of active dash

        // Animation helpers
        this._lastDx = 0;
        this._lastDy = 0;
    }

    // Computed getters — derive values from base + multipliers
    get speed()           { return this.baseSpeed * this.speedMultiplier * (this.isDashing ? 3.0 : 1.0); }
    get fireRate()        { return this.baseFireRate / this.fireRateMultiplier; }
    get damage()          { return this.baseDamage  * this.damageMultiplier; }
    get projectileSpeed() { return CONFIG.PROJECTILE_SPEED * this.projectileSpeedMultiplier; }
    get magnetRange()     { return 100 + (this.magnetMultiplier * 100); }
    get dashReady()       { return this.dashTimer >= this.dashCooldownMax; }
    get dashPercent()     { return Math.min(1, this.dashTimer / this.dashCooldownMax); }

    update(dt) {
        this._tickXpBoost(dt);
        this._tickRegen(dt);
        this._tickDash(dt);
        this._tickAura(dt);
        this._movePlayer();
        this._tryShoot();
    }

    _tickXpBoost(dt) {
        if (this.xpBoostTimer <= 0) return;
        this.xpBoostTimer -= dt;
        if (this.xpBoostTimer <= 0) {
            this.xpMultiplier = 1.0;
            this.xpBoostTimer = 0;
        }
    }

    _tickRegen(dt) {
        if (this.regenRate <= 0) return;
        this.regenTimer += dt;
        if (this.regenTimer >= 1000) {
            this.health     = Math.min(this.maxHealth, this.health + this.regenRate);
            this.regenTimer = 0;
            updateHUD();
        }
    }

    _tickDash(dt) {
        // Recharge cooldown
        if (!this.dashReady) {
            this.dashTimer = Math.min(this.dashCooldownMax, this.dashTimer + dt);
        }
        // Count down active dash
        if (this.isDashing) {
            this._dashDuration -= dt;
            if (this._dashDuration <= 0) {
                this.isDashing = false;
                createExplosion(this.x, this.y, CONFIG.COLORS.PLAYER, 6);
            }
        }
        updateDashUI();
    }

    _tickAura(dt) {
        if (this.auraRange <= 0 || this.auraDamage <= 0) return;
        this._auraTimer += dt;
        if (this._auraTimer < 1000) return;
        this._auraTimer -= 1000;

        // Apply aura damage to all enemies within range
        for (let i = enemies.length - 1; i >= 0; i--) {
            const enemy = enemies[i];
            if (Math.hypot(enemy.x - this.x, enemy.y - this.y) <= this.auraRange) {
                enemy.hp -= this.auraDamage;
                createExplosion(enemy.x, enemy.y, CONFIG.COLORS.PLAYER, 2);
                if (enemy.hp <= 0) killEnemy(i, enemy);
            }
        }
    }

    _movePlayer() {
        let dx = 0;
        let dy = 0;

        // Keyboard input
        if (keys['w'] || keys['arrowup'])    dy = -1;
        if (keys['s'] || keys['arrowdown'])  dy =  1;
        if (keys['a'] || keys['arrowleft'])  dx = -1;
        if (keys['d'] || keys['arrowright']) dx =  1;

        // Touch joystick overrides keyboard
        if (gameState.touch.active) {
            const tdx  = gameState.touch.currX - gameState.touch.startX;
            const tdy  = gameState.touch.currY - gameState.touch.startY;
            const dist = Math.sqrt(tdx * tdx + tdy * tdy);
            if (dist > 10) { dx = tdx / dist; dy = tdy / dist; }
        }

        if (dx !== 0 || dy !== 0) {
            // Normalize diagonal keyboard movement to prevent faster diagonal speed
            if (!gameState.touch.active && Math.abs(dx) + Math.abs(dy) > 1) {
                const factor = 1 / Math.sqrt(2);
                dx *= factor;
                dy *= factor;
            }
            this.x = Math.max(this.radius, Math.min(CONFIG.WORLD_WIDTH  - this.radius, this.x + dx * this.speed));
            this.y = Math.max(this.radius, Math.min(CONFIG.WORLD_HEIGHT - this.radius, this.y + dy * this.speed));
        }
        this._lastDx = dx;
        this._lastDy = dy;
    }

    _tryShoot() {
        const now = Date.now();
        if (now - this.lastShotTime < this.fireRate) return;

        let nearest = null;
        let minDist  = Infinity;
        for (const enemy of enemies) {
            const d = Math.hypot(enemy.x - this.x, enemy.y - this.y);
            if (d < minDist) { minDist = d; nearest = enemy; }
        }

        if (nearest && minDist < 800) {
            this._shoot(nearest);
            this.lastShotTime = now;
        }
    }

    _shoot(target) {
        const angle  = Math.atan2(target.y - this.y, target.x - this.x);
        const count  = 1 + this.multishotLevel;
        const spread = 0.1;

        audio.playShoot();

        if (count === 1) {
            projectiles.push(new Projectile(this.x, this.y, angle, this.projectileSpeed, this.piercingLevel));
        } else {
            const startAngle = angle - (spread * (count - 1)) / 2;
            for (let i = 0; i < count; i++) {
                projectiles.push(new Projectile(
                    this.x, this.y,
                    startAngle + i * spread,
                    this.projectileSpeed,
                    this.piercingLevel
                ));
            }
        }
    }

    attemptDash() {
        if (!this.dashReady || this.isDashing) return;
        this.dashTimer     = 0;
        this.isDashing     = true;
        this._dashDuration = this.DASH_DURATION;
        audio.playDash();
        createExplosion(this.x, this.y, CONFIG.COLORS.PLAYER, 12);
    }

    takeDamage(amount) {
        if (this.isDashing) return;  // Invincible during dash

        // Shield absorbs damage first
        if (this.shield > 0) {
            const absorbed = Math.min(this.shield, amount);
            this.shield -= absorbed;
            amount      -= absorbed;
        }

        if (amount > 0) {
            this.health -= amount;
            triggerHaptic('Heavy');
            audio.playHit();
            triggerDamageFlash();
            if (this.health <= 0) {
                this.health = 0;
                gameOver();
            }
        }
        updateHUD();
    }

    gainXp(amount) {
        const total = Math.round(amount * this.xpMultiplier * (1 + this.luckBonus));
        this.xp += total;
        createPickupBurst(coin.x, coin.y, CONFIG.COLORS.COIN);
        audio.playCollect();
        if (this.xp >= this.xpToNextLevel) this.levelUp();
        updateHUD();
    }

    levelUp() {
        this.level++;
        this.xp           -= this.xpToNextLevel;
        this.xpToNextLevel = Math.floor(this.xpToNextLevel * 1.2);
        audio.playLevelUp();
        triggerLevelUp();
    }

    /** Called after every confirmed kill. Applies vampirism if active. */
    onKill() {
        if (this.vampireHeal > 0) {
            this.health = Math.min(this.maxHealth, this.health + this.vampireHeal);
            updateHUD();
        }
    }

    draw() {
        const t        = Date.now() / 1000;
        const walking  = (Math.abs(this._lastDx) + Math.abs(this._lastDy)) > 0.1;
        const speedFactor = this.speed / CONFIG.PLAYER_SPEED;
        const animSpeed = t * 12 * speedFactor;
        const legSwing = walking ? Math.sin(animSpeed) * 8 : 0;
        const armSwing = walking ? Math.sin(animSpeed + Math.PI) * 7 : 0;
        const bodyBob  = walking ? Math.abs(Math.sin(animSpeed)) * 3 : 0;
        const suit     = charConfig.suitColor || '#00f3ff';
        const hairCol  = charConfig.hairColor || '#1a1a1a';
        const isFemale = charConfig.gender === 'female';

        // Optional running dust
        if (walking && Math.random() < 0.2) {
            particles.push(new Particle(this.x, this.y + 10, 'rgba(255,255,255,0.3)'));
        }

        ctx.save();
        ctx.translate(this.x, this.y);

        if (this.isDashing) {
            ctx.globalAlpha = 0.65;
            ctx.shadowBlur  = 30;
            ctx.shadowColor = suit;
        }

        // Animated Aura ring
        if (this.auraRange > 0) {
            ctx.save();
            ctx.strokeStyle = suit;
            ctx.globalAlpha = 0.4 + Math.sin(t * 3) * 0.2;
            ctx.lineWidth = 2 + Math.sin(t * 5) * 1;
            ctx.setLineDash([10, 15]);
            ctx.lineDashOffset = -t * 30;
            ctx.beginPath();
            ctx.arc(0, 0, this.auraRange, 0, Math.PI * 2);
            ctx.stroke();
            ctx.globalAlpha = 0.1;
            ctx.setLineDash([]);
            ctx.fillStyle = suit;
            ctx.beginPath();
            ctx.arc(0, 0, this.auraRange, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }

        ctx.shadowBlur  = 18;
        ctx.shadowColor = suit;

        // Legs (stay planted, don't bob)
        ctx.strokeStyle = suit;
        ctx.lineWidth   = 4;
        ctx.lineCap     = 'round';
        ctx.beginPath(); ctx.moveTo(-4, 8 - bodyBob); ctx.lineTo(-6 + legSwing,  18); ctx.stroke();
        ctx.beginPath(); ctx.moveTo( 4, 8 - bodyBob); ctx.lineTo( 6 - legSwing,  18); ctx.stroke();

        ctx.translate(0, -bodyBob); // Bob the upper body up and down

        // Body
        ctx.shadowBlur = 12;
        ctx.fillStyle  = suit;
        if (isFemale) {
            ctx.beginPath();
            ctx.moveTo(-7,-2); ctx.lineTo(-9,4); ctx.lineTo(-5,9);
            ctx.lineTo( 5, 9); ctx.lineTo( 9,4); ctx.lineTo( 7,-2);
            ctx.closePath(); ctx.fill();
        } else {
            ctx.beginPath(); ctx.rect(-8, -2, 16, 11); ctx.fill();
        }

        // Arms
        ctx.strokeStyle = suit;
        ctx.lineWidth   = 3.5;
        ctx.beginPath(); ctx.moveTo(-8, 1); ctx.lineTo(-13 - armSwing, 7); ctx.stroke();
        ctx.beginPath(); ctx.moveTo( 8, 1); ctx.lineTo( 13 + armSwing, 7); ctx.stroke();

        // Head
        ctx.shadowBlur  = 10;
        ctx.shadowColor = suit;
        ctx.fillStyle   = '#f5c5a0';
        ctx.beginPath(); ctx.arc(0, -8, 7, 0, Math.PI * 2); ctx.fill();

        // Eyes
        ctx.fillStyle = '#000';
        ctx.beginPath(); ctx.arc(-2.5, -9, 1.2, 0, Math.PI * 2);
        ctx.arc( 2.5, -9, 1.2, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.beginPath(); ctx.arc(-2, -9.5, 0.5, 0, Math.PI * 2);
        ctx.arc( 3, -9.5, 0.5, 0, Math.PI * 2); ctx.fill();

        // Hair
        ctx.fillStyle   = hairCol;
        ctx.shadowColor = hairCol;
        ctx.shadowBlur  = 6;
        this._drawHair(ctx, charConfig.hair || 'short', isFemale, suit);

        ctx.globalAlpha = 1.0;
        ctx.restore();
    }

    _drawHair(c, style, isFemale, suit) {
        if (style === 'short') {
            c.beginPath(); c.arc(0, -10, 7, Math.PI, 0); c.fill();
            if (isFemale) {
                c.beginPath(); c.arc(-7, -8, 3, 0, Math.PI); c.fill();
                c.beginPath(); c.arc( 7, -8, 3, 0, Math.PI); c.fill();
            }
        } else if (style === 'long') {
            c.beginPath(); c.arc(0, -10, 7.5, Math.PI, 0); c.fill();
            c.beginPath();
            c.moveTo(-7,-8); c.quadraticCurveTo(-10,0,-8,12); c.lineTo(-5,12); c.quadraticCurveTo(-7,0,-4,-8); c.fill();
            c.beginPath();
            c.moveTo( 7,-8); c.quadraticCurveTo( 10,0, 8,12); c.lineTo( 5,12); c.quadraticCurveTo( 7,0, 4,-8); c.fill();
        } else if (style === 'spiky') {
            c.beginPath(); c.arc(0, -10, 7, Math.PI, 0); c.fill();
            const spikes = isFemale ? 5 : 6;
            for (let i = 0; i < spikes; i++) {
                const a = Math.PI + (i / (spikes - 1)) * Math.PI;
                c.beginPath();
                c.moveTo(Math.cos(a-0.2)*7,  -10+Math.sin(a-0.2)*7);
                c.lineTo(Math.cos(a)*16,      -10+Math.sin(a)*16);
                c.lineTo(Math.cos(a+0.2)*7,  -10+Math.sin(a+0.2)*7);
                c.fill();
            }
        } else if (style === 'bun') {
            c.beginPath(); c.arc(0,-10, 7, Math.PI, 0); c.fill();
            c.beginPath(); c.arc(0,-18, 5, 0, Math.PI*2); c.fill();
            c.strokeStyle = suit; c.lineWidth = 1.5;
            c.beginPath(); c.arc(0,-18, 5, 0, Math.PI*2); c.stroke();
        }
    }
}

// ─── XP GEM ──────────────────────────────────────────────────
class XPGem {
    constructor(x, y, value) {
        this.x = x; this.y = y; this.value = value; this.radius = 5; this.active = true;
    }
    draw() {
        if (!isInView(this.x, this.y, 20)) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.fillStyle = ctx.shadowColor = CONFIG.COLORS.XP;
        ctx.shadowBlur = 5;
        ctx.beginPath();
        ctx.moveTo(0,-5); ctx.lineTo(5,0); ctx.lineTo(0,5); ctx.lineTo(-5,0);
        ctx.fill();
        ctx.restore();
    }
}

// ─── COIN PICKUP (NEW) ───────────────────────────────────────
class CoinPickup {
    constructor(x, y, amount) {
        this.x = x; this.y = y; this.amount = amount;
        this.radius = 6; this.active = true;
        this._spin = Math.random() * Math.PI * 2;
    }
    update(dt) { this._spin += 0.003 * dt; }
    draw() {
        if (!isInView(this.x, this.y, 20)) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this._spin);
        ctx.fillStyle = ctx.shadowColor = CONFIG.COLORS.COIN;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.ellipse(0, 0, this.radius, this.radius * 0.5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

// ─── ENEMY BASE ───────────────────────────────────────────────
class Enemy {
    constructor() {
        const edge   = Math.floor(Math.random() * 4);
        const margin = 50;
        const camW   = camera.cameraWidth  || canvas.width;
        const camH   = camera.cameraHeight || canvas.height;
        switch (edge) {
            case 0: this.x = camera.x + Math.random()*camW; this.y = camera.y - margin; break;
            case 1: this.x = camera.x + camW + margin;       this.y = camera.y + Math.random()*camH; break;
            case 2: this.x = camera.x + Math.random()*camW; this.y = camera.y + camH + margin; break;
            default:this.x = camera.x - margin;              this.y = camera.y + Math.random()*camH; break;
        }
        this.radius = 12;
        this.speed  = CONFIG.ENEMY_BASE_SPEED + (gameState.timeElapsed / 300000);
        this.hp     = 15 + (gameState.timeElapsed / 30000);
        this.damage = 10;   // contact damage dealt to player
        this.color  = CONFIG.COLORS.ENEMY;
        this.active = true;
        this.isBoss = false;
        this.hitFlashTimer = 0;
        this.contactDamageTimer = 0;
    }
    update(dt) {
        const angle = Math.atan2(player.y - this.y, player.x - this.x);
        const spd   = this.speed * gameState.enemySlowFactor;
        this.x += Math.cos(angle) * spd;
        this.y += Math.sin(angle) * spd;
    }
    draw() {
        if (!isInView(this.x, this.y, this.radius + 5)) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(Math.atan2(player.y - this.y, player.x - this.x));
        ctx.shadowBlur = 10; ctx.shadowColor = ctx.fillStyle = this.color;
        ctx.beginPath(); ctx.moveTo(10,0); ctx.lineTo(-7,7); ctx.lineTo(-7,-7); ctx.closePath(); ctx.fill();
        ctx.restore();
    }
}

// ─── FAST ENEMY ───────────────────────────────────────────────
class FastEnemy extends Enemy {
    constructor() {
        super();
        this.radius = 8;
        this.speed  = (CONFIG.ENEMY_BASE_SPEED + (gameState.timeElapsed / 300000)) * 1.8;
        this.hp     = 10 + (gameState.timeElapsed / 40000);
        this.damage = 8;
        this.color  = '#00ffcc';
    }
    draw() {
        if (!isInView(this.x, this.y, this.radius + 5)) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.shadowBlur = 8; ctx.shadowColor = ctx.fillStyle = this.color;
        ctx.beginPath(); ctx.arc(0, 0, this.radius, 0, Math.PI*2); ctx.fill();
        ctx.restore();
    }
}

// ─── TANK ENEMY ───────────────────────────────────────────────
class TankEnemy extends Enemy {
    constructor() {
        super();
        this.radius = 22;
        this.speed  = (CONFIG.ENEMY_BASE_SPEED + (gameState.timeElapsed / 300000)) * 0.6;
        this.hp     = 100 + (gameState.timeElapsed / 20000);
        this.maxHp  = this.hp;
        this.damage = 20;
        this.color  = '#cc00ff';
    }
    draw() {
        if (!isInView(this.x, this.y, this.radius + 5)) return;
        const s = this.radius;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.shadowBlur = 15; ctx.shadowColor = ctx.fillStyle = this.color;
        ctx.beginPath(); ctx.rect(-s*0.7, -s*0.7, s*1.4, s*1.4); ctx.fill();
        // HP bar
        ctx.fillStyle = 'rgba(0,0,0,0.5)'; ctx.fillRect(-s, -s-10, s*2, 6);
        ctx.fillStyle = this.color;         ctx.fillRect(-s, -s-10, s*2*(this.hp/this.maxHp), 6);
        ctx.restore();
    }
}

// ─── ZIGZAG ENEMY ────────────────────────────────────────────
class ZigzagEnemy extends Enemy {
    constructor() {
        super();
        this.radius    = 10;
        this.speed     = (CONFIG.ENEMY_BASE_SPEED + (gameState.timeElapsed / 300000)) * 1.2;
        this.hp        = 25 + (gameState.timeElapsed / 25000);
        this.damage    = 12;
        this.color     = '#ffee00';
        this._zigTimer = 0;
        this._zigDir   = 1;
    }
    update(dt) {
        // Fixed: use dt so zigzag speed is frame-rate independent
        this._zigTimer += dt;
        if (this._zigTimer > 400) { this._zigDir *= -1; this._zigTimer = 0; }
        const angle = Math.atan2(player.y - this.y, player.x - this.x);
        const perp  = angle + Math.PI / 2;
        const spd   = this.speed * gameState.enemySlowFactor;
        this.x += Math.cos(angle) * spd + Math.cos(perp) * this._zigDir * 1.5;
        this.y += Math.sin(angle) * spd + Math.sin(perp) * this._zigDir * 1.5;
    }
    draw() {
        if (!isInView(this.x, this.y, this.radius + 5)) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(Math.atan2(player.y - this.y, player.x - this.x));
        ctx.shadowBlur = 8; ctx.shadowColor = ctx.fillStyle = this.color;
        ctx.beginPath(); ctx.moveTo(10,0); ctx.lineTo(-6,8); ctx.lineTo(0,0); ctx.lineTo(-6,-8); ctx.closePath(); ctx.fill();
        ctx.restore();
    }
}

// ─── SNIPER ENEMY (NEW — wave 5+) ────────────────────────────
/**
 * Keeps a preferred distance from the player and fires slow projectiles.
 * Requires the player to dodge, adding variety to combat.
 */
class SniperEnemy extends Enemy {
    constructor() {
        super();
        this.radius          = 10;
        this.speed           = (CONFIG.ENEMY_BASE_SPEED + (gameState.timeElapsed / 300000)) * 0.5;
        this.hp              = 30  + (gameState.timeElapsed / 25000);
        this.damage          = 5;   // low contact damage — it prefers to shoot
        this.color           = '#ff44aa';
        this._shootTimer     = 0;
        this.SHOOT_INTERVAL  = 2500;  // ms between shots
        this.PREFERRED_DIST  = 350;   // world-units away from player
    }
    update(dt) {
        this._shootTimer += dt;
        const angle = Math.atan2(player.y - this.y, player.x - this.x);
        const dist  = Math.hypot(player.x - this.x, player.y - this.y);
        const spd   = this.speed * gameState.enemySlowFactor;

        if (dist < this.PREFERRED_DIST - 40) {
            // Too close — retreat
            this.x -= Math.cos(angle) * spd;
            this.y -= Math.sin(angle) * spd;
        } else if (dist > this.PREFERRED_DIST + 40) {
            // Too far — approach
            this.x += Math.cos(angle) * spd;
            this.y += Math.sin(angle) * spd;
        }
        // Optimal range — fire
        if (this._shootTimer >= this.SHOOT_INTERVAL) {
            this._shootTimer = 0;
            enemyBullets.push(new EnemyBullet(this.x, this.y, angle));
        }
    }
    draw() {
        if (!isInView(this.x, this.y, this.radius + 5)) return;
        const pulse = 0.8 + Math.sin(Date.now() / 250) * 0.2;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.globalAlpha = pulse;
        ctx.shadowBlur  = 12; ctx.shadowColor = this.color;
        ctx.strokeStyle = this.color; ctx.lineWidth = 2;
        // Crosshair shape
        ctx.beginPath(); ctx.arc(0,0,this.radius,0,Math.PI*2); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(-this.radius-4,0); ctx.lineTo(this.radius+4,0); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0,-this.radius-4); ctx.lineTo(0,this.radius+4); ctx.stroke();
        ctx.globalAlpha = 1.0;
        ctx.restore();
    }
}

// ─── EXPLODER ENEMY (NEW — wave 6+) ─────────────────────────
/**
 * Charges the player and explodes on contact, dealing area damage.
 * Can chain-damage nearby enemies — creates interesting risk/reward.
 */
class ExploderEnemy extends Enemy {
    constructor() {
        super();
        this.radius           = 14;
        this.speed            = (CONFIG.ENEMY_BASE_SPEED + (gameState.timeElapsed / 300000)) * 1.4;
        this.hp               = 20 + (gameState.timeElapsed / 30000);
        this.damage           = 0;   // No contact damage — relies on explosion
        this.color            = '#ff6600';
        this.EXPLOSION_RANGE  = 90;
        this.EXPLOSION_DAMAGE = 18;
        this._pulseTimer      = 0;
    }
    update(dt) {
        this._pulseTimer += dt;
        const angle = Math.atan2(player.y - this.y, player.x - this.x);
        const spd   = this.speed * gameState.enemySlowFactor;
        this.x += Math.cos(angle) * spd;
        this.y += Math.sin(angle) * spd;
    }
    /** Triggers explosion, dealing area damage to player and chain-damage to nearby enemies. */
    explode() {
        createExplosion(this.x, this.y, this.color, 20);
        createExplosion(enemy.x, enemy.y, enemy.color || CONFIG.COLORS.ENEMY, isBoss ? 32 : 16);
        createPickupBurst(enemy.x, enemy.y, CONFIG.COLORS.XP);
        audio.playExplosion();
        if (Math.hypot(player.x - this.x, player.y - this.y) < this.EXPLOSION_RANGE) {
            player.takeDamage(this.EXPLOSION_DAMAGE);
        }
        // Chain damage nearby enemies
        for (const e of enemies) {
            if (e === this) continue;
            if (Math.hypot(e.x - this.x, e.y - this.y) < this.EXPLOSION_RANGE) {
                e.hp -= 20;
            }
        }
    }
    draw() {
        if (!isInView(this.x, this.y, this.radius + 5)) return;
        const pulse = 0.7 + Math.sin(this._pulseTimer / 100) * 0.3;
        const r     = this.radius * pulse;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.shadowBlur = 20; ctx.shadowColor = ctx.fillStyle = this.color;
        ctx.beginPath(); ctx.arc(0,0,r,0,Math.PI*2); ctx.fill();
        ctx.fillStyle = '#330000';
        ctx.beginPath(); ctx.arc(0,0,r*0.45,0,Math.PI*2); ctx.fill();
        ctx.restore();
    }
}

// ─── ENEMY BULLET (used by SniperEnemy) ──────────────────────
class EnemyBullet {
    constructor(x, y, angle) {
        this.x = x; this.y = y;
        this.vx = Math.cos(angle) * 5;
        this.vy = Math.sin(angle) * 5;
        this.radius = 5; this.active = true; this.damage = 8;
    }
    update() {
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0 || this.x > CONFIG.WORLD_WIDTH || this.y < 0 || this.y > CONFIG.WORLD_HEIGHT) {
            this.active = false; return;
        }
        // Player collision (ignored during dash)
        if (!player.isDashing) {
            if (Math.hypot(player.x - this.x, player.y - this.y) < player.radius + this.radius) {
                player.takeDamage(this.damage);
                this.active = false;
            }
        }
    }
    draw() {
        if (!isInView(this.x, this.y, this.radius + 5)) return;
        ctx.save();
        ctx.fillStyle = ctx.shadowColor = '#ff44aa';
        ctx.shadowBlur = 8;
        ctx.beginPath(); ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2); ctx.fill();
        ctx.restore();
    }
}

// ─── ALLY ────────────────────────────────────────────────────
class Ally {
    constructor(x, y) {
        this.x = x; this.y = y;
        this.radius = 10; this.speed = CONFIG.ENEMY_BASE_SPEED * 1.5;
        this.hp = 50; this.damage = 50;
        this.color = CONFIG.COLORS.ALLY;
        this.active = true; this.target = null;
        this.isDead = false; this.deathTimer = 0;
    }
    update(dt) {
        if (this.isDead) { this.deathTimer += dt; return; }

        // Acquire closest active enemy as target
        if (!this.target?.active) {
            let minDist = Infinity; this.target = null;
            for (const e of enemies) {
                const d = Math.hypot(e.x - this.x, e.y - this.y);
                if (d < minDist) { minDist = d; this.target = e; }
            }
        }

        const goalX = this.target?.active ? this.target.x : player.x;
        const goalY = this.target?.active ? this.target.y : player.y;
        const angle = Math.atan2(goalY - this.y, goalX - this.x);
        this.x += Math.cos(angle) * this.speed;
        this.y += Math.sin(angle) * this.speed;
    }
    die() { this.isDead = true; this.color = '#555555'; }
    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        if (!this.isDead) { ctx.shadowBlur = 10; ctx.shadowColor = this.color; }
        ctx.fillStyle = this.isDead ? '#555555' : this.color;
        const aimTarget = this.target?.active ? this.target : player;
        ctx.rotate(Math.atan2(aimTarget.y - this.y, aimTarget.x - this.x));
        ctx.beginPath(); ctx.moveTo(8,0); ctx.lineTo(-6,6); ctx.lineTo(-6,-6); ctx.closePath(); ctx.fill();
        ctx.restore();
    }
}

// ─── MYSTERY BOX ─────────────────────────────────────────────
class MysteryBox {
    constructor() {
        this.x = Math.random() * (CONFIG.WORLD_WIDTH  - 40) + 20;
        this.y = Math.random() * (CONFIG.WORLD_HEIGHT - 40) + 20;
        this.radius = 15; this.active = true; this._pulse = 0;
    }
    // Fixed: state mutation separated from draw
    update(dt) { this._pulse += 0.005 * dt; }
    draw() {
        if (!isInView(this.x, this.y, 25)) return;
        const scale = 1 + Math.sin(this._pulse) * 0.2;
        ctx.save();
        ctx.translate(this.x, this.y); ctx.scale(scale, scale);
        ctx.shadowBlur = 20; ctx.shadowColor = ctx.fillStyle = CONFIG.COLORS.BOX;
        ctx.fillRect(-10, -10, 20, 20);
        ctx.fillStyle = 'rgba(0,0,0,0.7)';
        ctx.font = 'bold 14px monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText('?', 0, 0);
        ctx.restore();
    }
}

// ─── PLAYER PROJECTILE ───────────────────────────────────────
class Projectile {
    constructor(x, y, angle, speed, pierceCount = 0) {
        this.x = x; this.y = y;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.radius = 4; this.active = true;
        this.pierce = pierceCount;
        this.hitList = [];  // enemies already struck (for pierce)
    }
    update() {
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0 || this.x > CONFIG.WORLD_WIDTH || this.y < 0 || this.y > CONFIG.WORLD_HEIGHT) {
            this.active = false;
        }
    }
    draw() {
        if (!isInView(this.x, this.y, this.radius + 5)) return;
        ctx.save();
        ctx.fillStyle = ctx.shadowColor = CONFIG.COLORS.PROJECTILE;
        ctx.shadowBlur = 10;
        ctx.beginPath(); ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2); ctx.fill();
        ctx.restore();
    }
}

// ─── PARTICLE ────────────────────────────────────────────────
class Particle {
    constructor(x, y, color, speedMultiplier = 1) {
        this.x = x; this.y = y; this.color = color;
        const angle = Math.random() * Math.PI * 2;
        const speed = (Math.random() * 3 + 1) * speedMultiplier;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.life = 1.0; this.decay = 0.035 + Math.random() * 0.025;
        this.size = 1.5 + Math.random() * 2.5;
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.96;
        this.vy *= 0.96;
        this.life -= this.decay;
    }
    draw() {
        ctx.globalAlpha = this.life;
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 6;
        ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI*2); ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1.0;
    }
}

// ─── BOSS ────────────────────────────────────────────────────
class Boss extends Enemy {
    constructor() {
        super();
        this.radius = 30;
        this.speed  = CONFIG.ENEMY_BASE_SPEED * 0.7 + (gameState.timeElapsed / 400000);
        this.hp     = 300 + (gameState.timeElapsed / 10000);
        this.maxHp  = this.hp;
        this.damage = 30;
        this.color  = '#ff8800';
        this.isBoss = true;
    }
    draw() {
        if (!isInView(this.x, this.y, this.radius + 10)) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.shadowBlur = 30; ctx.shadowColor = ctx.fillStyle = this.color;
        // Diamond body
        ctx.beginPath();
        ctx.moveTo(0,-this.radius); ctx.lineTo(this.radius,0);
        ctx.lineTo(0,this.radius);  ctx.lineTo(-this.radius,0);
        ctx.closePath(); ctx.fill();
        // HP bar above boss
        const bw = this.radius * 3;
        ctx.fillStyle = 'rgba(0,0,0,0.6)'; ctx.fillRect(-bw/2, -this.radius-14, bw, 8);
        ctx.fillStyle = '#ff8800';          ctx.fillRect(-bw/2, -this.radius-14, bw*(this.hp/this.maxHp), 8);
        ctx.restore();
    }
}

/* =============================================================
   10. UTILITIES — Shared helper functions
   ============================================================= */

/** Returns true if the circle (x, y, radius) is within the camera viewport. */
function isInView(x, y, radius) {
    const camW = camera.cameraWidth  || canvas.width;
    const camH = camera.cameraHeight || canvas.height;
    return x + radius >= camera.x       &&
           x - radius <= camera.x + camW &&
           y + radius >= camera.y       &&
           y - radius <= camera.y + camH;
}

/** Spawns a burst of particles at a world position. */
function createExplosion(x, y, color, count = 8) {
    for (let i = 0; i < count; i++) particles.push(new Particle(x, y, color));
}

function createPickupBurst(x, y, color) {
    for (let i = 0; i < 10; i++) particles.push(new Particle(x, y, color, 1.8));
}

/** Spawns 3 ally units near (x, y). Called when a mystery box is opened. */
function spawnAllies(x, y) {
    for (let i = 0; i < 3; i++) {
        allies.push(new Ally(x + (Math.random()*40-20), y + (Math.random()*40-20)));
    }
}

/**
 * Central kill handler for all enemy deaths.
 * Handles scoring, XP, coin drops, vampirism, and combo tracking.
 */
function killEnemy(index, enemy) {
    const isBoss    = enemy.isBoss;
    const xpValue   = isBoss ? 200 : 20;
    const baseScore = isBoss ? 100 : 10;
    const comboMult = Math.min(gameState.comboCount, 5);

    xpGems.push(new XPGem(enemy.x, enemy.y, xpValue));

    // Coin drop — boss always drops, regular enemy has a base 5% chance
    const dropChance = (isBoss ? 1.0 : 0.05) + ((metaStats.coin || 0) * 0.02);
    if (Math.random() < dropChance) {
        const amount = isBoss ? 50 : (Math.floor(Math.random() * 3) + 1);
        coinPickups.push(new CoinPickup(
            enemy.x + (Math.random()*30-15),
            enemy.y + (Math.random()*30-15),
            amount
        ));
    }

    // Brief freeze on boss kill for dramatic impact
    if (isBoss) {
        gameState.hitPauseTimer = 50;
        canvas.classList.add('hit-pause');
    }

    audio.playExplosion();
    enemies.splice(index, 1);
    gameState.kills++;
    gameState.comboCount++;
    gameState.comboTimer  = 3000;
    gameState.score      += baseScore * comboMult;

    player.onKill();  // vampirism heal
}

class DamageText {
    constructor(x, y, text, color) {
        this.x = x; this.y = y; this.text = text; this.color = color;
        this.life = 1.0; this.vy = -1.5;
    }
    update() { this.y += this.vy; this.life -= 0.02; }
    draw() {
        if (!isInView(this.x, this.y, 20)) return;
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.life);
        ctx.fillStyle = this.color;
        ctx.font = 'bold 20px "Rajdhani", sans-serif';
        ctx.textAlign = 'center';
        ctx.shadowBlur = 4;
        ctx.shadowColor = this.color;
        ctx.fillText(this.text, this.x, this.y);
        ctx.restore();
    }
}

/** Shows a damage/status number floating above a world-space position. */
function spawnFloatingText(worldX, worldY, text, color = '#ffaa00') {
    damageTexts.push(new DamageText(worldX, worldY, text, color));
}

/** Triggers the red screen-edge damage flash overlay. */
function triggerDamageFlash() {
    gameState.screenShake = 8;
    const el = document.getElementById('damageFlash');
    if (!el) return;
    el.classList.add('flash');
    clearTimeout(el._ft);
    el._ft = setTimeout(() => el.classList.remove('flash'), 120);
}

/** Shows a styled in-game toast notification instead of alert(). */
function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerText = message;
    container.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('visible'));
    setTimeout(() => {
        toast.classList.remove('visible');
        setTimeout(() => { if (toast.parentNode) toast.remove(); }, 300);
    }, 2500);
}

/** Sends haptic feedback via Capacitor (silently fails on web). */
async function triggerHaptic(style = 'Light') {
    try {
        if (window.Capacitor?.Plugins?.Haptics) {
            await window.Capacitor.Plugins.Haptics.impact({ style });
        }
    } catch (_) { /* intentionally silent */ }
}

function resizeCanvas() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
}

/* =============================================================
   11. GAME SYSTEMS — Wave, combo, spawn, background, minimap
   ============================================================= */

function applyDifficultyScaling(enemy) {
    let hpMult = 1.0;
    let spdMult = 1.0;
    let dmgMult = 1.0;
    if (gameState.difficulty === 'easy') { hpMult = 0.7; spdMult = 0.85; dmgMult = 0.8; }
    else if (gameState.difficulty === 'hard') { hpMult = 1.4; spdMult = 1.15; dmgMult = 1.2; }
    else if (gameState.difficulty === 'impossible') { hpMult = 2.5; spdMult = 1.4; dmgMult = 1.5; }

    enemy.hp *= hpMult;
    if (enemy.maxHp) enemy.maxHp *= hpMult;
    enemy.speed *= spdMult;
    if (enemy.damage) enemy.damage *= dmgMult;
    return enemy;
}

/** Chooses an enemy type based on the current wave. */
function spawnEnemy() {
    const r = Math.random();
    const diff = gameState.difficulty;
    const allowHardEnemies = (diff === 'hard' || diff === 'impossible');

    let enemy;
    if (allowHardEnemies && gameState.wave >= 6 && r < 0.15) enemy = new ExploderEnemy();
    else if (allowHardEnemies && gameState.wave >= 5 && r < 0.30) enemy = new SniperEnemy();
    else if (gameState.wave >= 3 && r < 0.45) enemy = new TankEnemy();
    else if (gameState.wave >= 2 && r < 0.60) enemy = new FastEnemy();
    else if (gameState.wave >= 4 && r < 0.70) enemy = new ZigzagEnemy();
    else enemy = new Enemy();

    return applyDifficultyScaling(enemy);
}

/** Advances the wave counter and triggers boss spawns every 5 waves. */
function updateWaveSystem() {
    const newWave = Math.floor(gameState.timeElapsed / 30000) + 1;
    if (newWave <= gameState.wave) return;

    gameState.wave = newWave;
    document.getElementById('waveIndicator').innerText = 'WAVE ' + gameState.wave;
    showWaveAnnouncement(gameState.wave);

    if (gameState.wave % 5 === 0) {
        const bossWarn = document.getElementById('bossWarning');
        if (bossWarn) {
            bossWarn.classList.remove('hidden');
            setTimeout(() => bossWarn.classList.add('hidden'), 2500);
        }
        setTimeout(() => {
            if (gameState.status === 'PLAYING') enemies.push(applyDifficultyScaling(new Boss()));
        }, 2500);
    }
}

/**
 * Decays the combo timer.
 * Fixed: uses dt for frame-rate independence (was hardcoded 16ms before).
 */
function updateComboSystem(dt) {
    if (gameState.comboCount <= 0) return;
    gameState.comboTimer -= dt;
    if (gameState.comboTimer <= 0) {
        gameState.comboCount = 0;
        gameState.comboTimer = 0;
    }
}

/** Updates all entities for one frame. */
function updateAllEntities(dt) {
    player.update(dt);
    camera.update();

    // XP Gems — magnet pull and collection
    for (let i = xpGems.length - 1; i >= 0; i--) {
        const gem  = xpGems[i];
        const dist = Math.hypot(player.x - gem.x, player.y - gem.y);
        if (dist < player.magnetRange) {
            gem.x += (player.x - gem.x) * 0.1;
            gem.y += (player.y - gem.y) * 0.1;
        }
        if (dist < player.radius) {
            createPickupBurst(gem.x, gem.y, CONFIG.COLORS.XP);
            player.gainXp(gem.value);
            xpGems.splice(i, 1);
        }
    }

    // Coin pickups — magnet pull and collection
    for (let i = coinPickups.length - 1; i >= 0; i--) {
        const coin = coinPickups[i];
        coin.update(dt);
        const dist = Math.hypot(player.x - coin.x, player.y - coin.y);
        if (dist < player.magnetRange * 0.5) {
            coin.x += (player.x - coin.x) * 0.12;
            coin.y += (player.y - coin.y) * 0.12;
        }
        if (dist < player.radius + coin.radius) {
            coins += coin.amount;
            gameState.runCoins += coin.amount;
            updateMenuCoinUI();
            audio.playCollect();
            spawnFloatingText(coin.x, coin.y, `+${coin.amount}\uD83D\uDFE1`, CONFIG.COLORS.COIN);
            coinPickups.splice(i, 1);
        }
    }

    // Mystery boxes
    for (let i = mysteryBoxes.length - 1; i >= 0; i--) {
        const box = mysteryBoxes[i];
        box.update(dt);
        if (Math.hypot(player.x - box.x, player.y - box.y) < player.radius + box.radius) {
            spawnAllies(player.x, player.y);
            createExplosion(box.x, box.y, CONFIG.COLORS.BOX);
            mysteryBoxes.splice(i, 1);
        }
    }

    // Allies — update, collide with enemies
    for (let i = allies.length - 1; i >= 0; i--) {
        const ally = allies[i];
        ally.update(dt);
        if (ally.isDead) {
            if (ally.deathTimer > 3000) allies.splice(i, 1);
            continue;
        }
        for (let j = enemies.length - 1; j >= 0; j--) {
            const enemy = enemies[j];
            if (Math.hypot(ally.x - enemy.x, ally.y - enemy.y) < ally.radius + enemy.radius) {
                enemy.hp -= ally.damage;
                ally.hp  -= enemy.damage;
                createExplosion(enemy.x, enemy.y, CONFIG.COLORS.ALLY);
                if (enemy.hp <= 0) killEnemy(j, enemy);
                if (ally.hp  <= 0) { ally.die(); break; }
            }
        }
    }

    // Enemies — update, collide with player
    for (let i = enemies.length - 1; i >= 0; i--) {
        const enemy = enemies[i];
        enemy.hitFlashTimer = Math.max(0, enemy.hitFlashTimer - dt);
        enemy.contactDamageTimer = Math.max(0, enemy.contactDamageTimer - dt);
        enemy.update(dt);
        const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y);
        if (dist < player.radius + enemy.radius) {
            if (enemy instanceof ExploderEnemy) {
                enemy.explode();
                xpGems.push(new XPGem(enemy.x, enemy.y, 20));
                enemies.splice(i, 1);
                gameState.kills++;
                gameState.score += 10;
                player.onKill();
            } else {
                // Fixed: use enemy.damage instead of hardcoded 10
                if (enemy.contactDamageTimer <= 0) {
                    player.takeDamage(enemy.damage);
                    enemy.contactDamageTimer = 650;
                }
                createExplosion(enemy.x, enemy.y, CONFIG.COLORS.ENEMY);
                if (player.health > 0) enemies.splice(i, 1);
            }
        }
    }

    // Player projectiles vs enemies
    for (let i = projectiles.length - 1; i >= 0; i--) {
        const proj = projectiles[i];
        proj.update();
        if (!proj.active) { projectiles.splice(i, 1); continue; }
        for (let j = enemies.length - 1; j >= 0; j--) {
            const enemy = enemies[j];
            if (proj.hitList.includes(enemy)) continue;
            if (Math.hypot(proj.x - enemy.x, proj.y - enemy.y) < proj.radius + enemy.radius) {
                enemy.hp -= player.damage;
                enemy.hitFlashTimer = 90;
                proj.hitList.push(enemy);
                createExplosion(proj.x, proj.y, '#ffffff', 5);
                audio.playHit();
                spawnFloatingText(enemy.x, enemy.y, Math.round(player.damage));
                if (enemy.hp <= 0) {
                    if (enemy instanceof ExploderEnemy) enemy.explode();
                    killEnemy(j, enemy);
                }
                if (proj.hitList.length > proj.pierce) { proj.active = false; break; }
            }
        }
    }

    // Enemy bullets
    for (let i = enemyBullets.length - 1; i >= 0; i--) {
        enemyBullets[i].update();
        if (!enemyBullets[i].active) enemyBullets.splice(i, 1);
    }

    // Particles
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        if (particles[i].life <= 0) particles.splice(i, 1);
    }

    // Damage Texts
    for (let i = damageTexts.length - 1; i >= 0; i--) {
        damageTexts[i].update();
        if (damageTexts[i].life <= 0) damageTexts.splice(i, 1);
    }

    // Performance constraints: Cap entity arrays
    if (xpGems.length > 150) xpGems.splice(0, xpGems.length - 150);
    if (coinPickups.length > 100) coinPickups.splice(0, coinPickups.length - 100);
    if (particles.length > 200) particles.splice(0, particles.length - 200);
}

/** Draws a subtle neon grid background. */
function drawBackground() {
    const gridSize = 100;
    const startX   = Math.floor(camera.x / gridSize) * gridSize;
    const startY   = Math.floor(camera.y / gridSize) * gridSize;
    const endX     = startX + camera.cameraWidth  + gridSize;
    const endY     = startY + camera.cameraHeight + gridSize;

    ctx.save();
    ctx.strokeStyle = CONFIG.COLORS.GRID || 'rgba(0,243,255,0.1)';
    ctx.lineWidth   = 1;
    for (let x = startX; x <= endX; x += gridSize) {
        if (x < 0 || x > CONFIG.WORLD_WIDTH) continue;
        ctx.beginPath(); ctx.moveTo(x, Math.max(0, startY)); ctx.lineTo(x, Math.min(CONFIG.WORLD_HEIGHT, endY)); ctx.stroke();
    }
    for (let y = startY; y <= endY; y += gridSize) {
        if (y < 0 || y > CONFIG.WORLD_HEIGHT) continue;
        ctx.beginPath(); ctx.moveTo(Math.max(0, startX), y); ctx.lineTo(Math.min(CONFIG.WORLD_WIDTH, endX), y); ctx.stroke();
    }
    ctx.restore();
}

/** Draws all game entities onto the canvas. */
function drawAllEntities() {
    drawBackground();
    ctx.strokeStyle = CONFIG.COLORS.BORDER;
    ctx.lineWidth   = 5;
    ctx.strokeRect(0, 0, CONFIG.WORLD_WIDTH, CONFIG.WORLD_HEIGHT);

    xpGems.forEach(g       => g.draw());
    coinPickups.forEach(c  => c.draw());
    mysteryBoxes.forEach(b => b.draw());
    allies.forEach(a       => a.draw());
    enemies.forEach(e      => e.draw());
    enemies.forEach(e => {
        if (e.hitFlashTimer <= 0 || !isInView(e.x, e.y, e.radius + 5)) return;
        ctx.save();
        ctx.globalAlpha = Math.min(1, e.hitFlashTimer / 90);
        ctx.fillStyle = '#fff';
        ctx.shadowColor = '#fff';
        ctx.shadowBlur = 18;
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.radius + 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    });
    projectiles.forEach(p  => p.draw());
    enemyBullets.forEach(b => b.draw());
    player.draw();
    particles.forEach(p    => p.draw());
    damageTexts.forEach(d  => d.draw());
}

/** Renders the minimap canvas. */
function drawMinimap() {
    const mc = document.getElementById('minimapCanvas');
    if (!mc || !player) return;
    const mctx = mc.getContext('2d');
    const W = mc.width, H = mc.height;
    const sx = W / CONFIG.WORLD_WIDTH, sy = H / CONFIG.WORLD_HEIGHT;

    mctx.clearRect(0, 0, W, H);
    mctx.fillStyle = 'rgba(0,0,0,0.6)';
    mctx.fillRect(0, 0, W, H);

    mctx.fillStyle = '#ff3333';
    enemies.filter(e => !(e instanceof SniperEnemy)).forEach(e => mctx.fillRect(e.x*sx-1, e.y*sy-1, 3, 3));
    mctx.fillStyle = '#ff44aa';
    enemies.filter(e => e instanceof SniperEnemy).forEach(e => mctx.fillRect(e.x*sx-1, e.y*sy-1, 3, 3));
    mctx.fillStyle = '#00ff66';
    xpGems.forEach(g => mctx.fillRect(g.x*sx-1, g.y*sy-1, 2, 2));
    mctx.fillStyle = '#ffcc00';
    coinPickups.forEach(c => mctx.fillRect(c.x*sx-1, c.y*sy-1, 2, 2));
    mctx.fillStyle = '#00f3ff';
    mctx.beginPath(); mctx.arc(player.x*sx, player.y*sy, 3, 0, Math.PI*2); mctx.fill();
    mctx.strokeStyle = 'rgba(0,243,255,0.5)'; mctx.lineWidth = 1;
    mctx.strokeRect(0, 0, W, H);
}

/** Updates the boss HP bar in the HUD. */
function updateBossHUD() {
    const bossEl = document.getElementById('bossHUD');
    const fillEl = document.getElementById('bossHUDBar');
    if (!bossEl || !fillEl) return;
    const boss = enemies.find(e => e.isBoss);
    if (boss) {
        activeBoss = boss;
        bossEl.classList.remove('hidden');
        fillEl.style.width = Math.max(0, (boss.hp / boss.maxHp) * 100) + '%';
    } else if (activeBoss) {
        activeBoss = null;
        bossEl.classList.add('hidden');
    }
}

/** Shows a wave number banner briefly. */
function showWaveAnnouncement(waveNum) {
    const existing = document.getElementById('waveAnnounce');
    if (existing) existing.remove();
    const el = document.createElement('div');
    el.id = 'waveAnnounce';
    el.innerText = `WAVE ${waveNum}`;
    document.getElementById('uiLayer').appendChild(el);
    setTimeout(() => { if (el.parentNode) el.remove(); }, 2000);
}

/* =============================================================
   12. GAME LOOP — Main update + draw cycle
   ============================================================= */

// ─── Global entity arrays ─────────────────────────────────────
const keys = {};
let player;
let enemies      = [];
let projectiles  = [];
let enemyBullets = [];
let particles    = [];
let allies       = [];
let mysteryBoxes = [];
let coinPickups  = [];
let xpGems       = [];
let damageTexts  = [];
let lastSpawn    = 0;
let animationId;
let activeBoss   = null;  // Fixed: declared here, no hoisting confusion

function loop() {
    if (gameState.status !== 'PLAYING') return;

    const now = performance.now();
    const dt  = Math.min(now - (gameState._lastFrameTime || now), 50);  // cap delta at 50ms
    gameState._lastFrameTime = now;

    // Hit pause — brief intentional freeze on boss kill for drama
    if (gameState.hitPauseTimer > 0) {
        gameState.hitPauseTimer -= dt;
        if (gameState.hitPauseTimer <= 0) canvas.classList.remove('hit-pause');
        animationId = requestAnimationFrame(loop);
        return;
    }

    gameState.timeElapsed += dt;

    // Systems
    updateWaveSystem();
    updateComboSystem(dt);

    // Spawn enemies
    let spawnRate = CONFIG.ENEMY_SPAWN_RATE_MS - (gameState.timeElapsed / 500) - (gameState.wave * 18);
    if (gameState.difficulty === 'impossible') spawnRate *= 0.5;
    else if (gameState.difficulty === 'hard') spawnRate *= 0.8;
    else if (gameState.difficulty === 'easy') spawnRate *= 1.5;
    spawnRate = Math.max(gameState.difficulty === 'impossible' ? 200 : 400, spawnRate);

    // Cap enemies at 150 to prevent impossible mode lag
    if (now - lastSpawn > spawnRate && enemies.length < 150) {
        let count = 1 + Math.floor(gameState.wave / 4);
        if (gameState.timeElapsed < 30000) count += 1;
        if (gameState.difficulty === 'impossible') count += 1;
        for (let s = 0; s < count; s++) enemies.push(spawnEnemy());
        lastSpawn = now;
    }

    // Spawn mystery boxes
    if (Math.random() < CONFIG.BOX_SPAWN_CHANCE) mysteryBoxes.push(new MysteryBox());

    // Update all entities
    updateAllEntities(dt);

    // Draw
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.scale(CONFIG.ZOOM, CONFIG.ZOOM);
    ctx.translate(-camera.x, -camera.y);
    drawAllEntities();
    ctx.restore();

    // Screen shake decay
    if (gameState.screenShake > 0) gameState.screenShake = Math.max(0, gameState.screenShake - dt * 0.3);

    // Update HUD every frame
    updateHUD();
    updateStatsPanel();
    drawMinimap();
    updateBossHUD();

    animationId = requestAnimationFrame(loop);
}

/* =============================================================
   13. HUD & UI
   ============================================================= */

function updateHUD() {
    if (!player) return;
    ui.score.innerText      = gameState.score;
    ui.healthBar.style.width = Math.max(0, (player.health / player.maxHealth) * 100) + '%';
    ui.xpBar.style.width    = Math.max(0, (player.xp     / player.xpToNextLevel) * 100) + '%';
    ui.level.innerText      = 'LVL ' + player.level;

    const sbc = document.getElementById('shieldBarContainer');
    const sb  = document.getElementById('shieldBar');
    if (player.maxShield > 0) {
        if (sbc) sbc.style.display = 'flex';
        if (sb)  sb.style.width    = Math.max(0, (player.shield / player.maxShield) * 100) + '%';
    } else {
        if (sbc) sbc.style.display = 'none';
    }

    const totalSec = Math.floor(gameState.timeElapsed / 1000);
    const m = Math.floor(totalSec / 60).toString().padStart(2, '0');
    const s = (totalSec % 60).toString().padStart(2, '0');
    ui.timer.innerText = `${m}:${s}`;

    if (gameState.comboCount >= 2) {
        const mult = Math.min(gameState.comboCount, 5);
        ui.score.style.color      = mult >= 4 ? '#ff8800' : mult >= 3 ? '#ff00ff' : '#00f3ff';
        ui.score.style.textShadow = '0 0 15px currentColor';
        if (ui.scoreLabel) ui.scoreLabel.innerText = `x${mult} COMBO! `;
    } else {
        ui.score.style.color      = '';
        ui.score.style.textShadow = '';
        if (ui.scoreLabel) ui.scoreLabel.innerText = lang.getText('score') + ' ';
    }

    updateMenuCoinUI();
}

function updateStatsPanel() {
    if (!player) return;
    ui.stats.dmg.innerText  = Math.round(player.damage);
    ui.stats.spd.innerText  = Math.round(player.speedMultiplier * 100) + '%';
    ui.stats.rof.innerText  = Math.round(player.fireRateMultiplier * 100) + '%';
    ui.stats.blt.innerText  = Math.round(player.projectileSpeedMultiplier * 100) + '%';
    if (ui.stats.multi)  ui.stats.multi.innerText  = player.multishotLevel;
    if (ui.stats.mag)    ui.stats.mag.innerText     = Math.round(player.magnetMultiplier * 100) + '%';
    if (ui.stats.prc)    ui.stats.prc.innerText     = player.piercingLevel;
    if (ui.stats.allies) ui.stats.allies.innerText  = allies.filter(a => !a.isDead).length;
    if (ui.stats.aura)   ui.stats.aura.innerText    = player.auraRange > 0 ? `${player.auraDamage} DPS` : 'OFF';
    if (ui.stats.vamp)   ui.stats.vamp.innerText    = player.vampireHeal > 0 ? `+${player.vampireHeal}` : 'OFF';
    const killEl = document.getElementById('statKills');
    if (killEl) killEl.innerText = gameState.kills;
}

/** Refreshes the dash cooldown ring in the HUD. */
function updateDashUI() {
    const el = document.getElementById('dashCooldown');
    if (!el || !player) return;
    const pct = player.dashPercent * 100;
    el.style.background = `conic-gradient(var(--neon-blue) ${pct}%, rgba(0,0,0,0.4) ${pct}%)`;
    el.classList.toggle('ready', player.dashReady);
    el.title = player.dashReady ? lang.getText('dashReady') : `DASH ${Math.ceil((player.dashCooldownMax - player.dashTimer) / 1000)}s`;
}

/** Shows the upgrade selection modal and pauses the game loop. */
function triggerLevelUp() {
    gameState.status = 'LEVEL_UP';
    ui.upgradeOptions.innerHTML = '';

    // Full upgrade pool — 15 options
    const allUpgrades = [
        { key: 'rapidFire',   name: lang.getText('u_rapidFire'),   desc: lang.getText('d_rapidFire'),   action: () => { player.fireRateMultiplier += 0.2; } },
        { key: 'highCal',     name: lang.getText('u_highCaliber'), desc: lang.getText('d_highCaliber'), action: () => { player.damageMultiplier += 0.2; player.baseDamage += 5; } },
        { key: 'swiftness',   name: lang.getText('u_swiftness'),   desc: lang.getText('d_swiftness'),   action: () => { player.speedMultiplier += 0.15; } },
        { key: 'velocity',    name: lang.getText('u_velocity'),    desc: lang.getText('d_velocity'),    action: () => { player.projectileSpeedMultiplier += 0.25; } },
        { key: 'doubleShot',  name: lang.getText('u_doubleShot'),  desc: lang.getText('d_doubleShot'),  action: () => { player.multishotLevel += 1; } },
        { key: 'magnet',      name: lang.getText('u_magnet'),      desc: lang.getText('d_magnet'),      action: () => { player.magnetMultiplier += 0.5; } },
        { key: 'piercing',    name: lang.getText('u_piercing'),    desc: lang.getText('d_piercing'),    action: () => { player.piercingLevel += 1; } },
        { key: 'regen',       name: lang.getText('u_regen'),       desc: lang.getText('d_regen'),       action: () => { player.regenRate += 2; } },
        { key: 'heal',        name: lang.getText('u_heal'),        desc: lang.getText('d_heal'),        action: () => { player.health = Math.min(player.maxHealth, player.health + player.maxHealth * 0.5); } },
        { key: 'shield',      name: lang.getText('u_shield'),      desc: lang.getText('d_shield'),      action: () => { player.maxShield += 50; player.shield = Math.min(player.shield + 50, player.maxShield); } },
        { key: 'maxHp',       name: lang.getText('u_maxHp'),       desc: lang.getText('d_maxHp'),       action: () => { player.maxHealth += 25; player.health = Math.min(player.health + 25, player.maxHealth); } },
        // New upgrades
        { key: 'vampirism',   name: lang.getText('u_vampirism'),   desc: lang.getText('d_vampirism'),   action: () => { player.vampireHeal += 1; } },
        { key: 'aura',        name: lang.getText('u_aura'),        desc: lang.getText('d_aura'),        action: () => { player.auraRange = player.auraRange > 0 ? player.auraRange + 30 : 120; player.auraDamage += 15; } },
        { key: 'luck',        name: lang.getText('u_luck'),        desc: lang.getText('d_luck'),        action: () => { player.luckBonus += 0.2; } },
        { key: 'overclock',   name: lang.getText('u_overclock'),   desc: lang.getText('d_overclock'),   action: () => { player.dashCooldownMax = Math.max(1000, player.dashCooldownMax - 1000); } },
    ];

    // Shuffle and pick 3
    const picked = [...allUpgrades].sort(() => Math.random() - 0.5).slice(0, 3);

    picked.forEach(opt => {
        const el = document.createElement('div');
        el.className = 'upgrade-card';
        el.innerHTML = `<span class="upgrade-title">${opt.name}</span><span class="upgrade-desc">${opt.desc}</span>`;
        el.onclick = () => {
            opt.action();
            ui.levelUp.classList.add('hidden');
            gameState.status = 'PLAYING';
            loop();
        };
        ui.upgradeOptions.appendChild(el);
    });

    ui.levelUp.classList.remove('hidden');
}

function gameOver() {
    gameState.status = 'GAME_OVER';
    cancelAnimationFrame(animationId);

    const totalSec = Math.floor(gameState.timeElapsed / 1000);
    const m = Math.floor(totalSec / 60).toString().padStart(2, '0');
    const s = (totalSec % 60).toString().padStart(2, '0');

    ui.finalScore.innerText = gameState.score;
    ui.finalTime.innerText  = `${m}:${s}`;

    const killsEl = document.getElementById('finalKills');
    if (killsEl) killsEl.innerText = `${lang.getText('kills')}: ${gameState.kills}  |  WAVE: ${gameState.wave}`;

    const fCoins = document.getElementById('finalCoins');
    if (fCoins) fCoins.innerText = gameState.runCoins;

    document.getElementById('mobilePauseBtn')?.classList.add('hidden');
    document.getElementById('xpBoostBtn')?.classList.add('hidden');
    document.getElementById('bossHUD')?.classList.add('hidden');

    const rab = document.getElementById('rewardedAdBtn');
    if (rab) rab.style.display = '';

    activeBoss = null;
    saveScore(gameState.score, `${m}:${s}`, gameState.kills);
    ui.gameOver.classList.remove('hidden');
    ui.hud.classList.add('hidden');

    if (window.PokiAds) window.PokiAds.maybeShowInterstitial();
}

function saveScore(score, time, kills) {
    let scores = JSON.parse(localStorage.getItem('neonVoidScores') || '[]');
    scores.push({ score, time: time || '00:00', kills: kills || 0, date: new Date().toLocaleDateString() });
    scores.sort((a, b) => b.score - a.score);
    scores = scores.slice(0, 5);
    localStorage.setItem('neonVoidScores', JSON.stringify(scores));
}

function loadScores() {
    const scores = JSON.parse(localStorage.getItem('neonVoidScores') || '[]');
    ui.scoreList.innerHTML = '';
    if (scores.length === 0) {
        ui.scoreList.innerHTML = '<div class="score-entry"><span>No Scores Yet</span></div>';
        return;
    }
    scores.forEach((s, i) => {
        const div = document.createElement('div');
        div.className = 'score-entry';
        div.innerHTML = `<span>#${i+1}</span><span>${s.score} PTS</span><span>${s.time || ''}</span>`;
        ui.scoreList.appendChild(div);
    });
}

function togglePause() {
    if (gameState.status === 'PLAYING') {
        gameState.status = 'PAUSED';
        ui.pauseMenu.classList.remove('hidden');
        cancelAnimationFrame(animationId);
    } else if (gameState.status === 'PAUSED') {
        gameState.status = 'PLAYING';
        ui.pauseMenu.classList.add('hidden');
        gameState._lastFrameTime = performance.now();
        loop();
    }
}

function returnToMenu() {
    gameState.status = 'MENU';
    ui.pauseMenu.classList.add('hidden');
    ui.gameOver.classList.add('hidden');
    ui.hud.classList.add('hidden');
    ui.menu.classList.remove('hidden');
    loadScores();
    cancelAnimationFrame(animationId);
    initMenuCanvas();
}

function showCountdown(callback) {
    const el = document.getElementById('countdown');
    if (!el) { callback?.(); return; }

    gameState.status = 'COUNTDOWN';
    let n = 3;

    function step() {
        el.classList.remove('hidden');
        el.textContent     = n;
        el.style.color     = '#00f3ff';
        el.style.animation = 'none';
        void el.offsetWidth;  // force reflow to restart CSS animation
        el.style.animation = '';
        n--;

        if (n > 0) {
            setTimeout(step, 900);
        } else {
            el.textContent     = 'GO!';
            el.style.color     = '#00ff66';
            el.style.animation = 'none';
            void el.offsetWidth;
            el.style.animation = '';
            setTimeout(() => {
                el.classList.add('hidden');
                gameState.status         = 'PLAYING';
                gameState._lastFrameTime = performance.now();
                lastSpawn                = performance.now();
                callback?.();
            }, 700);
        }
    }
    step();
}

function startGame() {
    try { if (audio?.ctx) audio.init(); } catch (e) { console.warn('Audio init:', e); }

    Object.assign(gameState, {
        status: 'PLAYING', score: 0, kills: 0, wave: 1, timeElapsed: 0,
        comboCount: 0, comboTimer: 0, screenShake: 0, runCoins: 0,
        hitPauseTimer: 0, enemySlowFactor: 1.0, _lastFrameTime: performance.now(),
        difficulty: document.getElementById('difficultySelect')?.value || 'medium',
    });
    updateMenuCoinUI();

    try { document.documentElement.requestFullscreen?.().catch(() => {}); } catch (_) {}

    player       = new Player();
    enemies      = []; projectiles = []; enemyBullets = [];
    particles    = []; allies = []; mysteryBoxes = [];
    coinPickups  = []; xpGems = []; damageTexts = []; activeBoss = null;

    ui.menu.classList.add('hidden');
    ui.gameOver.classList.add('hidden');
    ui.hud.classList.remove('hidden');

    document.getElementById('mobilePauseBtn')?.classList.remove('hidden');
    const rab = document.getElementById('rewardedAdBtn');
    if (rab) rab.style.display = '';

    const xpBtn = document.getElementById('xpBoostBtn');
    if (xpBtn) { xpBtn.classList.add('hidden'); setTimeout(() => xpBtn.classList.remove('hidden'), 30000); }

    document.getElementById('waveIndicator').innerText = 'WAVE 1';
    document.getElementById('bossWarning').classList.add('hidden');
    document.getElementById('bossHUD').classList.add('hidden');

    resizeCanvas();
    updateHUD(); updateStatsPanel(); updateDashUI();
    lastSpawn = performance.now();
    ui.btns.start?.blur();
    window.focus(); canvas?.focus();
    showCountdown(() => loop());
}

/* =============================================================
   14. INPUT — Keyboard, mouse, touch, joystick
   ============================================================= */
function setupInput() {
    window.addEventListener('keydown', e => {
        keys[e.key.toLowerCase()] = true;
        if (e.key === 'Escape') togglePause();
        // Space = Dash
        if (e.key === ' ' && gameState.status === 'PLAYING' && player) {
            e.preventDefault();
            player.attemptDash();
        }
    });

    window.addEventListener('keyup', e => { keys[e.key.toLowerCase()] = false; });

    window.addEventListener('resize', () => {
        resizeCanvas();
        const mc = document.getElementById('menuCanvas');
        if (mc) { mc.width = window.innerWidth; mc.height = window.innerHeight; }
    });

    window.addEventListener('mousemove', e => {
        const rect = canvas.getBoundingClientRect();
        gameState.mouse.x = e.clientX - rect.left;
        gameState.mouse.y = e.clientY - rect.top;
    });
    window.addEventListener('mousedown', () => { gameState.mouse.down = true; });
    window.addEventListener('mouseup',   () => { gameState.mouse.down = false; });

    const joyBase    = document.getElementById('joystick');
    const joyKnob    = document.getElementById('joystickKnob');
    const JOY_RADIUS = 35;
    let lastTapTime  = 0;

    canvas.addEventListener('touchstart', e => {
        e.preventDefault();
        const touch = e.touches[0];
        // Double-tap = Dash
        const now = Date.now();
        if (now - lastTapTime < 300 && gameState.status === 'PLAYING' && player) player.attemptDash();
        lastTapTime = now;

        gameState.touch.active = true;
        gameState.touch.startX = touch.clientX;
        gameState.touch.startY = touch.clientY;
        gameState.touch.currX  = touch.clientX;
        gameState.touch.currY  = touch.clientY;

        if (joyBase) {
            joyBase.style.left = touch.clientX + 'px';
            joyBase.style.top  = touch.clientY + 'px';
            joyBase.classList.add('active');
            joyKnob.style.transform = 'translate(-50%, -50%)';
        }
    }, { passive: false });

    canvas.addEventListener('touchmove', e => {
        e.preventDefault();
        const touch = e.touches[0];
        gameState.touch.currX = touch.clientX;
        gameState.touch.currY = touch.clientY;
        if (joyBase) {
            const dx    = touch.clientX - gameState.touch.startX;
            const dy    = touch.clientY - gameState.touch.startY;
            const dist  = Math.min(Math.hypot(dx, dy), JOY_RADIUS);
            const angle = Math.atan2(dy, dx);
            joyKnob.style.transform = `translate(calc(-50% + ${Math.cos(angle)*dist}px), calc(-50% + ${Math.sin(angle)*dist}px))`;
        }
    }, { passive: false });

    canvas.addEventListener('touchend', e => {
        e.preventDefault();
        gameState.touch.active = false;
        if (joyBase) joyBase.classList.remove('active');
    });

    ui.volumeSlider?.addEventListener('input', e => {
        CONFIG.VOLUME = e.target.value / 100;
        audio.setVolume(CONFIG.VOLUME);
    });

    ui.langSelect?.addEventListener('change', e => lang.setLanguage(e.target.value));

    document.getElementById('mobilePauseBtn')?.addEventListener('click', () => { triggerHaptic(); togglePause(); });

    // Handle Android hardware back button
    try {
        if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.App) {
            window.Capacitor.Plugins.App.addListener('backButton', () => {
                if (gameState.status === 'PLAYING') {
                    togglePause();
                } else if (gameState.status === 'PAUSED' || gameState.status === 'GAME_OVER' || gameState.status === 'LEVEL_UP') {
                    returnToMenu();
                } else if (gameState.status === 'MENU') {
                    const shop = document.getElementById('shopScreen');
                    const char = document.getElementById('characterScreen');
                    if (shop && !shop.classList.contains('hidden')) {
                        shop.classList.add('hidden');
                        ui.menu.classList.remove('hidden');
                    } else if (char && !char.classList.contains('hidden')) {
                        closeCharacterScreen(false);
                    } else {
                        window.Capacitor.Plugins.App.exitApp();
                    }
                }
            });
        }
    } catch (e) {
        console.warn('Capacitor App plugin not available', e);
    }
}

/* =============================================================
   15. CHARACTER SYSTEM
   ============================================================= */

/**
 * Draws a full character onto any canvas context.
 * Used for both the live in-game player and the customization preview canvas.
 */
function drawCharacterOnCtx(cctx, cx, cy, cfg) {
    const suit      = cfg.suitColor  || '#00f3ff';
    const hairCol   = cfg.hairColor  || '#1a1a1a';
    const isFemale  = cfg.gender === 'female';
    const hairStyle = cfg.hair || 'short';

    cctx.save();
    cctx.translate(cx, cy);
    cctx.shadowBlur = 18; cctx.shadowColor = suit;

    // Legs
    cctx.strokeStyle = suit; cctx.lineWidth = 4; cctx.lineCap = 'round';
    cctx.beginPath(); cctx.moveTo(-4, 8); cctx.lineTo(-6, 22); cctx.stroke();
    cctx.beginPath(); cctx.moveTo( 4, 8); cctx.lineTo( 6, 22); cctx.stroke();

    // Body
    cctx.shadowBlur = 12; cctx.fillStyle = suit;
    if (isFemale) {
        cctx.beginPath();
        cctx.moveTo(-7,-2); cctx.lineTo(-9,4); cctx.lineTo(-5,9);
        cctx.lineTo( 5, 9); cctx.lineTo( 9,4); cctx.lineTo( 7,-2);
        cctx.closePath(); cctx.fill();
    } else {
        cctx.fillRect(-8, -2, 16, 11);
    }

    // Arms
    cctx.strokeStyle = suit; cctx.lineWidth = 3.5;
    cctx.beginPath(); cctx.moveTo(-8,1); cctx.lineTo(-14,8); cctx.stroke();
    cctx.beginPath(); cctx.moveTo( 8,1); cctx.lineTo( 14,8); cctx.stroke();

    // Head
    cctx.shadowBlur = 10; cctx.shadowColor = suit;
    cctx.fillStyle = '#f5c5a0';
    cctx.beginPath(); cctx.arc(0,-10,9,0,Math.PI*2); cctx.fill();

    // Eyes
    cctx.fillStyle = '#000';
    cctx.beginPath(); cctx.arc(-3,-11,1.4,0,Math.PI*2); cctx.arc(3,-11,1.4,0,Math.PI*2); cctx.fill();
    cctx.fillStyle = '#fff';
    cctx.beginPath(); cctx.arc(-2.3,-11.7,0.6,0,Math.PI*2); cctx.arc(3.7,-11.7,0.6,0,Math.PI*2); cctx.fill();

    // Female eyelashes
    if (isFemale) {
        cctx.strokeStyle = '#000'; cctx.lineWidth = 1.2;
        [-5,-3,-1].forEach(ox => { cctx.beginPath(); cctx.moveTo(ox,-13); cctx.lineTo(ox-1,-15); cctx.stroke(); });
        [1,3,5].forEach(ox   => { cctx.beginPath(); cctx.moveTo(ox,-13); cctx.lineTo(ox+1,-15); cctx.stroke(); });
    }

    // Hair
    cctx.fillStyle = hairCol; cctx.shadowColor = hairCol; cctx.shadowBlur = 8;
    if (hairStyle === 'short') {
        cctx.beginPath(); cctx.arc(0,-12,9,Math.PI,0); cctx.fill();
        if (isFemale) {
            cctx.beginPath(); cctx.arc(-9,-10,4,0,Math.PI); cctx.fill();
            cctx.beginPath(); cctx.arc( 9,-10,4,0,Math.PI); cctx.fill();
        }
    } else if (hairStyle === 'long') {
        cctx.beginPath(); cctx.arc(0,-12,9.5,Math.PI,0); cctx.fill();
        cctx.beginPath(); cctx.moveTo(-9,-10); cctx.quadraticCurveTo(-13,4,-10,20); cctx.lineTo(-6,20); cctx.quadraticCurveTo(-9,4,-5,-10); cctx.fill();
        cctx.beginPath(); cctx.moveTo( 9,-10); cctx.quadraticCurveTo( 13,4, 10,20); cctx.lineTo( 6,20); cctx.quadraticCurveTo( 9,4, 5,-10); cctx.fill();
    } else if (hairStyle === 'spiky') {
        cctx.beginPath(); cctx.arc(0,-12,9,Math.PI,0); cctx.fill();
        const spikes = isFemale ? 5 : 7;
        for (let i = 0; i < spikes; i++) {
            const a = Math.PI + (i/(spikes-1))*Math.PI;
            cctx.beginPath();
            cctx.moveTo(Math.cos(a-0.2)*9,-12+Math.sin(a-0.2)*9);
            cctx.lineTo(Math.cos(a)*20,    -12+Math.sin(a)*20);
            cctx.lineTo(Math.cos(a+0.2)*9,-12+Math.sin(a+0.2)*9);
            cctx.fill();
        }
    } else if (hairStyle === 'bun') {
        cctx.beginPath(); cctx.arc(0,-12,9,Math.PI,0); cctx.fill();
        cctx.beginPath(); cctx.arc(0,-23,6,0,Math.PI*2); cctx.fill();
        cctx.strokeStyle = suit; cctx.lineWidth = 1.5;
        cctx.beginPath(); cctx.arc(0,-23,6,0,Math.PI*2); cctx.stroke();
    }

    cctx.restore();
}

function renderCharPreview() {
    const pc = document.getElementById('charPreviewCanvas');
    if (!pc) return;
    const pctx = pc.getContext('2d');
    pctx.clearRect(0, 0, pc.width, pc.height);
    pctx.fillStyle = 'rgba(0,0,0,0.6)'; pctx.fillRect(0,0,pc.width,pc.height);
    pctx.strokeStyle = 'rgba(0,243,255,0.08)'; pctx.lineWidth = 1;
    for (let x = 0; x < pc.width;  x += 20) { pctx.beginPath(); pctx.moveTo(x,0); pctx.lineTo(x,pc.height); pctx.stroke(); }
    for (let y = 0; y < pc.height; y += 20) { pctx.beginPath(); pctx.moveTo(0,y); pctx.lineTo(pc.width,y);  pctx.stroke(); }
    pctx.save(); pctx.fillStyle = 'rgba(0,243,255,0.12)';
    pctx.beginPath(); pctx.ellipse(pc.width/2, pc.height*0.78, 22, 6, 0, 0, Math.PI*2); pctx.fill(); pctx.restore();
    drawCharacterOnCtx(pctx, pc.width/2, pc.height*0.56, charConfig);
}

let _tempChar = {};

function openCharacterScreen() {
    _tempChar = JSON.parse(JSON.stringify(charConfig));
    ui.menu.classList.add('hidden');
    document.getElementById('characterScreen').classList.remove('hidden');
    syncCharButtons(); renderCharPreview();
}

function closeCharacterScreen(save) {
    if (!save) charConfig = JSON.parse(JSON.stringify(_tempChar));
    document.getElementById('characterScreen').classList.add('hidden');
    ui.menu.classList.remove('hidden');
}

function syncCharButtons() {
    document.getElementById('genderMale').classList.toggle('active', charConfig.gender === 'male');
    document.getElementById('genderFemale').classList.toggle('active', charConfig.gender === 'female');
    const hairBtns = document.querySelectorAll('#hairStyleRow .char-opt-btn');
    const styles   = ['short','long','spiky','bun'];
    hairBtns.forEach((btn, i) => btn.classList.toggle('active', styles[i] === charConfig.hair));
    document.querySelectorAll('.color-dot').forEach(d => d.classList.remove('active'));
}

// Exposed globally so HTML onclick attributes still work
window.setCharGender    = g => { charConfig.gender    = g; syncCharButtons(); renderCharPreview(); };
window.setCharHair      = h => { charConfig.hair      = h; syncCharButtons(); renderCharPreview(); };
window.setCharHairColor = c => { charConfig.hairColor = c; syncCharButtons(); renderCharPreview(); };
window.setCharSuitColor = c => { charConfig.suitColor = c; CONFIG.COLORS.PLAYER = c; syncCharButtons(); renderCharPreview(); };

/* =============================================================
   16. SHOP SYSTEM
   ============================================================= */
const SHOP_ITEMS = {
    hp:   { el: 'lvl_hp',   cost: 500  },
    dmg:  { el: 'lvl_dmg',  cost: 500  },
    spd:  { el: 'lvl_spd',  cost: 500  },
    coin: { el: 'lvl_coin', cost: 1000 },
};
const SHOP_MAX_LEVEL = 5;

function updateShopUI() {
    updateMenuCoinUI();
    for (const [key, item] of Object.entries(SHOP_ITEMS)) {
        const lvlEl = document.getElementById(item.el);
        if (lvlEl) lvlEl.innerText = metaStats[key] || 0;
        const btn = document.getElementById(`buy_${key}`);
        if (!btn) continue;
        const lvl = metaStats[key] || 0;
        if (lvl >= SHOP_MAX_LEVEL) {
            btn.innerText = 'MAX'; btn.disabled = true; btn.style.opacity = '0.5';
        } else {
            btn.innerText = `${item.cost} \uD83D\uDFE1`; btn.disabled = false; btn.style.opacity = '1';
            btn.onclick   = () => buyUpgrade(key, item.cost);
        }
    }
}

function buyUpgrade(key, cost) {
    if (coins < cost) {
        showToast(lang.getText('notEnoughCoins'), 'warning');
        return;
    }
    if ((metaStats[key] || 0) >= SHOP_MAX_LEVEL) return;
    coins -= cost;
    metaStats[key] = (metaStats[key] || 0) + 1;
    saveMeta(); updateShopUI();
    showToast(`\u2713 Upgraded! Level ${metaStats[key]}`, 'success');
}

/* =============================================================
   17. MENU ANIMATION
   ============================================================= */
function initMenuCanvas() {
    const mc = document.getElementById('menuCanvas');
    if (!mc) return;
    mc.width = window.innerWidth; mc.height = window.innerHeight;
    if (gameState.status !== 'MENU') return;
    mc.classList.add('active');
    const mctx  = mc.getContext('2d');
    const points = Array.from({ length: 60 }, () => ({
        x: Math.random()*mc.width, y: Math.random()*mc.height,
        vx: (Math.random()-0.5)*0.5, vy: (Math.random()-0.5)*0.5,
        r: Math.random()*2+0.5,
        c: Math.random()<0.5 ? '#00f3ff' : (Math.random()<0.5 ? '#ff00ff' : '#00ff66')
    }));
    (function animateMenu() {
        if (gameState.status !== 'MENU') {
            mctx.clearRect(0,0,mc.width,mc.height); mc.classList.remove('active'); return;
        }
        mctx.clearRect(0,0,mc.width,mc.height);
        points.forEach(p => {
            p.x = (p.x + p.vx + mc.width)  % mc.width;
            p.y = (p.y + p.vy + mc.height) % mc.height;
            mctx.beginPath(); mctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
            mctx.fillStyle = mctx.shadowColor = p.c;
            mctx.shadowBlur = 8; mctx.fill();
        });
        requestAnimationFrame(animateMenu);
    })();
}

/* =============================================================
   18. INITIALIZATION — Wire up all events and boot
   ============================================================= */
const audio = new SoundManager();
const lang  = new LanguageManager();

// Apply saved character suit color to the active player color config
if (charConfig.suitColor) CONFIG.COLORS.PLAYER = charConfig.suitColor;

// Button events — use addEventListener instead of onclick for cleaner separation
ui.btns.start?.addEventListener('click',        () => { triggerHaptic(); audio.init(); startGame(); });
ui.btns.retry?.addEventListener('click',        () => { triggerHaptic(); startGame(); });
ui.btns.resume?.addEventListener('click',       () => { triggerHaptic(); togglePause(); });
ui.btns.quit?.addEventListener('click',         () => { triggerHaptic(); returnToMenu(); });
ui.btns.menuGameOver?.addEventListener('click', () => { triggerHaptic(); returnToMenu(); });

document.getElementById('rateBtn')?.addEventListener('click', () => {
    window.open('https://play.google.com/store/apps/details?id=com.neonvoid.survivor', '_blank');
});

const shopBtn    = document.getElementById('shopBtn');
const shopScreen = document.getElementById('shopScreen');
shopBtn?.addEventListener('click', () => {
    ui.menu.classList.add('hidden');
    shopScreen.classList.remove('hidden');
    updateShopUI();
});
document.getElementById('closeShopBtn')?.addEventListener('click', () => {
    shopScreen.classList.add('hidden');
    ui.menu.classList.remove('hidden');
});

document.getElementById('characterBtn')?.addEventListener('click',  () => { triggerHaptic(); openCharacterScreen(); });
document.getElementById('saveCharBtn')?.addEventListener('click',   () => { saveCharConfig(); triggerHaptic(); closeCharacterScreen(true); });
document.getElementById('closeCharBtn')?.addEventListener('click',  () => { triggerHaptic(); closeCharacterScreen(false); });

// Bootstrap
resizeCanvas();
setupInput();
loadScores();
initMenuCanvas();
updateMenuCoinUI();

// Theme system
function applyTheme(themeName) {
    if (!CONFIG.THEMES[themeName]) return;
    const t = CONFIG.THEMES[themeName];
    CONFIG.COLORS = { ...t };
    document.body.style.backgroundColor = t.BG;
    localStorage.setItem('neonVoid_theme', themeName);
    
    // sync dropdowns
    if (ui.theme.main) ui.theme.main.value = themeName;
    if (ui.theme.pause) ui.theme.pause.value = themeName;
    
    // Retain custom suit color if applicable
    if (charConfig.suitColor) CONFIG.COLORS.PLAYER = charConfig.suitColor;
}

const savedTheme = localStorage.getItem('neonVoid_theme') || 'Neon Void';
applyTheme(savedTheme);

ui.theme.main?.addEventListener('change', (e) => applyTheme(e.target.value));
ui.theme.pause?.addEventListener('change', (e) => applyTheme(e.target.value));

import CONSTANTS from "../constants";

export class ControlsViewScene extends Phaser.Scene {
    constructor() {
        super(CONSTANTS.SCENES.CONTROLS_VIEW_SCENE);
    }

    init() {
        console.log("controls view scene init");
    }

    preload() {
        this.load.plugin('rexanchorplugin',"./lib/phaser3-rex-plugins/dist/rexanchorplugin.min.js", true);
        this.load.scenePlugin('rexuiplugin', './lib/phaser3-rex-plugins/dist/rexuiplugin.js', 'rexUI', 'rexUI');
    }

    create() {
        this.startMenuSounds = {
            itemSelect: this.sound.add("startMenuSelect")
        }
        this.createSettingsIcon();
    }

    createHelpIcon() {
        const iconButton = this.rexUI.add.label({
            width: 30,
            background: this.rexUI.add.roundRectangle(0, 0, 0, 0, 20, CONSTANTS.COLOR_PRIMARY).setStrokeStyle(2, CONSTANTS.COLOR_LIGHT),
            //icon: this.add.circle(0, 0, 10).setStrokeStyle(1, COLOR_DARK),
            text: this.add.text(0, 0, "?", {
                fontSize: 20,
            }),
            space: {
                left: 10, right: 10, top: 10, bottom: 10,
                icon: 10
            },
            align: 'left',
            name: "icon"
        });

        this.helpIcon = this.rexUI.add.fixWidthButtons({
            x: 40,
            y: 560,
            buttons: [
                iconButton,
                // ...
            ],
            // rtl: false,
            align: 0,
            click: {
                mode: 'pointerup',
                clickInterval: 100
            },
            space: {
                line: 3,
            }
        }).layout();

        this.helpIcon.on("button.click", (btn, i, pointer, event) => {
            
        });

        this.helpIcon.on("button.over", (btn, i, pointer, event) => {
            btn.backgroundChildren[0].setFillStyle(CONSTANTS.COLOR_LIGHT);
        });

        this.helpIcon.on("button.out", (btn, i, pointer, event) => {
            btn.backgroundChildren[0].setFillStyle(CONSTANTS.COLOR_PRIMARY);
            document.body.style.cursor = "auto";
        });
    }

    createSettingsIcon() {
        const iconButton = this.rexUI.add.label({
            width: 30,
            background: this.rexUI.add.roundRectangle(0, 0, 0, 0, 20, CONSTANTS.COLOR_PRIMARY).setStrokeStyle(2, CONSTANTS.COLOR_LIGHT),
            //icon: this.add.circle(0, 0, 10).setStrokeStyle(1, COLOR_DARK),
            text: this.add.text(0, 0, "⚙", {
                fontSize: 20,
            }),
            space: {
                left: 10, right: 10, top: 10, bottom: 10,
                icon: 10
            },
            align: 'left',
            name: "icon"
        });

        this.settingsIcon = this.rexUI.add.fixWidthButtons({
            x: 0,
            y: 0,
            buttons: [
                iconButton,
                // ...
            ],
            // rtl: false,
            align: 0,
            click: {
                mode: 'pointerup',
                clickInterval: 100
            },
            space: {
                line: 3,
            },
            sizerEvents: true,
        }).layout();

        this.settingsIcon.scrollFactorX = 0;
        this.settingsIcon.scrollFactorY = 0;

        this.plugins.get('rexanchorplugin').add(this.settingsIcon, {
            right: 'right-20',
            top: 'top+20',
        });

        this.settingsIcon.on("button.click", (btn, i, pointer, event) => {
            if (!this.startMenuSounds.itemSelect.isPlaying)
                this.startMenuSounds.itemSelect.play();
            this.openSettingPage();
        });

        this.settingsIcon.on("button.over", (btn, i, pointer, event) => {
            btn.backgroundChildren[0].setFillStyle(CONSTANTS.COLOR_LIGHT);
            document.body.style.cursor = "pointer";
        });

        this.settingsIcon.on("button.out", (btn, i, pointer, event) => {
            btn.backgroundChildren[0].setFillStyle(CONSTANTS.COLOR_PRIMARY);
            document.body.style.cursor = "auto";
        });
    }

    openSettingPage() {
        this.scene.sleep(CONSTANTS.SCENES.MAP_VIEW_SCENE);
        this.scene.sleep(CONSTANTS.SCENES.CONTROLS_VIEW_SCENE);
        this.scene.run(CONSTANTS.SCENES.OPTIONS_VIEW_SCENE, CONSTANTS.SCENES.CONTROLS_VIEW_SCENE);
    }
}
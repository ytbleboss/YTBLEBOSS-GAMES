const {
    app,
    BrowserWindow,
    Menu,
    shell
} = require("electron");

const path = require("path");

let win;

function createWindow() {

    win = new BrowserWindow({

        width: 1440,
        height: 900,

        minWidth: 900,
        minHeight: 600,

        title: "YTBLEBOSS GAMES",

        icon: path.join(
            __dirname,
            "build",
            "icon.ico"
        ),

        backgroundColor: "#050812",

        webPreferences: {

            preload: path.join(
                __dirname,
                "preload.js"
            ),

            contextIsolation: true,
            nodeIntegration: false,
            sandbox: true

        }

    });

    win.loadFile("index.html");

    const menu = Menu.buildFromTemplate([

        {
            label: "🎮 YTBLEBOSS GAMES",

            submenu: [

                {
                    label: "🏠 Accueil",

                    click() {
                        win.loadFile("index.html");
                    }
                },

                {
                    type: "separator"
                },

                {
                    label: "⛶ Plein écran",

                    accelerator: "F11",

                    click() {

                        win.setFullScreen(
                            !win.isFullScreen()
                        );

                    }

                },

                {
                    label: "🔄 Recharger",

                    accelerator: "Ctrl+R",

                    click() {
                        win.reload();
                    }

                },

                {
                    type: "separator"
                },

                {
                    role: "quit",
                    label: "❌ Quitter"
                }

            ]

        },

        {
            label: "🪟 Fenêtre",

            submenu: [

                {
                    label: "➖ Minimiser",
                    role: "minimize"
                },

                {
                    label: "⬜ Maximiser",

                    click() {

                        if (win.isMaximized()) {
                            win.unmaximize();
                        } else {
                            win.maximize();
                        }

                    }

                },

                {
                    label: "⛶ Plein écran",

                    click() {

                        win.setFullScreen(
                            !win.isFullScreen()
                        );

                    }

                }

            ]

        },

        {
            label: "❓ Aide",

            submenu: [

                {
                    label: "🌐 GitHub",

                    click() {

                        shell.openExternal(
                            "https://github.com/prateek121/90s-games"
                        );

                    }

                },

                {
                    label: "ℹ️ À propos",

                    click() {

                        win.webContents.executeJavaScript(`
                            alert(
                                "🎮 YTBLEBOSS GAMES\\n\\n" +
                                "Version 1.0.0\\n" +
                                "Portail arcade Windows"
                            );
                        `);

                    }

                }

            ]

        }

    ]);

    Menu.setApplicationMenu(menu);

    win.on("closed", () => {
        win = null;
    });

}

app.whenReady().then(() => {

    createWindow();

    app.on("activate", () => {

        if (
            BrowserWindow
            .getAllWindows()
            .length === 0
        ) {

            createWindow();

        }

    });

});

app.on(
    "window-all-closed",
    () => {

        if (
            process.platform !== "darwin"
        ) {

            app.quit();

        }

    }
);

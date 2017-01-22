var play = {
    preload: function() {

    },
    create: function() {
        var style = {
            align: "center",
        };
        this.textoCreditos = game.add.text(game.world.centerX, 0, "play", style);
        this.textoCreditos.anchor.set(0.5);
        this.textoCreditos.fill = '#ffffff';
    }
};
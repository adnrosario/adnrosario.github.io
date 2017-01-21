var creditos = {
    preload: function() {
        game.load.image('FndInicio', 'assets/img/inicio/fndInicio.png');
        game.load.image('Clmr', 'assets/img/inicio/clmr.png');
        game.load.image('Vnt', 'assets/img/inicio/vnt.png');
        game.load.image('FndPrtc', 'assets/img/inicio/fndPrtc.png');

        game.load.shader('fndBacteria', 'assets/shaders/bacteria.frag');
    },
    create: function() {
        this.filter = new Phaser.Filter(game, null, game.cache.getShader('fndBacteria'));
        this.filter.addToWorld(0, 0, 900, 600);
        game.add.image(0, 0, 'FndInicio');
        game.add.image(0, 0, 'Clmr');
        game.add.image(0, 0, 'Vnt');
        game.add.image(0, 0, 'FndPrtc');

        var style = {
            align: "center",
        };
        this.textoCreditos = game.add.text(game.world.centerX, 600, "Arte - Visual\nZelmar Leonel\nCatalina Daffunchio\n\nGame Design\nAlejandra Malina\n\nMusica\nFederico Cardinale\nIngrid Verly\nMarcelo Monte\n\nProgramación\nAndrés Ditlevsen\nRomario Huebra", style);
        this.textoCreditos.anchor.set(0.5);
        this.textoCreditos.fill = '#ffffff';

        var ocultar = setTimeout(function() {
            game.state.start('inicio');
        }, 15000);

        game.input.onDown.add(function() {
            clearTimeout(ocultar);
            game.state.start('inicio');
        });
    }, 
    update: function() {
        this.textoCreditos.y -= 1;
        this.filter.update();
    }
}
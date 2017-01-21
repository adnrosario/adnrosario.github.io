var inicio = {
    preload: function() {
        game.load.image('FndInicio', 'assets/img/inicio/fndInicio.png');
        game.load.image('Clmr', 'assets/img/inicio/clmr.png');
        game.load.image('Vnt', 'assets/img/inicio/vnt.png');
        game.load.image('FndPrtc', 'assets/img/inicio/fndPrtc.png');
        game.load.spritesheet('BtnPlay', 'assets/img/inicio/btnPlay.png', 76, 76);
        game.load.spritesheet('BtnCrdts', 'assets/img/inicio/btnCrdts.png', 50, 50);
        game.load.image('Titulo', 'assets/img/inicio/titulo.png');

        game.load.shader('fndBacteria', 'assets/shaders/bacteria.frag');

        game.load.audio('Intro', 'assets/sounds/intro_tranqui_ADN.mp3');
        game.load.audio('Boton', 'assets/sounds/boton.mp3');
    },
    create: function() {
        this.filter = new Phaser.Filter(game, null, game.cache.getShader('fndBacteria'));
        this.filter.addToWorld(0, 0, 900, 600);
        game.add.image(0, 0, 'FndInicio');
        game.add.image(0, 0, 'Clmr');
        game.add.image(0, 0, 'Vnt');
        game.add.image(0, 0, 'FndPrtc');
        game.add.image(0, 0, 'Titulo');
        this.Boton = game.add.audio('Boton');

        this.botonInicio = game.add.button(game.world.centerX-95, 380, 'BtnPlay', function() {
            game.state.start('animales', true, false, 1, true);
            this.Boton.play();
            this.Intro.stop();
        }, this, 2, 1, 0);

        this.botonCredito = game.add.button(game.world.centerX, 406, 'BtnCrdts', function() {
            game.state.start('creditos');
            this.Boton.play();
            this.Intro.stop();
        }, this, 2, 1, 0);

        this.Intro = game.add.audio('Intro');
        this.Intro.play();
        this.Intro.loopFull();

    },
    update: function() {
        this.filter.update();
    }
};
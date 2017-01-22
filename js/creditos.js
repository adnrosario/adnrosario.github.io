var creditos = {
    preload: function() {
        this.tiempoFade = 1300;
        game.load.image('FndInicio', 'assets/img/inicio/fndInicio.png');
        game.load.image('Clmr', 'assets/img/inicio/clmr.png');
        game.load.image('Clmr2', 'assets/img/inicio/clmr2.png');
        game.load.image('Vnt', 'assets/img/inicio/vnt.png');
        game.load.image('FndPrtc', 'assets/img/inicio/fndPrtc.png');
        game.load.image('ElEquipo', 'assets/img/elEquipo.png');

        game.load.shader('fndBacteria', 'assets/shaders/bacteria.frag');
        game.load.audio('Intro', 'assets/sounds/intro_tranqui_ADN.mp3');
    },
    create: function() {
        this.filter = new Phaser.Filter(game, null, game.cache.getShader('fndBacteria'));
        this.filter.addToWorld(0, 0, 900, 600);
        game.add.image(0, 0, 'FndInicio');
        game.add.image(0, 0, 'Clmr');
        game.add.image(0, 0, 'Clmr2');
        game.add.image(0, 0, 'Vnt');
        game.add.image(0, 0, 'FndPrtc');

        var style = {
            align: "center",
        };
        this.textoCreditos = game.add.text(game.world.centerX, 600, "Arte - Visual\nZelmar Ramirez\nCatalina Daffunchio\n\nGame Design\nAlejandra Malina\n\nMúsica\nFederico Cardinale\nIgnacio Quiroz\nIngrid Verly\nMarcelo Monte\n\nProgramación\nAndrés Ditlevsen\nIgnacio Puccini\nRomario Huebra", style);
        this.textoCreditos.anchor.set(0.5);
        this.textoCreditos.fill = '#ffffff';
        this.ElEquipo = game.add.image(0, this.textoCreditos.y, 'ElEquipo');

        game.input.onDown.add( () => {
            clearTimeout(this.ocultar);
            this.Intro.stop();
            game.state.start('inicio');
        });

        this.Intro = game.add.audio('Intro');
        this.Intro.play();
        this.Intro.loopFull();
    }, 
    update: function() {
        this.textoCreditos.y -= 1;
        this.filter.update();
        if(this.ElEquipo.y !== 0) {
            this.ElEquipo.y = this.textoCreditos.y;
        }
        if(this.textoCreditos.y+300 === 0) {
            game.add.tween(this.ElEquipo).to({alpha: 0}, this.tiempoFade , Phaser.Easing.Linear.None, true, 0, 0, false);
            this.ocultar = setTimeout( () => {
                this.Intro.stop();
                game.state.start('inicio');
            }, this.tiempoFade);
        }
    }
}
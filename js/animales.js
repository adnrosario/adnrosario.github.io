var animales = {
    init: function(animal, exito) {
        this.numeroAnimal = animal;
        this.exito = exito;
        this.finDeJuego = !(this.numeroAnimal != 8 && exito);
        this.tiempo = 1000;
    },
    preload: function() {
        if(this.exito) {
            if(this.finDeJuego) {
                game.load.audio('Transicion', 'assets/sounds/exito.mp3'); 
                game.load.image('fnd', 'assets/img/animales/fndExito.png');
            }
            else {
                game.load.audio('Transicion', 'assets/sounds/transicion_juego.mp3');
                game.load.image('fnd', 'assets/img/animales/fnd.png');
            }
            game.load.image('prtc', 'assets/img/animales/prtc.png');
            game.load.image('Animal'+this.numeroAnimal, 'assets/img/animales/anm'+this.numeroAnimal+'.png');
        }
        else {
            game.load.audio('Transicion', 'assets/sounds/derrota.mp3');
            game.load.image('fnd', 'assets/img/animales/fndPerdio.png');
            game.load.image('Animal'+this.numeroAnimal, 'assets/img/animales/anm'+this.numeroAnimal+'.png');
        }
        
    },
    create: function() {
        game.add.image(0, 0, 'fnd');
        if(this.exito) {
            game.add.image(0, 0, 'prtc');
        }
        var animal = game.add.image(0, 0, 'Animal'+this.numeroAnimal);
        animal.alpha = 0;

        if(!this.finDeJuego) {
            setTimeout(function() {
                game.state.start('play');
            }, this.tiempo*2);
            game.add.tween(animal).to({alpha: 1}, this.tiempo , Phaser.Easing.Linear.None, true, 0, 0, true);
        }
        else {
            game.add.tween(animal).to({alpha: 1}, this.tiempo , Phaser.Easing.Linear.None, true, 0, 0, false);
            var tiempo = this.tiempo;
            game.input.onDown.add(function() {
                game.add.tween(animal).to({alpha: 0}, this.tiempo , Phaser.Easing.Linear.None, true, 0, 0, false);
                setTimeout(function() {
                    game.state.start('inicio');
                }, tiempo);
            });
        }

        this.Transicion = game.add.audio('Transicion');
        this.Transicion.play();
    }
}
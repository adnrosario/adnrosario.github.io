var play = {

    preload: function () {

        game.load.image('fondo', '/assets/img/fondoColor.png');
        game.load.image('cadenaGlow', '/assets/img/CadenaAdnGlow.png');
        game.load.image('cadena', '/assets/img/cdnAdn.png');
        game.load.image('luces', '/assets/img/fndLz.png');
        game.load.image('particula', '/assets/img/particula.png');

        game.load.audio('agarrar', 'assets/sounds/agarrar.mp3');
        game.load.audio('error', 'assets/sounds/error.mp3');
        game.load.audio('pegar', 'assets/sounds/pegar.mp3');
        game.load.audio('level1', 'assets/sounds/nivel1.mp3');

        //game.load.text('nivel1', 'niveles/nivel1.txt');

       
        this.nivel=[];

        for (var i = 0; i < 2; i++) {

            for (var j = 0; j < 14; j++) {

                game.load.image('pSnCl' + i + j, '/assets/img/level1/' + i + j + '.png');
                console.log('/assets/img/level1/' + i + j + '.png');

               
                pos=Math.floor((Math.random() * 2)); // entre 0 y 1
                num=Math.floor((Math.random() * 14)); // entre 0 y 13

                this.nivel.push(pos);
                this.nivel.push(num);

            }
        }


    },

    create: function () {


        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.add.image(0, 0, 'fondo');
        game.add.image(0, 0, 'luces');


        this.adn = game.add.tileSprite(0, game.world.centerY, 900, 189, 'cadena');
        this.adn.anchor.setTo(0, 0.5);

        this.glow = game.add.tileSprite(0, game.world.centerY, 900, 333, 'cadenaGlow');
        this.glow.anchor.setTo(0, 0.5);

        this.error = game.add.audio('error');
        this.pegar = game.add.audio('pegar');
        this.agarrar = game.add.audio('agarrar');
        this.level1 = game.add.audio('level1');
        this.level1.loopFull();
        this.level1.play();


        this.sinColocarGroup = game.add.physicsGroup();
        this.colocadasGroup = game.add.physicsGroup();


        //this.nivel = game.cache.getText('nivel1').split(',');
        console.log("Nivel: " + this.nivel);



        var x = 50;
        var y = 10;
        var foo = 0;


        this.sinColocar = [];
        this.colocadas = [];

        this.pz = [];
        this.posX = [];
        this.posY = [];

        for (i = 0; i < 14; i++) {
            for (j = 0; j < 2; j++) {


                indice = j * 14 + i;

                if (foo == 14) {
                    y += 480;
                    x = 50;
                }

                this.sinColocar[indice] = this.sinColocarGroup.create(x += 50, y, 'pSnCl' + j + i);
                this.sinColocar[indice].tipo = i;
                this.sinColocar[indice].upOrDown = j;
                this.sinColocar[indice].inputEnabled = true;
                this.sinColocar[indice].input.enableDrag(true);

                this.pz.push('' + j + i);
                this.posX.push(x);
                this.posY.push(y);


                this.sinColocar[indice].events.onDragStart.add(this.startDrag, this);
                this.sinColocar[indice].events.onDragStop.add(this.stopDrag, this);


                foo++;




            }

        }

        console.log("this.pz: ", this.pz);

        x = 650;


        for (i = 0; i < this.nivel.length; i += 2) {

            y = 215;
            indice = i * 0.5;

            upOrDown = this.nivel[i];
            if (upOrDown == 0) y = 297;

            tipo = this.nivel[i + 1];
            this.colocadas[indice] = this.colocadasGroup.create(x += 225, y, 'pSnCl' + upOrDown + tipo);
            this.colocadas[indice].upOrDown = upOrDown;
            this.colocadas[indice].inputEnabled = false;
            this.colocadas[indice].encastrada = -1;
            this.colocadas[indice].enable = true;
            this.colocadas[indice].tipo = tipo;


        }

        this.life = 5;


        this.emisor();

    },

    emisor: function () {

        emitter = game.add.emitter(game.world.centerX, 200, 200);
        emitter.width = 800;

        emitter.makeParticles('particula');

        emitter.minParticleSpeed.set(0, 300);
        emitter.maxParticleSpeed.set(0, 400);

        emitter.setRotation(0, 0);
        emitter.setAlpha(0.3, 0.8);
        emitter.setScale(0.5, 0.5, 1, 1);
        emitter.gravity = -200;

        //	false means don't explode all the sprites at once, but instead release at a rate of one particle per 100ms
        //	The 5000 value is the lifespan of each particle before it's killed
        emitter.start(false, 5000, 100);


    },

    startDrag: function (pieza) {

        this.agarrar.play();
    },

    stopDrag: function (pieza) {

        if (!game.physics.arcade.collide(pieza, this.colocadasGroup, this.collisionHandler, null, this)) {
            pieza.visible = false;
            this.agregarPieza(pieza);
        }

    },
    update: function () {

        this.moveAdn();
    },

    collisionHandler: function (pSnCl, pCl) {
        console.log("collisionHandler");

        //---------
        //encastre
        //---------

        if (pSnCl.tipo == pCl.tipo && pSnCl.upOrDown != pCl.upOrDown && pCl.encastrada < 0) {

            pSnCl.x = pCl.x;

            if (pCl.upOrDown == 0) pSnCl.y = pCl.y - 80;
            else pSnCl.y = pCl.y + 80;

            pCl.encastrada = this.arrayObjectIndexOf(this.sinColocar, pSnCl);

            this.agregarPieza(pSnCl);

            pSnCl.inputEnabled = false;

            game.camera.flash(0xffffff, 400);

            this.pegar.play();

            console.log("MATCH!!!  index: " + pCl.encastrada);
        } else {
            game.camera.flash(0xff0000, 400);
            game.camera.shake(0.02, 200);

            this.life--;

            pSnCl.visible = false;
            this.agregarPieza(pSnCl);

            this.error.play();

            console.log("NO MATCH  life: " + this.life);
            if (this.life <= 0)
                console.log("LOOOOSER");
        }

    },

    agregarPieza: function (pzSnCl) {

        var num;
        var n = pzSnCl.key.replace('pSnCl', '');

        for (var i = 0; i < this.pz.length; i++)
            if (this.pz[i] == n) num = i;


        pieza = this.sinColocarGroup.create(this.posX[num], this.posY[num], pzSnCl.key);

        console.log('Hola Mundo !!!');
        console.log('pzSnCl.key', pzSnCl.key);
        console.log('pieza', pieza);


        ultimo = this.sinColocar.length;
        this.sinColocar.push(pieza);

        this.sinColocar[ultimo].tipo = pzSnCl.tipo;
        this.sinColocar[ultimo].upOrDown = pzSnCl.upOrDown;
        this.sinColocar[ultimo].inputEnabled = true;
        this.sinColocar[ultimo].input.enableDrag(true);
        this.sinColocar[ultimo].events.onDragStop.add(this.stopDrag, this);
        this.sinColocar[ultimo].events.onDragStart.add(this.startDrag, this);

    },

    moveAdn: function () {

        vel = 0.1;

        this.adn.tilePosition.x -= vel * game.time.elapsed;
        this.glow.tilePosition.x -= vel * game.time.elapsed;

        for (i = 0; i < this.colocadas.length; i++) {
            if (this.colocadas[i].enable) {
                this.colocadas[i].x -= vel * game.time.elapsed;
                if (this.colocadas[i].encastrada >= 0)
                    this.sinColocar[this.colocadas[i].encastrada].x -= 0.1 * game.time.elapsed;


                if (this.colocadas[i].x < -50) {
                    if (this.colocadas[i].encastrada < 0) {

                        this.life--;
                        game.camera.flash(0xff0000, 400);
                        game.camera.shake(0.02, 200);
                    }
                    this.colocadas[i].enable = false;
                    console.log("Life: " + this.life);
                    if (this.life <= 0)
                        console.log("LOOOOSER");


                }
            }
        }
        if (!this.colocadas[this.colocadas.length - 1].enable) {
            if (this.life > 0)
                console.log("GANASTE!!!");
        }

    },

    arrayObjectIndexOf: function (myArray, object) {
        for (var i = 0, len = myArray.length; i < len; i++) {
            if (myArray[i] === object) return i;
        }
        return -1;
    }


};
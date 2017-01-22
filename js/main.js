var game = new Phaser.Game(900, 600, Phaser.AUTO, '');

game.state.add('inicio', inicio);
game.state.add('creditos', creditos);
game.state.add('animales', animales);
game.state.add('play', play);
game.state.start('inicio');
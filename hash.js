let hashGame = new Vue({
    el: "#hash",
    data: {
        players: [
            {name: "Jogador 1", points: 0, cursor: 1},
            {name: "Jogador 2", points: 0, cursor: 2}
        ],
        places: [0, 0, 0, 0, 0, 0, 0, 0, 0],
        whoPlay: {},
        winOptions: [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [6, 4, 2],
            [0, 4, 8]
        ],
        winner: false,
        draw: false
    },
    mounted (){
        this.randomStarter();
    },
    methods: {
        randomStarter () {
            this.whoPlay = this.players[Math.floor(Math.random() * this.players.length)];
            console.log("Esperando "+this.whoPlay.name+" jogar...");
        },
        resetGame() {
            this.places.map((e, i)=>{
                this.$set(this.places, i, 0);
            });
        },
        playerSelectPlace (place) {
            console.log(this.whoPlay.name+" fez sua jogada!");
            this.$set(this.places, place, this.whoPlay.cursor);
            let winner = this.checkIfHasWiner();
            if (winner.status) {
                this.players.map((player, index)=>{
                    if (player.name == winner.player.name) {
                        player.points++;
                    }
                });
            } else {
                if (this.verifyDraw()) {
                    console.log("Deu velha!");
                    this.draw = true;
                } else {
                    this.nextPlayer();
                }
            }
        },
        checkIfHasWiner () {
            console.log("Verificando se já existe um ganhador...");
            let winner =  {status: false};
            this.winOptions.map((opt, index) =>{
                let count = 0;
                opt.map((opt_, index_)=>{
                    if (this.places[opt_] == this.whoPlay.cursor) {
                        count++;
                    }
                });
                if (count >= 3) {
                    winner = {
                        status: true,
                        player: this.whoPlay
                    }
                    console.log("Parabéns "+this.whoPlay.name+" você venceu!");
                    console.log("O jogo foi reiniciado!");
                    this.winner = true;
                }
            });
            return winner;
        },
        verifyDraw () {
            let draw = true;
            this.places.map((e, i)=>{
                if (e == 0) {
                    draw = false;
                }
            });
            return draw;
        },
        nextPlayer () {
            this.players.map((e, i)=>{
                if (this.whoPlay.name != e.name) {
                    Vue.nextTick(()=>{
                        this.whoPlay = e;
                        console.log("Esperando "+this.whoPlay.name+" jogar...");
                    });
                }
            });
        },
        continueGame () {
            this.winner = false;
            this.draw = false;
            this.resetGame();
            this.randomStarter();
        }
    }
});
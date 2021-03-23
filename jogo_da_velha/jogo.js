var rodada = 1;
var matriz_jogo = Array(3);

matriz_jogo['a'] = Array(3);
matriz_jogo['b'] = Array(3);
matriz_jogo['c'] = Array(3);

matriz_jogo['a'][1] = 0;
matriz_jogo['a'][2] = 0;
matriz_jogo['a'][3] = 0;

matriz_jogo['b'][1] = 0;
matriz_jogo['b'][2] = 0;
matriz_jogo['b'][3] = 0;

matriz_jogo['c'][1] = 0;
matriz_jogo['c'][2] = 0;
matriz_jogo['c'][3] = 0;

$(document).ready(function(){

    $('#botaoInicio').click(function(){

        if($('#player1').val() == '' || $('#player2').val() == ''){
            alert('Digite os nomes dos jogadores!!');
            return false;
        }

        $('#show_player1').html($('#player1').val());
        $('#show_player2').html($('#player2').val());

        $('#pagina-inicial').hide();
        $('#area-jogo').show();
        
    });

    $('.jogada').click(function(){

        var id_click = this.id;
        $('#'+id_click).off();
        jogada(id_click);
    });

    function jogada(id){
       
        var icone = '';
        var ponto = 0;

        if(rodada % 2 == 1){
            $('#turno-player').html($('#player2').val());
            icone = 'url(imagens/marcacao_1.png)';
            ponto = -1;
        } else {
            $('#turno-player').html($('#player1').val());
            icone = 'url(imagens/marcacao_2.png)';
            ponto = 1;
        }
        rodada++;
        //console.log(rodada);
        $('#'+id).css('background-image',icone);
        
        var linha_coluna = id.split('-');

        matriz_jogo[linha_coluna[0]][linha_coluna[1]] = ponto;
        
        verifica_combinacao();
    }

    function verifica_combinacao(){

        //verifica na horizontal
        var pontos = 0;
        for(var i = 1; i <= 3; i++){
            pontos = pontos + matriz_jogo['a'][i];
        }
        ganhador(pontos);

        pontos = 0;
        for(var i = 1; i <= 3; i++){
            pontos = pontos + matriz_jogo['b'][i];
        }
        ganhador(pontos);

        pontos = 0;
        for(var i = 1; i <= 3; i++){
            pontos = pontos + matriz_jogo['c'][i];
        }
        ganhador(pontos);

        //verifica na vertical
        for(var v = 1; v <= 3; v++){
            pontos = 0;
            pontos += matriz_jogo['a'][v];
            pontos += matriz_jogo['b'][v];
            pontos += matriz_jogo['c'][v];

            ganhador(pontos);
        }

        //verifica na diagonal
        pontos = 0;
        pontos = matriz_jogo['a'][1] + matriz_jogo['b'][2] + matriz_jogo['c'][3];
        ganhador(pontos);

        pontos = 0;
        pontos = matriz_jogo['a'][3] + matriz_jogo['b'][2] + matriz_jogo['c'][1];
        ganhador(pontos);
        
    }

    function ganhador(pontos){
        var p1 = $('#player1').val();
        var p2 = $('#player2').val();
        if(pontos == -3){
            alert(p1 + ' é o vencedor!');
            $('.jogada').off();
            $('#turno-player').html('GAME OVER');
        } else if(pontos == 3){
            alert(p2 + ' é o vencedor!');
            $('.jogada').off();
            $('#turno-player').html('GAME OVER');
        }
    }
});


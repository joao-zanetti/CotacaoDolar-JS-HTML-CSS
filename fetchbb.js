var resultDisplay = document.querySelector('body');
var dia= document.querySelector('#datadia');
var mes= document.querySelector('#datames');
var dataform = document.querySelector('#dataform');
var table= document.querySelector('#tcotacoes');
var somacompra=0;
var somavenda=0;

dataform.onsubmit= function(e){
  e.preventDefault();


  var anoi= 2018;
  var diai= dia.value;
  var mesi= mes.value;
  var dataiInput=mesi+'-'+diai+'-'+anoi;
  url1="https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?$top=1&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao&@dataCotacao='"; 
  url2=dataiInput+"'"; //valor data inicial incorporado na url
  url=url1+url2;

  fetch(url).then(function(response) { //requisição é feita para o BB retornando JSON 
    response.json().then(function(json) {
      if(json['value'].length==0){
        alert('O site do Banco do Brasil não possui informação desta data, favor informar outra data');
      }
      else{
        resArray =json['value'];
        var valores = [];
        somacompra+=resArray[0].cotacaoCompra;
        somavenda+=resArray[0].cotacaoVenda;
        valores.push(resArray[0].cotacaoCompra);
        valores.push(resArray[0].cotacaoVenda);
        valores.push(resArray[0].dataHoraCotacao);

        var tr = document.createElement('tr'); 
        table.appendChild(tr);
        for (var i=0; i<valores.length;i++){
          var td = document.createElement('td');
          var texttd=document.createTextNode(valores[i]);
          td.appendChild(texttd);
          tr.appendChild(td);
        }
        var button = document.createElement('button');
        var texttd=document.createTextNode('DELETAR');
        button.appendChild(texttd);
        button.addEventListener("click",function(){
          var alo= button.parentNode.parentNode.childNodes;
          somacompra-=alo[0].innerHTML;
          somavenda-=alo[1].innerHTML;
          button.parentNode.parentNode.parentNode.removeChild(tr);
          var sc= document.querySelector('#somaccompra');
          sc.innerHTML=somacompra;
          var sv= document.querySelector('#somacvenda');
          sv.innerHTML=somavenda;
        });

        var td2 = document.createElement('td');
        td2.appendChild(button);
        tr.appendChild(td2);

        var sc= document.querySelector('#somaccompra');
        sc.innerHTML=somacompra;
        var sv= document.querySelector('#somacvenda');
        sv.innerHTML=somavenda;

      }
      
    });
  }).catch(function(err) {
    console.log('Fetch problem: ' + err.message);
  });
};



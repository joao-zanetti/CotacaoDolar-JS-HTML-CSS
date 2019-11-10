var cotacaoSel = document.querySelector('#tipocotacao');
var mesiSel = document.querySelector('#mesi');
var mesfSel = document.querySelector('#mesf');
var diai = document.querySelector('#diai');
var diaf = document.querySelector('#diaf');
var anoi = document.querySelector('#anoi');
var anof = document.querySelector('#anof');
var resultDisplay = document.querySelector('pre');
var form= document.getElementById('dataform');
var tipocotacao ='Compra'; //INICIALIZA COMO COTACAO DE COMPRA
var mesi =1;
var mesf =1;
var diai =1;
var diaf =1;



cotacaoSel.onchange = function() { 
  tipocotacao = cotacaoSel.value;
};

mesiSel.onchange = function() { 
  mesi = mesiSel.value;
  console.log(mesi);
};

mesfSel.onchange = function() { 
  mesf = mesfSel.value;
};

form.onsubmit= function(e){
  e.preventDefault();
  url1="https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarPeriodo(dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?$top=90&$format=json&";
  url2="@dataInicial='"+dataiInput.value; //valor data inicial incorporado na url
  url3="'&@dataFinalCotacao='"+datafInput.value+"'"; //valor data final incorporado na url
  url=url1+url2+url3;

  fetch(url).then(function(response) { //requisição é feita para o BB retornando JSON 
    response.json().then(function(json) {
      resArray =json['value'];

      if(tipocotacao=='Compra'){   //se a requisição é de compra.
        resultDisplay.textContent='COTAÇÕES DE COMPRA';
        for (var i=0; i<resArray.length;i++){
          console.log(resArray[i].cotacaoCompra);
          var para = document.createElement('p');
          para.textContent = resArray[i].cotacaoCompra;
          resultDisplay.appendChild(para);
        }
      }
      else{ //se a requisição é de compra.
        resultDisplay.textContent='COTAÇÕES DE VENDA';
        for (var i=0; i<resArray.length;i++){
          console.log(resArray[i].cotacaoVenda);
          var para = document.createElement('p');
          para.textContent = resArray[i].cotacaoVenda;
          resultDisplay.appendChild(para);
        }
      }
    });
  }).catch(function(err) {
    console.log('Fetch problem: ' + err.message);
  });


};

cotacaoSel.value = 'Compra'; //INICIALIZA COMO COTACAO DE COMPRA
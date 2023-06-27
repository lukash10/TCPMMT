<template>
  <main>
    <Header></Header>

    <div class="container mt-3">
      <div class="row">
        <b-button style="background-color: #faebd700;color: black;border: none;" @click="$router.push(`/generic?id=${form.casoId}`)">
          <i class="fa-solid fa-backward fa-xl" style="color:#06569b"></i> <b>Voltar</b>
        </b-button>
        <div class="col d-flex" style="justify-content: center;align-items: center;">
          <h4 class="text-center mt-2">Formulário de Visita</h4> 
        </div>
      </div>
    </div>

    <form @submit.prevent="onSubmit">

      <div id="dados1" class="" style="margin:10px;border: 1px solid #0000001c;;padding:10px;border-radius: 5px;">
        <div class="row">
          <div class="col">
            <div class="form-floating mb-3">
              <input class="form-control" style="font-size: 16px !important" id="floatingInput" placeholder="Digite o número do relatório" v-model="form.numeroRelatorio">
              <label for="floatingInput">Nº Relatório: </label>
            </div>
          </div>

          <div class="col">
            <div class="form-floating mb-2">
              <input class="form-control" style="font-size: 16px !important" id="floatingPassword" placeholder="Código da Medida Protetiva" v-model="form.dados.codMP">
              <label for="floatingPassword">Nº/Cód Medida Protetiva: </label>
            </div>
          </div>

        </div>

        <div class="form-floating mb-2">
          <input v-model="form.dados.nomeVIT" class="form-control" style="font-size: 16px !important" id="floatingPassword" placeholder="Nome da Vítima">
          <label for="floatingPassword">Nome da Vítima: </label>
        </div>

      </div>

      <div id="dados2" class="" style="margin:10px;border: 1px solid #0000001c;;padding:10px;border-radius: 5px;">

        <div class="form-floating mb-2">
          <input v-model="form.dados.logradouro" class="form-control" style="font-size: 16px !important" id="floatingPassword" placeholder="Logradouro">
          <label for="floatingPassword">Logradouro: </label>
        </div>

        <div class="row">

          <div class="col">
            <div class="form-floating mb-2">
              <input v-model="form.dados.numeroCS" class="form-control" style="font-size: 16px !important" id="floatingPassword" placeholder="Número da Casa">
              <label for="floatingPassword">Nº</label>
            </div>
          </div>

          <div class="col">
            <div class="form-floating mb-2">
              <input v-model="form.dados.bairro" class="form-control" style="font-size: 16px !important" id="floatingPassword" placeholder="Bairro">
              <label for="floatingPassword">Bairro: </label>
            </div>
          </div>

          <div class="col">
            <div class="form-floating mb-2">
              <input v-model="form.dados.tel" class="form-control" style="font-size: 16px !important" id="floatingPassword" placeholder="Telefone">
              <label for="floatingPassword">Telefone: </label>
            </div>
          </div>

        </div>

      </div>

      <div id="dados3" class="" style="margin:10px;border: 1px solid #0000001c;;padding:10px;border-radius: 5px;">

        <div class="mt-2 mb-2 form-lks" style="background-color:#f7f7f7">
          <label class="d-flex mb-2">1. Está ciente das Medidas Protetivas deferidas à sua pessoa, as quais lhe foram
            lidas e explicadas neste ato? </label>

          <div class="">
            <div class="form-check form-check-inline">
              <input v-model="form.dados.q1.resposta" class="form-check-input" type="radio" name="inlineRadioOptions1" id="inlineRadio1" :value="true">
              <label class="form-check-label" for="inlineRadio1">Sim</label>
            </div>

            <div class="form-check form-check-inline">
              <input v-model="form.dados.q1.resposta" class="form-check-input" type="radio" name="inlineRadioOptions2" id="inlineRadio2" :value="false">
              <label class="form-check-label" for="inlineRadio2">Não</label>
            </div>
          </div>
        </div>

        <div class="mt-2 mb-2 form-lks">
          <label class="d-flex mb-2">2. Está ciente do número de telefone da Patrulha Rede de Frente para contato,
            caso necessário? </label>

          <div class="">
            <div class="form-check form-check-inline">
              <input v-model="form.dados.q2.resposta" class="form-check-input" type="radio" name="inlineRadioOptions3" id="inlineRadio3" :value="true">
              <label class="form-check-label" for="inlineRadio3">Sim</label>
            </div>

            <div class="form-check form-check-inline">
              <input v-model="form.dados.q2.resposta" class="form-check-input" type="radio" name="inlineRadioOptions4" id="inlineRadio4" :value="false">
              <label class="form-check-label" for="inlineRadio4">Não</label>
            </div>
          </div>
        </div>

        <div class="mt-2 mb-2 form-lks" style="background-color:#f7f7f7">
          <label class="d-flex mb-2">3. Está ciente que pode procurar a Defensoria Pública para resolver as questões
            cíveis, caso não tenha advogado constituído? </label>

          <div class="">
            <div class="form-check form-check-inline">
              <input v-model="form.dados.q3.resposta" class="form-check-input" type="radio" name="inlineRadioOptions5" id="inlineRadio5"
                                                                                                                       :value="true">
              <label class="form-check-label" for="inlineRadio5">Sim</label>
            </div>

            <div class="form-check form-check-inline">
              <input v-model="form.dados.q3.resposta" class="form-check-input" type="radio" name="inlineRadioOptions6" id="inlineRadio6"
                                                                                                                       :value="false">
              <label class="form-check-label" for="inlineRadio6">Não</label>
            </div>
          </div>
        </div>

        <div class="mt2 mb-2 form-lks">
          <label class="d-flex mb-2">4. O Agressor continua importunando, mesmo após a concessão das Medidas Protetivas? </label>

          <div class="mt-2 mb-2">
            <div class="form-check form-check-inline">
              <input v-model="form.dados.q4.resposta" class="form-check-input" type="radio" name="inlineRadioOptions8" id="inlineRadio8"
                                                                                                                       :value="true">
              <label class="form-check-label" for="inlineRadio8">Sim</label>
            </div>

            <div class="form-check form-check-inline">
              <input v-model="form.dados.q4.resposta" class="form-check-input" type="radio" name="inlineRadioOptions9" id="inlineRadio9"
                                                                                                                       :value="false">
              <label class="form-check-label" for="inlineRadio9">Não</label>
            </div>
          </div>


          <div v-if="form.dados.q4.resposta" class="mt-2 mb-2 form-lks">

            <div class="form-check form-check-inline">
              <input v-model="form.dados.q4.tipo" class="form-check-input" type="radio" name="inlineRadioOptions10" id="inlineRadio10" value="LIGACAO">
              <label class="form-check-label" for="inlineRadio10">Ligação</label>
            </div>

            <div class="form-check form-check-inline">
              <input v-model="form.dados.q4.tipo" class="form-check-input" type="radio" name="inlineRadioOptions11" id="inlineRadio11" value="VISITADOMICILIO">
              <label class="form-check-label" for="inlineRadio11">Visita em Domicílio</label>
            </div>

            <div class="form-check form-check-inline">
              <input v-model="form.dados.q4.tipo" class="form-check-input" type="radio" name="inlineRadioOptions12" id="inlineRadio12" value="VISITALOCALTRABALHO">
              <label class="form-check-label" for="inlineRadio12">Visita no local de Trabalho</label>
            </div>

            <div class="form-check form-check-inline">
              <input v-model="form.dados.q4.tipo" class="form-check-input" type="radio" name="inlineRadioOptions13" id="inlineRadio13" value="RECADOTERCEIROS">
              <label class="form-check-label" for="inlineRadio13">Recado por terceiros</label>
            </div>

            <div class="form-check form-check-inline">
              <input v-model="form.dados.q4.tipo" class="form-check-input" type="radio" name="inlineRadioOptions14" id="inlineRadio14" value="REDESOCIAL">
              <label class="form-check-label" for="inlineRadio14">Rede Social</label>
            </div>

            <div class="form-check form-check-inline">
              <input v-model="form.dados.q4.tipo" class="form-check-input" type="radio" name="inlineRadioOptions14" id="inlineRadio14" value="BILHETE">
              <label class="form-check-label" for="inlineRadio14">Bilhetes/Cartas</label>
            </div>

            <div class="form-floating mt-2 mb-2">
              <textarea v-model="form.dados.q4.descricao" class="form-control" placeholder="Leave a comment here" id="floatingTextarea15" style="height: 100px"></textarea>
              <label for="floatingTextarea15">Outros? Especifique.</label>
            </div>

            <div class="mt-2 mb-2 form-lks">
              <label class="d-flex mb-2">4.1. Especifique a frequência que ocorre as importunações.</label>

              <div>
                <div class="form-check form-check-inline">
                  <input v-model="form.dados.q4.tipoB" class="form-check-input" type="radio" name="inlineRadioOptions15" id="inlineRadio15" value="option1">
                  <label class="form-check-label" for="inlineRadio15">Diária</label>
                </div>

                <div class="form-check form-check-inline">
                  <input v-model="form.dados.q4.tipoB" class="form-check-input" type="radio" name="inlineRadioOptions16" id="inlineRadio16" value="option2">
                  <label class="form-check-label" for="inlineRadio16">Semanal</label>
                </div>

                <div class="form-check form-check-inline">
                  <input v-model="form.dados.q4.tipoB" class="form-check-input" type="radio" name="inlineRadioOptions17" id="inlineRadio17" value="option2">
                  <label class="form-check-label" for="inlineRadio17">Quizenal</label>
                </div>

                <div class="form-check form-check-inline">
                  <input v-model="form.dados.q4.tipoB" class="form-check-input" type="radio" name="inlineRadioOptions18" id="inlineRadio18" value="option2">
                  <label class="form-check-label" for="inlineRadio18">Mensal</label>
                </div>

                <div class="form-floating mt-2 mb-2">
                  <textarea v-model="form.dados.q4.descricaoB" class="form-control" placeholder="Leave a comment here" id="floatingTextarea19" style="height: 100px">
                  </textarea>
                  <label for="floatingTextarea19">Outros? Especifique.</label>
                </div>

              </div>
            </div>

          </div>


        </div>

        <div class="mt-2 mb-2 form-lks" style="background-color:#f7f7f7">
          <label class="d-flex mb-2">5. A família está prestando auxílio? </label>

          <div>
            <div class="form-check form-check-inline">
              <input v-model="form.dados.q5.resposta" class="form-check-input" type="radio" name="inlineRadioOptions20" id="inlineRadio20"
                                                                                                                        :value="true">
              <label class="form-check-label" for="inlineRadio20">Sim</label>
            </div>

            <div class="form-check form-check-inline">
              <input v-model="form.dados.q5.resposta" class="form-check-input" type="radio" name="inlineRadioOptions21" id="inlineRadio21"
                                                                                                                        :value="false">
              <label class="form-check-label" for="inlineRadio21">Não</label>
            </div>
          </div>

          <div v-if="form.dados.q5.resposta">
            <p class="mt-3"><b>Com qual frequência? </b></p>
            <div class="form-check form-check-inline">
              <input v-model="form.dados.q5.tipo" class="form-check-input" type="radio" name="inlineRadioOptions22" id="inlineRadio22"
                                                                                                                    value="MORAL">
              <label class="form-check-label" for="inlineRadio22">Moral</label>
            </div>

            <div class="form-check form-check-inline">
              <input v-model="form.dados.q5.tipo" class="form-check-input" type="radio" name="inlineRadioOptions23" id="inlineRadio23"
                                                                                                                    value="SENTIMENTAL">
              <label class="form-check-label" for="inlineRadio23">Sentimental</label>
            </div>

            <div class="form-check form-check-inline">
              <input v-model="form.dados.q5.tipo" class="form-check-input" type="radio" name="inlineRadioOptions24" id="inlineRadio24"
                                                                                                                    value="FINANCEIRO">
              <label class="form-check-label" for="inlineRadio24">Financeiro</label>
            </div>

          </div>
        </div>

        <div class="mt-2 mb-2 form-lks" >
          <label class="d-flex mb-2">6. A vítima exerce atividade remunerada? Se positivo, qual ? </label>

          <div>
            <div class="form-check form-check-inline">
              <input v-model="form.dados.q6.resposta" class="form-check-input" type="radio" name="inlineRadioOptions22" id="inlineRadio22"
                                                                                                                        :value="true">
              <label class="form-check-label" for="inlineRadio22">Sim</label>
            </div>

            <div class="form-check form-check-inline">
              <input v-model="form.dados.q6.resposta" class="form-check-input" type="radio" name="inlineRadioOptions23" id="inlineRadio23"
                                                                                                                        :value="false">
              <label class="form-check-label" for="inlineRadio23">Não</label>
            </div>
          </div>

          <div v-if="form.dados.q6.resposta" class="form-floating mt-2 mb-2">
            <textarea v-model="form.dados.q6.descricao" class="form-control" placeholder="Leave a comment here" id="floatingTextarea24"
                                                                                                                style="height: 100px"></textarea>
            <label for="floatingTextarea24">Outros? Especifique.</label>
          </div>

        </div>

        <div class="mt-2 mb-2 form-lks" style="background-color:#f7f7f7">
          <label class="d-flex mb-2">7. A vítima tem filhos menores de idade? Se positivo, quantos? </label>

          <div>
            <div class="form-check form-check-inline">
              <input v-model="form.dados.q7.resposta" class="form-check-input" type="radio" name="inlineRadioOptions25" id="inlineRadio25" :value="true">
              <label class="form-check-label" for="inlineRadio25">Sim</label>
            </div>

            <div class="form-check form-check-inline">
              <input v-model="form.dados.q7.resposta" class="form-check-input" type="radio" name="inlineRadioOptions26" id="inlineRadio26" :value="false">
              <label class="form-check-label" for="inlineRadio26">Não</label>
            </div>
          </div>

          <div v-if="form.dados.q7.resposta" class="form-floating mt-2 mb-2">
            <textarea v-model="form.dados.q7.descricao" class="form-control" placeholder="Leave a comment here" id="floatingTextarea27" style="height: 100px"></textarea>
            <label for="floatingTextarea27">Quantos filhos? Especifique.</label>
          </div>

        </div>

        <div class="mt-2 mb-2 form-lks">
          <label class="d-flex mb-2">8. Em decorrência da violência sofrida, a vítima está necessitando de algum
            encaminhamento/orientação? Se positivo, qual? </label>

          <div>
            <div class="form-check form-check-inline">
              <input v-model="form.dados.q8.resposta" class="form-check-input" type="radio" name="inlineRadioOptions28" id="inlineRadio28" :value="true">
              <label class="form-check-label" for="inlineRadio28">Sim</label>
            </div>

            <div class="form-check form-check-inline">
              <input v-model="form.dados.q8.resposta" class="form-check-input" type="radio" name="inlineRadioOptions29" id="inlineRadio29" :value="false">
              <label class="form-check-label" for="inlineRadio29">Não</label>
            </div>
          </div>

          <div v-if="form.dados.q8.resposta" class="form-floating mt-2 mb-2">
            <textarea v-model="form.dados.q8.descricao" class="form-control" placeholder="Leave a comment here" id="floatingTextarea30" style="height: 100px"></textarea>
            <label for="floatingTextarea2">Especifique.</label>
          </div>

        </div>

        <div class="mt-2 mb-2 form-lks" style="background-color:#f7f7f7">
          <label class="d-flex mb-2">9. O Autor do fato retornou a conviver com a vítima, sob o mesmo teto? </label>

          <div>
            <div class="form-check form-check-inline">
              <input v-model="form.dados.q9.resposta" class="form-check-input" type="radio" name="inlineRadioOptions31" id="inlineRadio31" :value="true">
              <label class="form-check-label" for="inlineRadio31">Sim</label>
            </div>

            <div class="form-check form-check-inline">
              <input v-model="form.dados.q9.resposta" class="form-check-input" type="radio" name="inlineRadioOptions32" id="inlineRadio32" :value="false">
              <label class="form-check-label" for="inlineRadio32">Não</label>
            </div>
          </div>

          <div v-if="form.dados.q9.resposta" class="form-floating mt-2 mb-2">
            <textarea v-model="form.dados.q9.descricao" class="form-control" placeholder="Leave a comment here" id="floatingTextarea33"
                                                                                                                style="height: 100px"></textarea>
            <label for="floatingTextarea33">Por que? Certifique em termo apartado.</label>
          </div>

        </div>

        <div class="mt-2 mb-2 form-lks">
          <label class="d-flex mb-2">10. O Autor do fato continua a oferecer riscos? Se sim, especifique. </label>

          <div>
            <div class="form-check form-check-inline">
              <input v-model="form.dados.q10.resposta" class="form-check-input" type="radio" name="inlineRadioOptions34" id="inlineRadio34" :value="true">
              <label class="form-check-label" for="inlineRadio34">Sim</label>
            </div>

            <div class="form-check form-check-inline">
              <input v-model="form.dados.q10.resposta" class="form-check-input" type="radio" name="inlineRadioOptions34" id="inlineRadio34" :value="false">
              <label class="form-check-label" for="inlineRadio34">Não</label>
            </div>
          </div>


          <div v-if="form.dados.q10.resposta" class="form-floating mt-2 mb-2" >
            <textarea v-model="form.dados.q10.descricao" class="form-control" placeholder="Leave a comment here" id="floatingTextarea35"
                                                                                                                 style="height: 100px"></textarea>
            <label for="floatingTextarea35">Por que? Especifique.</label>
          </div>

        </div>

        <div class="mt-2 mb-2 form-lks" style="background-color:#f7f7f7">
          <label class="d-flex mb-2">11. Agora sente-se segura? </label>

          <div>
            <div class="form-check form-check-inline">
              <input v-model="form.dados.q11.resposta" class="form-check-input" type="radio" name="inlineRadioOptions36" id="inlineRadio36" :value="true">
              <label class="form-check-label" for="inlineRadio36">Sim</label>
            </div>

            <div class="form-check form-check-inline">
              <input v-model="form.dados.q11.resposta" class="form-check-input" type="radio" name="inlineRadioOptions37" id="inlineRadio37" :value="false">
              <label class="form-check-label" for="inlineRadio37">Não</label>
            </div>
          </div>

          <div v-if="form.dados.q11.resposta">

            <p class="mt-3"><b>Se sim, explique o motivo</b></p>


            <div class="form-check form-check-inline">
              <input v-model="form.dados.q11.tipo" class="form-check-input" type="radio" name="inlineRadioOptions38" id="inlineRadio38" value="NAOTIVECONTATO">
              <label class="form-check-label" for="inlineRadio38">Não tive mais contato com Agressor</label>
            </div>

            <div class="form-check form-check-inline">
              <input v-model="form.dados.q11.tipo" class="form-check-input" type="radio" name="inlineRadioOptions39" id="inlineRadio39" value="RECEBIDOAPOIOFAMILIA">
              <label class="form-check-label" for="inlineRadio39">Tenho recebido apoio da Família</label>
            </div>

            <div class="form-check form-check-inline">
              <input v-model="form.dados.q11.tipo" class="form-check-input" type="radio" name="inlineRadioOptions40" id="inlineRadio40" value="MUDANCACOMPORTAMENTOAGRESSOR">
              <label class="form-check-label" for="inlineRadio40">Mudança de comportamento do Agressor</label>
            </div>

            <div class="form-floating mt-2 mb-2">
              <textarea v-model="form.dados.q11.descricao" class="form-control" placeholder="Leave a comment here" id="floatingTextarea41" style="height: 100px"></textarea>
              <label for="floatingTextarea41">Outros? Especifique.</label>
            </div>
          </div>

          <!-- SE NÃO, ABRIR ESSA DIV -->
          <div v-if="!form.dados.q11.resposta && form.dados.q11.resposta != null" class="form-floating mt-2 mb-2">
            <textarea v-model="form.dados.q11.descricao" class="form-control" placeholder="Leave a comment here" id="floatingTextarea42"
                                                                                                                 style="height: 100px"></textarea>
            <label for="floatingTextarea42">Caso Negativo? Especifique o por que.</label>
          </div>

        </div>


        <div class="mt-2 mb-2 form-lks">
          <label class="d-flex mb-2">12. A Vítima está frequentando o CREAS para receber atendimento psicossocial?
          </label>

          <div>
            <div class="form-check form-check-inline">
              <input v-model="form.dados.q12.resposta" class="form-check-input" type="radio" name="inlineRadioOption43" id="inlineRadio43"
                                                                                                                        :value="true">
              <label class="form-check-label" for="inlineRadio43">Sim</label>
            </div>

            <div class="form-check form-check-inline">
              <input v-model="form.dados.q12.resposta" class="form-check-input" type="radio" name="inlineRadioOptions44" id="inlineRadio44"
                                                                                                                         :value="false">
              <label class="form-check-label" for="inlineRadio44">Não</label>
            </div>
          </div>

          <div v-if="form.dados.q12.resposta" class="form-floating mt-2 mb-2">
            <textarea v-model="form.dados.q12.descricao" class="form-control" placeholder="Leave a comment here" id="floatingTextarea45"
                                                                                                                 style="height: 100px"></textarea>
            <label for="floatingTextarea45">Qual a periodicidade (frequência) ?</label>
          </div>

          <!-- SE NÃO, ABRIR ESSA DIV -->
          <div v-if="!form.dados.q12.resposta && form.dados.q12.resposta != null " class="form-floating mt-2 mb-2">
            <textarea v-model="form.dados.q12.descricao" class="form-control" placeholder="Leave a comment here" id="floatingTextarea46"
                                                                                                                 style="height: 100px"></textarea>
            <label for="floatingTextarea46">Por que não está frenquentando ?</label>
          </div>

        </div>

        <div class="mt-2 mb-2 form-lks" style="background-color:#f7f7f7">
          <label class="d-flex mb-2">13. Deseja permanecer com o acompanhamento da Patrulha Rede de Frente?</label>

          <div>
            <div class="form-check form-check-inline">
              <input v-model="form.dados.q13.resposta" class="form-check-input" type="radio" name="inlineRadioOptions47" id="inlineRadio47" :value="true">
              <label class="form-check-label" for="inlineRadio47">Sim</label>
            </div>

            <div class="form-check form-check-inline">
              <input v-model="form.dados.q13.resposta" class="form-check-input" type="radio" name="inlineRadioOptions48" id="inlineRadio48" :value="false">
              <label class="form-check-label" for="inlineRadio48">Não</label>
            </div>
          </div>

          <div v-if="!form.dados.q13.resposta && form.dados.q13.resposta != null" class="form-floating mt-2 mb-2">
            <textarea v-model="form.dados.q13.descricao" class="form-control" placeholder="Leave a comment here" id="floatingTextarea49"
                                                                                                                 style="height: 100px"></textarea>
            <label for="floatingTextarea49">Caso negativo, certifique em termo apartado.</label>
          </div>

        </div>

      </div>

      <div id="dados4" class="" style="margin:10px;border: 1px solid #0000001c;;padding:10px;border-radius: 5px;">

        <div>
          <label for="exampleFormControlTextarea50" class="form-label mb-2">Observações pertinentes caso haja necessidade.</label>
          <textarea v-model="form.dados.observacoes" class="form-control" id="exampleFormControlTextarea50" rows="3"></textarea>
        </div>

        <div>
          <label for="exampleFormControlTextarea52" class="form-label mb-2">Data</label>
          <textarea class="form-control" id="exampleFormControlTextarea52" rows="1" disabled>{{ currentDate }}</textarea>
        </div>


        <div class="form-floating mt-2 mb-2">
          <input v-model="form.dados.pmFiscalizador" class="form-control" style="font-size: 16px !important" id="floatingPassword53"
                                                                                                             placeholder="Digite o mês. Ex: Abril">
          <label for="floatingPassword53">PM Fiscalizador: </label>
        </div>

        <div class="form-floating mb-2">
          <input v-model="form.dados.matricula" class="form-control" style="font-size: 16px !important" id="floatingPassword54"
                                                                                                        placeholder="Digite o mês. Ex: Abril">
          <label for="floatingPasswod54">Matrícula Funcional: </label>
        </div>

      </div>


      <div class="mt-5" style="background-color:rgb(6, 86, 155)">
        <div class="p-3 d-flex" style="justify-content: center;">
          <button type="submit" class="mx-2 mt-3 mb-5 btn btn-success">Enviar Dados</button>
          <button class="mx-2 mt-3 mb-5 btn btn-primary" @click="$router.push(`/generic?id=${form.casoId}`)">Voltar</button>
        </div>
      </div>




    </form>

  </main>




</template>

<style scoped>

.form-lks {
  background-color: white;
  padding: 10px;
  border-radius: 10px;
}

</style>

<script>

  import Header from '../component-View/Header.vue';
  import Footer from '../component-View/Footer.vue';
  import api from '../api.js';
  import Vue from 'vue';

  export default {
    name: "FormVisita1",
    components: {
      Header: Header,
      Footer: Footer
    },
    data() {
      return {
        currentDate: null,
        geoLocation: {},
        casoId: null,
        form: {
          tipo: "VISITA1",
          numeroRelatorio: null,
          lat: "",
          lng: "",
          dados: {
            nomeVIT: null,
            logradouro: null,
            numeroCS: null,
            bairro: null,
            tel: null,
            codMP: null,
            observacoes: null,
            pmFiscalizador: null,
            q1: {
              resposta: null
            },
            q2: {
              resposta: null
            },
            q3: {
              resposta: null
            },
            q4: {
              resposta: null,
              tipo:null,
              descricao:null,
              tipoB:null,
              descricaoB:null
            },
            q5: {
              resposta: null,
              tipo: null
            },
            q6: {
              resposta: null,
              descricao:null
            },
            q7: {
              resposta: null,
              descricao:null
            },
            q8: {
              resposta: null,
              descricao:null
            },
            q9: {
              resposta: null,
              descricao:null
            },
            q10: {
              resposta: null,
            },
            q11: {
              resposta: null,
              tipo:null,
              descricao:null
            },
            q12: {
              resposta: null,
              descricao:null
            },
            q13: {
              resposta: null,
              descricao:null
            },
          }
        },
        show: true
      }
    },
    async mounted() {

      if (!await this.isLoggedIn()) {
        this.$router.push('/');
      }

      console.log('UUUID', this.casoId = this.$route.query.id);
      this.casoId = this.$route.query.id; // Caso id pela url

      this.getCurrentDate();
      this.getGeoPosition();
    },
    methods: {
      getCurrentDate(){
        const date = new Date();
        this.currentDate = date.toLocaleDateString('pt-br');
      },
      async onSubmit(event) {

        event.preventDefault()

        this.form.lat = this.geoLocation.coords.latitude;
        this.form.lng = this.geoLocation.coords.longitude;

        var caso = await this.getCasoById(this.casoId); // pega o caso por ID

        this.form.id = Vue.uuid(); // gera um id

        caso.formularios.push(this.form); // da um append

        const updatedCaso = await this.updateCaso(caso); // update no banco local


        //if (online)
        if(navigator.online){
          await api.saveSync(updatedCaso); // update na api
        }
        // await api.createFormulario(this.form);

        alert('Formulário Salvo com sucesso.');
        this.$router.push(`/generic?id=${this.casoId}`);
      },
      getGeoPosition() {
        if(!("geolocation" in navigator)) {
          console.log("Erro ao pegar loc. do GPS");
          return;
        }

        navigator.geolocation.getCurrentPosition(pos => {
          this.geoLocation = pos;
          console.log(this.geoLocation);
        }, err => {
          console.log("Erro ao pegar loc do GPS", err);
        })
      }
    }
  }
</script>

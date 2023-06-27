<template>

  <div class="Home" style="height: 100vh;">

    <Header></Header>

    <div class="container mt-3">
      <div class="row">
        <b-button style="background-color: #faebd700;color: black;border: none;" @click="$router.push(`/generic?id=${form.casoId}`)"><i class="fa-solid fa-backward fa-xl" style="color:#06569b"></i> <b>Voltar</b> </b-button>
        <div class="col d-flex" style="justify-content: center;align-items: center;">
          <h4 class="text-center mt-2">Formulário de Visita de Acompanhamento</h4> 
        </div>
      </div>
    </div>
    
    <form class="mt-4" @submit.prevent="onSubmit" style="width: 100% !important;padding:0px;">

      <div id="dados" class="dadosFORM">

        <div class="Init">
          <div class="row">

            <div class="col">
              <div class="form-floating mb-3">
                <input class="form-control fontFORM" id="floatingInput1" placeholder="Digite o nº do relatório..." v-model="form.numeroRelatorio">
                <label for="floatingInput1">Nº Relatório: </label>
              </div>
            </div>

            <div class="col">
              <div class="form-floating mb-2">
                <input class="form-control fontFORM" id="floatingPassword2" placeholder="Digite o Cód/Medida Protetiva..." v-model="form.dados.codMP">
                <label for="floatingPassword2">Nº/Cód Medida Protetiva: </label>
              </div>
            </div>

          </div>

          <div class="row">

            <div class="col">
              <div class="form-floating mb-2">
                <input class="form-control fontFORM" id="floatingPassword3" placeholder="Digite o nome da Vítima..." v-model="form.dados.nomeVIT">
                <label for="floatingPassword3">Nome da Vítima: </label>
              </div>
            </div>

            <div class="col">
              <div class="form-floating mb-2">
                <input class="form-control fontFORM" id="floatingPassword4" placeholder="Digite o nome do Agressor..." v-model="form.dados.nomeAGR">
                <label for="floatingPassword4">Nome do Agressor: </label>
              </div>
            </div>

          </div>

        </div>
      </div>

      <div id="dados" class="dadosFORM">

        <div class="form-floating mb-2">
          <input class="form-control fontFORM" id="floatingPassword5" placeholder="Digite o Logradouro..." v-model="form.dados.logr">
          <label for="floatingPassword5">Logradouro: </label>
        </div>

        <div class="row">
          <div class="col">
            <div class="form-floating mb-2">
              <input class="form-control fontFORM" id="floatingPassword6" placeholder="Digite o número..." v-model="form.dados.numeroCS">
              <label for="floatingPassword6">Nº</label>
            </div>
          </div>

          <div class="col">
            <div class="form-floating mb-2">
              <input class="form-control fontFORM" id="floatingPassword7" placeholder="Digite o Bairro..." v-model="form.dados.bairro">
              <label for="floatingPassword7">Bairro: </label>
            </div>
          </div>

          <div class="col">
            <div class="form-floating mb-2">
              <input class="form-control fontFORM" id="floatingPassword8" placeholder="Digite o Telefone..." v-model="form.dados.tel">
              <label for="floatingPassword8">Telefone: </label>
            </div>
          </div>
        </div>

      </div>

      <div id="dados" class="dadosFORM">

        <div class="mt-2 mb-2 form-lks" style="background-color:#f7f7f7">
          <label class="d-flex mb-2">1. Precisou ligar alguma vez para o número de telefone da Patrulha de Rede de Frente para pedir ajuda? Se positivo, qual motivo?</label>

          <div>
            <div class="form-check form-check-inline">
              <input v-model="form.dados.q1.resposta" class="form-check-input" type="radio" name="inlineRadioOptions1" id="inlineRadio1" :value="true">
              <label class="form-check-label" for="inlineRadio1">Sim</label>
            </div>

            <div class="form-check form-check-inline">
              <input v-model="form.dados.q1.resposta" class="form-check-input" type="radio" name="inlineRadioOptions2" id="inlineRadio2" :value="false">
              <label class="form-check-label" for="inlineRadio2">Não</label>
            </div>

            
            <div v-if="form.dados.q1.resposta" class="form-floating mt-2 mb-2">
              <textarea class="form-control" placeholder="Deixe um comentário aqui..." id="floatingTextarea02" style="height: 100px"></textarea>
              <label for="floatingTextarea02">Por qual motivo? </label>
            </div>


          </div>
        </div>

        <div class="mt-2 mb-2 form-lks">
          <label class="d-flex mb-2">2. Já buscou atendimento para resolver as questões cíveis advindas da situação de violência doméstica? Se negativo, por que?</label>

          <div>
            <div class="form-check form-check-inline">
              <input v-model="form.dados.q2.resposta" class="form-check-input" type="radio" name="inlineRadioOptions3" id="inlineRadio3" :value="true">
              <label class="form-check-label" for="inlineRadio3">Sim</label>
            </div>

            <div class="form-check form-check-inline">
              <input v-model="form.dados.q2.resposta" class="form-check-input" type="radio" name="inlineRadioOptions4" id="inlineRadio4" :value="false">
              <label class="form-check-label" for="inlineRadio4">Não</label>
            </div>

            <div v-if="!form.dados.q2.resposta && form.dados.q2.resposta != null " class="form-floating mt-2 mb-2">
              <textarea class="form-control" placeholder="Deixe um comentário aqui..." id="floatingTextarea03" style="height: 100px"></textarea>
              <label for="floatingTextarea03">Por qual motivo? </label>
            </div>

          </div>
        </div>

        <div class="mt2 mb-2 form-lks" style="background-color:#f7f7f7">
          <label class="d-flex mb-2">3. O agressor continua importunando, mesmo após concessão das Medidas Protetivas? Se sim, de que forma? </label>

          <div class="mt-2 mb-2">
            <div class="form-check form-check-inline">
              <input v-model="form.dados.q3.resposta" class="form-check-input" type="radio" name="inlineRadioOptions5" id="inlineRadio5" :value="true">
              <label class="form-check-label" for="inlineRadio5">Sim</label>
            </div>

            <div class="form-check form-check-inline">
              <input v-model="form.dados.q3.resposta" class="form-check-input" type="radio" name="inlineRadioOptions6" id="inlineRadio6" :value="false">
              <label class="form-check-label" for="inlineRadio6">Não</label>
            </div>
          </div>

          <div v-if="form.dados.q3.resposta" class="mt-2 mb-2 form-lks">
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="inlineRadioOptions05" id="inlineRadio05" value="LIGACAO">
              <label class="form-check-label" for="inlineRadio05">Ligação</label>
            </div>

            <div class="form-check form-check-inline">
              <input v-model="form.dados.q3.tipo" class="form-check-input" type="radio" name="inlineRadioOptions06" id="inlineRadio06" value="VISITADOMICILIO">
              <label class="form-check-label" for="inlineRadio06">Visita em Domicílio</label>
            </div>

            <div class="form-check form-check-inline">
              <input v-model="form.dados.q3.tipo" class="form-check-input" type="radio" name="inlineRadioOptions07" id="inlineRadio07" value="VISITALOCALTRABALHO">
              <label class="form-check-label" for="inlineRadio07">Visita no local de Trabalho</label>
            </div>

            <div class="form-check form-check-inline">
              <input v-model="form.dados.q3.tipo" class="form-check-input" type="radio" name="inlineRadioOptions08" id="inlineRadio08" value="RECARDOTERCEIROS">
              <label class="form-check-label" for="inlineRadio08">Recado por terceiros</label>
            </div>

            <div class="form-check form-check-inline">
              <input v-model="form.dados.q3.tipo" class="form-check-input" type="radio" name="inlineRadioOptions09" id="inlineRadio09" value="REDESOCIAL">
              <label class="form-check-label" for="inlineRadio09">Rede Social</label>
            </div>

            <div class="form-check form-check-inline">
              <input v-model="form.dados.q3.tipo" class="form-check-input" type="radio" name="inlineRadioOptions10" id="inlineRadio10" value="BILHETESCARTAS">
              <label class="form-check-label" for="inlineRadio10">Bilhetes/Cartas</label>
            </div>

            <div class="form-floating mt-2 mb-2">
              <textarea v-model="form.dados.q3.descricao" class="form-control" placeholder="Deixe um comentário aqui..." id="floatingTextarea005" style="height: 100px"></textarea>
              <label for="floatingTextarea005">Outros? Especifique.</label>
            </div>

          </div>

        </div>

        <div class="form-lks">
            <label class="d-flex mb-2">4. Em decorrência da violência sofrida, a vítima está necessitando de algum encaminhamento/orientação? Se positivo, qual? </label>

            <div class="mt-2 mb-2">
              <div class="form-check form-check-inline">
                <input v-model="form.dados.q4.resposta" class="form-check-input" type="radio" name="inlineRadioOptions7" id="inlineRadio7" :value="true">
                <label class="form-check-label" for="inlineRadio7">Sim</label>
              </div>

              <div class="form-check form-check-inline">
                <input v-model="form.dados.q4.resposta" class="form-check-input" type="radio" name="inlineRadioOptions8" id="inlineRadio8" :value="false">
                <label class="form-check-label" for="inlineRadio8">Não</label>
              </div>
            </div>

          
            <div v-if="form.dados.q4.resposta" class="form-floating mt-2 mb-2">
              <textarea v-model="form.dados.q4.descricao" class="form-control" placeholder="Deixe um comentário aqui..." id="floatingTextarea07" style="height: 100px"></textarea>
              <label for="floatingTextarea07">Outros? Especifique.</label>
            </div>

            
        </div>

        <div class="mt-2 mb-2 form-lks" style="background-color:#f7f7f7">
          <label class="d-flex mb-2">5. O autor do fato continua a oferecer riscos? Por quê? </label>

          <div>
            <div class="form-check form-check-inline">
              <input v-model="form.dados.q5.resposta" class="form-check-input" type="radio" name="inlineRadioOptions9" id="inlineRadio9" :value="true">
              <label class="form-check-label" for="inlineRadio9">Sim</label>
            </div>

            <div class="form-check form-check-inline">
              <input v-model="form.dados.q5.resposta" class="form-check-input" type="radio" name="inlineRadioOptions10" id="inlineRadio10" :value="false">
              <label class="form-check-label" for="inlineRadio10">Não</label>
            </div>
          </div>

          <div v-if="form.dados.q5.resposta" class="mt-2 mb-2 form-lks">

            <div class="form-check form-check-inline">
              <input v-model="form.dados.q5.tipo" class="form-check-input" type="radio" name="inlineRadioOptions11" id="inlineRadio11" value="NAOTIVECONTATO">
              <label class="form-check-label" for="inlineRadio11">Não tive mais contato com o agressor.</label>
            </div>

            <div class="form-check form-check-inline">
              <input v-model="form.dados.q5.tipo" class="form-check-input" type="radio" name="inlineRadioOptions12" id="inlineRadio12" value="RECEBIDOAPOIOFAMILIA">
              <label class="form-check-label" for="inlineRadio12">Tenho recebido apoio da família.</label>
            </div>

            <div class="form-check form-check-inline">
              <input v-model="form.dados.q5.tipo" class="form-check-input" type="radio" name="inlineRadioOptions13" id="inlineRadio13" value="MUDANCACOMPORTAMENTO">
              <label class="form-check-label" for="inlineRadio13">Mudança de comportamento do agressor.</label>
            </div>

            <div class="form-floating mt-2 mb-2">
              <textarea v-model="form.dados.q5.descricao" class="form-control" placeholder="Deixe um comentário aqui..." id="floatingTextarea10" style="height: 100px"></textarea>
              <label for="floatingTextarea10">Outros? Especifique.</label>
            </div>

          
          </div>

          <div v-if="!form.dados.q5.resposta && form.dados.q5.resposta != null" class="form-floating mt-2 mb-2">
              <textarea v-model="form.dados.q5.descricao" class="form-control" placeholder="Deixe um comentário aqui..." id="floatingTextarea11" style="height: 100px"></textarea>
              <label for="floatingTextarea11">Caso Negativo, por que ?</label>
          </div>
          
        </div>

        <div class="mt-2 mb-2 form-lks">
          <label class="d-flex mb-2">6. A vítima está frequentando o CREAS para receber atendimento psicossocial? Se negativo, por que?</label>

          <div>
            <div class="form-check form-check-inline">
              <input v-model="form.dados.q6.resposta" class="form-check-input" type="radio" name="inlineRadioOptions14" id="inlineRadio14" :value="true">
              <label class="form-check-label" for="inlineRadio14">Sim</label>
            </div>

            <div class="form-check form-check-inline">
              <input v-model="form.dados.q6.resposta" class="form-check-input" type="radio" name="inlineRadioOptions144" id="inlineRadio114" :value="false">
              <label class="form-check-label" for="inlineRadio114">Não</label>
            </div>
          </div>

          <div v-if="form.dados.q6.resposta" class="form-floating mt-2 mb-2">
            <textarea v-model="form.dados.q6.descricao" class="form-control" placeholder="Deixe um comentário aqui..." id="floatingTextarea12" style="height: 100px"></textarea>
            <label for="floatingTextarea12">Se positivo, qual a periodicidade das visitas?</label>
          </div>

          <div v-if="!form.dados.q6.resposta && form.dados.q6.resposta != null " class="form-floating mt-2 mb-2">
            <textarea v-model="form.dados.q6.descricao" class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 100px"></textarea>
            <label for="floatingTextarea2">Por que?</label>
          </div>

        </div>

        <div class="mt-2 mb-2 form-lks" style="background-color:#f7f7f7">
          <label class="d-flex mb-2">7. Deseja permanecer com o acompanhamento da Patrulha Rede de Frente?</label>

          <div>
            <div class="form-check form-check-inline">
              <input v-model="form.dados.q7.resposta" class="form-check-input" type="radio" name="inlineRadioOptions15" id="inlineRadio15" :value="true">
              <label class="form-check-label" for="inlineRadio15">Sim</label>
            </div>

            <div class="form-check form-check-inline">
              <input v-model="form.dados.q7.resposta" class="form-check-input" type="radio" name="inlineRadioOptions16" id="inlineRadio16" :value="false">
              <label class="form-check-label" for="inlineRadio16">Não</label>
            </div>
          </div>

          <div v-if="!form.dados.q7.resposta && form.dados.q7.resposta != null" class="form-floating mt-2 mb-2">
            <textarea v-model="form.dados.q7.descricao" class="form-control" placeholder="Deixe um comentário..." id="floatingTextarea2" style="height: 100px"></textarea>
            <label for="floatingTextarea2">Caso negativo, certifique em termo apartado.</label>
          </div>

        </div>

        <div class="mt-2 mb-2 form-lks">
          <label class="d-flex mb-2">8. Utilize este espaço para registrar outras informações que entender pertinentes.</label>

          <div class="form-floating mt-2 mb-2">
            <textarea v-model="form.dados.q8.descricao" class="form-control" placeholder="Deixe um comentário..." id="floatingTextarea3" style="height: 100px">
            </textarea>
          </div>

        </div>

    
      </div>

      <div id="dados" class="dadosFORM">

        <div class="">
          <label for="exampleFormControlTextarea10" class="form-label mb-2">Observações pertinentes caso haja necessidade.</label>
          <textarea v-model="form.dados.observacoes" class="form-control" id="exampleFormControlTextarea10" rows="3"></textarea>
        </div>

        <div class="mt-2 mb-2">
          <label for="exampleFormControlTextarea30" class="form-label mb-2">Data</label>
          <textarea class="form-control" id="exampleFormControlTextarea30" rows="1" disabled>{{currentDate}}</textarea>
        </div>

        <div class="row">
          <div class="col">
            <div class="form-floating mt-2 mb-2">
              <input v-model="form.dados.pmFISC" class="form-control fontFORM" id="floatingPassword" placeholder="Digite o PM Fiscalizador">
              <label for="floatingPassword">PM Fiscalizador: </label>
            </div>
          </div>

          <div class="col">
            <div class="form-floating mb-2">
              <input v-model="form.dados.matFUNC" class="form-control fontFORM" id="floatingPassword" placeholder="Digite a Matrícula Funcional">
              <label for="floatingPassword">Matrícula Funcional: </label>
            </div>
          </div>
        </div>

      </div>

      <div class="mb-5" style="display:flex;justify-content: center;">
        <button type="submit" class="mx-2 mt-3 mb-5 btn btn-success">Enviar Dados</button>
        <button class="mx-2 mt-3 mb-5 btn btn-primary" @click="$router.push(`/generic?id=${form.casoId}`)">Voltar</button>
      </div>




    </form>

    <Footer></Footer>

  </div>



</template>

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
      show: true,
      casoId: '',
      currentDate: null,
      geoLocation: {},
      form: {
        tipo: "VISITAACOMPANHAMENTO",
        numeroRelatorio: null,
        lat: "",
        lng: "",
        dados: {
          codMP:null,
          nomeVIT:null,
          nomeAGR:null,
          logr:null,
          numeroCS:null,
          bairro:null,
          tel:null,
          pmFISC:null,
          matFUNC:null,
          observacoes:null,
          q1: {
            resposta: null
          },
          q2: {
            resposta: null
          },
          q3: {
            resposta: null,
            tipo: null,
            descricao:null,
          },
          q4: {
            resposta: null,
            descricao:null
          },
          q5: {
            resposta: null,
            tipo: null,
            descricao:null,
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
            descricao:null
          }
        }
      }
    }
  },
  async mounted() {
    if (!await this.isLoggedIn()) {
      this.$router.push('/');
    }
    this.casoId = this.$route.query.id;
    this.getCurrentDate();
    this.getGeoPosition();
  },
  methods: {
    getCurrentDate(){
      this.currentDate = new Date();
    },
    async onSubmit() {
      this.form.lat = this.geoLocation.coords.latitude;
      this.form.lng = this.geoLocation.coords.longitude;

      var caso = await this.getCasoById(this.casoId);
      this.form.id = Vue.uuid();

      caso.formularios.push(this.form);

      const updatedCaso = await this.updateCaso(caso);

      if(navigator.onLine){
        await api.saveSync(updatedCaso);
      }
      

      alert('Formulário Salvo com sucesso.');
      this.$router.push(`/generic?id=${this.casoId}`);
    },
    getGeoPosition() {
      if(!("geolocation" in navigator)) {
        console.log("Erro ao pegar loc do GPS");
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

<style scoped>
  .form-lks {
    background-color: white;
    padding: 10px;
    border-radius: 10px;
  }

  .dadosFORM{
    margin:10px;
    border: 1px solid #0000001c;
    padding:10px;
    border-radius: 5px;
  }

  .fontFORM{
    font-size: 16px !important
  }


</style>


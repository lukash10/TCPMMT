<template>

  <div class="Home" style="height: 100vh;">

    <Header></Header>

    <div class="container mt-3">
      <div class="row">
        <b-button style="background-color: #faebd700;color: black;border: none;" @click="$router.push(`/generic?id=${form.casoId}`)"><i class="fa-solid fa-backward fa-xl" style="color:#06569b"></i> <b>Voltar</b> </b-button>
        <div class="col d-flex" style="justify-content: center;align-items: center;">
          <h4 class="text-center mt-2">Formulário Autor do Fato</h4> 
        </div>
      </div>
    </div>

    <form @submit.prevent="onSubmit" style="width: 100% !important;padding:0px;">

      <div id="dados" class="" style="margin:10px;border: 1px solid #0000001c;;padding:10px;border-radius: 5px;">

        <div class="form-floating mb-3">
          <input class="form-control" style="font-size: 16px !important" id="floatingInput" v-model="form.dados.codMP">
          <label for="floatingInput">Nº/Cód Medida Protetiva: </label>
        </div>

        <div class="row">
          <div class="col">
            <div class="form-floating mb-2">
              <input class="form-control" style="font-size: 16px !important" id="floatingPassword1" placeholder="Digite o nome do Autor" v-model="form.dados.nomeAF">
              <label for="floatingPassword1">Nome: </label>
            </div>
          </div>
          <div class="col">
            <div class="form-floating mb-2">
              <input class="form-control" style="font-size: 16px !important" id="floatingPassword2" placeholder="Digite o Endereço" v-model="form.dados.end">
              <label for="floatingPassword2">Endereço: </label>
            </div>
          </div>
          <div class="col">
            <div class="form-floating mb-2">
              <input class="form-control" style="font-size: 16px !important" id="floatingPassword3" placeholder="Digite o Telefone" v-model="form.dados.tel">
              <label for="floatingPassword3">Telefone: </label>
            </div>
          </div>
        </div>

      </div>

      <div id="dados" class="" style="margin:10px;border: 1px solid #0000001c;;padding:10px;border-radius: 5px;">

        <div class="mt-2 mb-2 form-lks">
          <label class="d-flex mb-2">1. Está ciente das medidas protetivas deferidas à vítima, as quais lhe foram lidas e explicadas neste ato?</label>
          <div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="inlineRadioOptions1" id="inlineRadio1" :value="true" v-model="form.dados.q1.resposta">
              <label class="form-check-label" for="inlineRadio1">Sim</label>
            </div>

            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="inlineRadioOptions2" id="inlineRadio2" :value="false" v-model="form.dados.q1.resposta">
              <label class="form-check-label" for="inlineRadio2">Não</label>
            </div>
          </div>

        </div>

        <div class="mt-2 mb-2 form-lks">
          <label class="d-flex mb-2">2. Está ciente que o descumprimento das medidas poderá ensejar sanções diversas, inclusive eventual prisão?</label>

          <div class="">
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="inlineRadioOptions3" id="inlineRadio3" :value="true" v-model="form.dados.q2.resposta">
              <label class="form-check-label" for="inlineRadio3">Sim</label>
            </div>

            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="inlineRadioOptions4" id="inlineRadio4" :value="false" v-model="form.dados.q2.reposta">
              <label class="form-check-label" for="inlineRadio4">Não</label>
            </div>
          </div>
        </div>

        <div class="mt2 mb-2 form-lks">
          <label class="d-flex mb-2">3. Está ciente de que não poderá manter contato/importunar a vítima através de ligação telefônica, visita em domicílio, visita no local de trabalho, recado por terceira pessoa, rede social, bilhetes/cartas, dentre outras formas de importunação? </label>

          <div class="mt-2 mb-2">
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="inlineRadioOptions5" id="inlineRadio5" :value="true" v-model="form.dados.q3.resposta">
              <label class="form-check-label" for="inlineRadio5">Sim</label>
            </div>

            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="inlineRadioOptions6" id="inlineRadio6" :value="false" v-model="form.dados.q3.resposta">
              <label class="form-check-label" for="inlineRadio6">Não</label>
            </div>
          </div>
        </div>

        <div class="form-lks">
            <label class="d-flex mb-2">4. Está ciente de que, em caso de reconciliação com a vítima, esta deverá comunicar o fato aos órgãos competentes? </label>

            <div class="mt-2 mb-2">
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions7" id="inlineRadio7" :value="true" v-model="form.dados.q4.resposta">
                <label class="form-check-label" for="inlineRadio7">Sim</label>
              </div>

              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions8" id="inlineRadio8" :value="false" v-model="form.dados.q4.resposta">
                <label class="form-check-label" for="inlineRadio8">Não</label>
              </div>
            </div>
        </div>

        <div class="mt-2 mb-2 form-lks">
            <label class="d-flex mb-2">5. Utilize este espaço para registrar outras informações que entender pertinentes. </label>

              <div class="form-floating mt-2 mb-2">
                <textarea class="form-control" placeholder="Deixe um comentário aqui" id="floatingTextarea2" style="height: 100px" v-model="form.dados.q5.descricao"></textarea>
              </div>
        </div>
    
      </div>
  
      <div id="dados" class="" style="margin:10px;border: 1px solid #0000001c;;padding:10px;border-radius: 5px;">

        <div>
          <label for="exampleFormControlTextarea1" class="form-label mb-2">Autor do Fato:</label>
          <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="form.dados.autorFT"></textarea>
        </div>

        <div class="mt-2 mb-1">
          <textarea class="form-control" id="exampleFormControlTextarea3" rows="1" disabled>{{form.dados.dataFORM}}</textarea>
        </div>
        
        <div class="row">
          <div class="col">
            <div class="form-floating mt-2 mb-2">
              <input class="form-control" style="font-size: 16px !important" id="floatingPasswordPM" placeholder="PM Fiscalizador" v-model="form.dados.pmFISC">
              <label for="floatingPasswordPM">PM Fiscalizador: </label>
            </div>
          </div>
          <div class="col">
            <div class="form-floating mb-2">
              <input class="form-control" style="font-size: 16px !important" id="floatingPasswordMF" placeholder="Digite a Matrícula Funcional" v-model="form.dados.matFUNC">
              <label for="floatingPasswordMF">Matrícula Funcional: </label>
            </div>
          </div>
        </div>

      </div>

      <div class="mb-5" style="display:flex;justify-content: center;">
        <button type="submit" class="mx-2 mt-3 mb-5 btn btn-success">Enviar Dados</button>
        <button type="submit" class="mx-2 mt-3 mb-5 btn btn-danger">Reset</button>
        <button class="mx-2 mt-3 mb-5 btn btn-primary" @click="$router.push(`/generic?id=${form.casoId}`)">Voltar</button>
      </div>

    </form>

    <Footer></Footer>

  </div>



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
      currentDate:null,
      show: true,
      casoId: null,
      form: {
        tipo: "AUTORDOFATO",
        lat: "",
        lng: "",
        dados: {
          nomeAF: null,
          codMP: null,
          tel: null,
          end: null,
          matFUNC: null,
          pmFISC: null,
          dataFORM: null,
          autorFT: null,
          q1: {
            resposta: null
          },
          q2: {
            resposta: null
          },
          q3: {
            resposta: null,
          },
          q4: {
            resposta: null,
          },
          q5:{
            descricao: null
          }
        }
      }
    }
  },
  async mounted(){
    this.casoId = this.$route.query.id;

    this.getCurrentDate();
    
    if (!await this.isLoggedIn()) {
      this.$router.push('/');
    }

  },
  methods: {
    getCurrentDate(){
      this.form.dados.dataFORM = new Date();
    },
    async onSubmit() {

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
  }
}
</script>
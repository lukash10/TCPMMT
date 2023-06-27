<template>

  <div class="Home" style="height: 100vh;">

    <Header></Header>

    <div class="container mt-3">
    <div class="row">
      <b-button style="background-color: #faebd700;color: black;border: none;" @click="$router.push(`/generic?id=${form.casoId}`)"><i class="fa-solid fa-backward fa-xl" style="color:#06569b"></i> <b>Voltar</b> </b-button>
      <div class="col d-flex" style="justify-content: center;align-items: center;">
        <h4 class="text-center mt-2">Formulário de Situação de Vulnerabilidade</h4> 
      </div>
    </div>
    
    </div>

    <form @submit.prevent="onSubmit" class="mt-1" style="width: 100% !important;padding:0px;">

        <div id="dados" class="dadosFORM">
          <div class="row">

            <div class="col">
              <div class="form-floating mb-3">
                <input class="form-control fontFORM" id="floatingInput1" placeholder="Digite o nome da Vítima..." v-model="form.dados.nomeVIT">
                <label for="floatingInput1">Nome da Vítima: </label>
              </div>
            </div>

            <div class="col">
              <div class="form-floating mb-2">
                <input class="form-control fontFORM" id="floatingPassword2" placeholder="Digite o nome do Acusado..." v-model="form.dados.nomeACUSADO">
                <label for="floatingPassword2">Nome do Acusado: </label>
              </div>
            </div>
            
            <div class="col">
              <div class="form-floating mb-2">
                <input class="form-control fontFORM" id="floatingPassword3" placeholder="Digite a Ocorrência" v-model="form.dados.ocorrencia">
                <label for="floatingPassword3">Ocorrência: </label>
              </div>
            </div>
          </div>

        </div>

        <div id="dados" class="dadosFORM">

          <div class="row">
            <div class="col-6">
              <div class="form-floating mb-2">
                <input class="form-control fontFORM" id="floatingPassword2" placeholder="Digite o Logradouro..." v-model="form.dados.logradouro">
                <label for="floatingPassword2">Logradouro: </label>
              </div>
            </div>
            <div class="col-4">
              <div class="form-floating mb-2">
                <input class="form-control fontFORM" id="floatingPassword4" placeholder="Digite o Bairro..." v-model="form.dados.bairro">
                <label for="floatingPassword4">Bairro: </label>
              </div>
            </div>
            <div class="col-2">
              <div class="form-floating mb-2">
                <input class="form-control fontFORM" id="floatingPassword3" placeholder="Digite o Número..." v-model="form.dados.numero">
                <label for="floatingPassword3">Nº: </label>
              </div>
            </div>

            <div class="col">
              <div class="form-floating mb-2">
                <input class="form-control fontFORM" id="floatingPassword5" placeholder="Digite o Telefone..." v-model="form.dados.telefone">
                <label for="floatingPassword5">Telefone: </label>
              </div>
            </div>
            <div class="col">
              <div>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="2" disabled>{{form.dados.dataDia}}</textarea>
              </div>
            </div>
          </div>
        </div>

        <div id="dados" class="dadosFORM">

          <div class="mt-2 mb-2 form-lks">
            <label class="d-flex mb-2">1. Situações? Descrever todas as situações relatadas pela vítima e a motivação do pedido de PP ao agressor.</label>
              <div class="form-floating mt-2 mb-2">
                <textarea class="form-control" placeholder="Deixe um comentário aqui..." id="floatingTextarea2" style="height: 100px" v-model="form.dados.motivo"></textarea>
                <label for="floatingTextarea2">Por qual motivo? </label>
              </div>
          </div>
     
        </div>

        <div id="dados" class="" style="margin:10px;border: 1px solid #0000001c;;padding:10px;border-radius: 5px;">

          <div class="form-floating mt-2 mb-2">
            <input class="form-control fontFORM" id="floatingPassword6" placeholder="Digite o PM Fiscalizador" v-model="form.dados.pmFISC">
            <label for="floatingPassword6">PM Fiscalizador: </label>
          </div>

          <div class="form-floating mt-2 mb-2">
            <input class="form-control" style="font-size: 16px !important" id="floatingPassword7" placeholder="Digite o PM Testemunha" v-model="form.dados.pmTEST">
            <label for="floatingPassword7">Policial Testemunha: </label>
          </div>

        </div>


        <div class="mb-5" style="display:flex;justify-content: center;">
          <button type="submit" class="mx-2 mt-3 mb-5 btn btn-success">Enviar Dados</button>
          <button class="mx-2 mt-3 mb-5 btn btn-primary" @click="$router.push(`/generic?id=${casoId}`)">Voltar</button>
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
  name: "FormVisitaVulneravel",
  components: {
    Header: Header,
    Footer: Footer
  },
  data() {
    return {
      currentDate:null,
      show: true,
      casoId: '',
      form: {
        tipo: "VISITAVULNERAVEL",
        lat: "",
        lng: "",
        dados: {
          nomeVIT: null,
          nomeACUSADO: null,
          ocorrencia: null,
          logradouro: null,
          bairro: null,
          numero: null,
          telefone: null,
          motivo: null,
          pmFISC: null,
          pmTEST: null,
          dataDia: null,
        }
      }
    }
  },
  async mounted() {
    if (!await this.isLoggedIn()) {
      this.$router.push('/');
    }

    this.getCurrentDate();
    this.casoId = this.$route.query.id;
  },
  methods: {
    getCurrentDate(){
      const date = new Date();
      this.form.dados.dataDia = date.toLocaleDateString('pt-br');
    },
    async onSubmit(event) {
      event.preventDefault()

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
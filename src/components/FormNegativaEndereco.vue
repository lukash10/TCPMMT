<template>

  <div class="Home" style="height: 100vh;">

    <Header></Header>

    <div class="container mt-3">
      <div class="row">
        <b-button style="background-color: #faebd700;color: black;border: none;" @click="$router.push(`/generic?id=${form.casoId}`)"><i class="fa-solid fa-backward fa-xl" style="color:#06569b"></i> <b>Voltar</b> </b-button>
        <div class="col d-flex" style="justify-content: center;align-items: center;">
          <h4 class="text-center mt-2">Formulário de Negativa de Endereço</h4> 
        </div>
      </div>
    </div>

    <form @submit.prevent="onSubmit" style="width: 100% !important;padding:0px;">

      <div id="dados" class="dadosFORM">
        <div class="row">
          <div class="col">
            <div class="form-floating mb-2">
              <input class="form-control" style="font-size: 16px !important" id="floatingPassword1" placeholder="Digite o Logradouro..." v-model="form.dados.logradouro">
              <label for="floatingPassword1">Logradouro: </label>
            </div>
          </div>
          <div class="col">
            <div class="form-floating mb-2">
              <input class="form-control" style="font-size: 16px !important" id="floatingPassword2" placeholder="Digite o número da casa..." v-model="form.dados.numero">
              <label for="floatingPassword2">Nº</label>
            </div>
          </div>
          <div class="col">
            <div class="form-floating mb-2">
            <input class="form-control" style="font-size: 16px !important" id="floatingPassword3" placeholder="Digite o Bairro..." v-model="form.dados.bairro">
            <label for="floatingPassword3">Bairro: </label>
          </div>
          </div>
          <div class="col">
            <div class="form-floating mb-2">
              <input class="form-control" style="font-size: 16px !important" id="floatingPassword4" placeholder="Digite o telefone..." v-model="form.dados.telefone">
              <label for="floatingPassword4">Telefone: </label>
            </div>
          </div>
        </div>

      </div>

      <div id="dados" class="dadosFORM">

        <div class="mt-2 mb-2">
          <label for="exampleFormControlTextarea1" class="form-label mb-2">1º Tentativa</label>
          <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="form.dados.q1.descricao"></textarea>
        </div>

        <div class="mt-2 mb-2">
          <label for="exampleFormControlTextarea2" class="form-label mb-2">2º Tentativa</label>
          <textarea class="form-control" id="exampleFormControlTextarea2" rows="3" v-model="form.dados.q2.descricao"></textarea>
        </div>

        <div class="mb-2 mt-2">
          <label for="exampleFormControlTextarea3" class="form-label mb-2">3º Tentativa</label>
          <textarea class="form-control" id="exampleFormControlTextarea3" rows="3" v-model="form.dados.q3.descricao"></textarea>
        </div>

        <div class="">
          <label for="exampleFormControlTextarea4" class="form-label mb-2">Observação: </label>
          <textarea class="form-control" id="exampleFormControlTextarea4" rows="3" v-model="form.dados.observacao"></textarea>
        </div>

        <div class="row">
          <div class="col">
            <div class="form-floating mt-2 mb-2">
              <input class="form-control" style="font-size: 16px !important" id="floatingPasswordPM" placeholder="Digite o PM Fiscalizador..." v-model="form.dados.pmFISC">
              <label for="floatingPasswordPM">PM Fiscalizador: </label>
            </div>
          </div>
          <div class="col">
            <div class="form-floating mt-2 mb-2">
              <input class="form-control" style="font-size: 16px !important" id="floatingPasswordPMT" placeholder="Digite o PM Testemunha..." v-model="form.dados.pmTEST">
              <label for="floatingPasswordPMT">PM Testemunha: </label>
            </div>
          </div>
        </div>

        <div class="mt-2 mb-2">
          <label for="exampleFormControlTextarea1" class="form-label mb-2">Data</label>
          <textarea class="form-control" id="exampleFormControlTextarea1" rows="1" disabled>{{form.dados.dataFORM}}</textarea>
        </div>

      </div>

      <div class="mb-5" style="display: flex;justify-content: center;">
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
  name: "FormNegativa",
  components: {
    Header: Header,
    Footer: Footer
  },
  data() {
    return {
      show: true,
      casoId: '',
      form: {
        tipo: "NEGATIVAENDERECO",
        dados: {
          dataFORM: null,
          logradouro: null,
          numero: null,
          bairro: null,
          telefone: null,
          observacao: null,
          pmFISC: null,
          pmTEST: null,
          q1: {
            descricao: null
          },
          q2: {
            descricao: null
          },
          q3: {
            descricao: null
          }
        }
      }
   }
  },
  async mounted(){
    this.getCurrentDate();
    this.casoId = this.$route.query.id;
    if (!await this.isLoggedIn()) {
      this.$router.push('/');
    }
  },
  methods: {
    getCurrentDate(){
      const date = new Date();
      this.form.dados.dataFORM = date.toLocaleDateString('pt-br');
    },
    async onSubmit(event) {

      event.preventDefault()

      // await api.createFormulario(this.form);

      var caso = await this.getCasoById(this.casoId);
      this.form.id = Vue.uuid();

      caso.formularios.push(this.form);

      const updatedCaso = await this.updateCaso(caso);
      
      if(navigator.onLine){
        await api.saveSync(updatedCaso);
      }
      

      alert('Formulário Salvo com sucesso.');
      this.$router.push(`/generic?id=${this.casoId}`);

    }
  }
}


</script>

<style>

.dadosFORM{
  margin:10px;
  border: 1px solid #0000001c;
  padding:10px;
  border-radius: 5px
}

</style>
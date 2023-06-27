<template>
  <div class="Home" style="height: 100vh">

    <Header></Header>

    <div class="container">
      <div class="row mt-3">
        <b-button style="background-color: #faebd700;color: black;border: none;" @click="$router.push(`/generic?id=${casoId}`)">
          <i class="fa-solid fa-backward fa-xl" style="color:#06569b"></i>
          <b>Voltar</b>
        </b-button>
        <div class="col d-flex" style="justify-content: center;align-items: center;">
          <h4 class="text-center mt-2">Formulário de Término de Atendimento</h4> 
        </div>
      </div>
    </div>

    <form @submit.prevent="onSubmit" style="width: 100% !important;padding:0px;">

      <div id="dados" class="dadosFORM">

        <div class="form-floating mb-2">
          <input class="form-control fontFORM" id="floatingPassword1" placeholder="Digite o Endereço:" v-model="form.dados.end">
          <label for="floatingPassword1">Endereço: </label>
        </div>

        <div class="form-floating mb-2">
          <input class="form-control fontFORM" id="floatingPassword2" placeholder="Digite o Bairro:" v-model="form.dados.bairro">
          <label for="floatingPassword2">Bairro: </label>
        </div>

        <div class="form-floating mb-2">
          <input class="form-control fontFORM" id="floatingPassword3" placeholder="Digite o Número:" v-model="form.dados.numero">
          <label for="floatingPassword3">Nº: </label>
        </div>

        <div class="form-floating mb-2">
          <input class="form-control fontFORM" id="floatingPassword4" placeholder="Digite o Telefone:" v-model="form.dados.telefone">
          <label for="floatingPassword4">Telefone: </label>
        </div>


      </div>

      <div id="dados" class="dadosFORM">


        <div class="mt-2 mb-2 form-lks">
          <label class="d-flex mb-2">1. Motivo (Informar se a MP foi revogada ou se não houve necessidade de renovação)</label>

          <div class="form-floating mt-2 mb-2">
            <textarea class="form-control" placeholder="Deixe um comentário aqui..." id="floatingTextarea2" style="height: 100px" v-model="form.dados.q1.descricao"></textarea>
          </div>
        </div>

      </div>

      <div id="dados" class="dadosFORM">

        <div class="row">

          <div class="col">
            <div class="form-floating mt-2 mb-2">
              <input class="form-control fontFORM" id="floatingPassword1" placeholder="Digite o nome da Vítima:" v-model="form.dados.nomeVIT">
              <label for="floatingPassword1">Nome da Vítima: </label>
            </div>
          </div>

          <div class="col">
            <div class="form-floating mt-2 mb-2">
              <input class="form-control fontFORM" id="floatingPassword2" placeholder="Digite o PM Fiscalizador:" v-model="form.dados.pmFISC">
              <label for="floatingPassword2">PM Fiscalizador: </label>
            </div>
          </div>
          <div>

            <div class="form-floating mb-2">
              <input class="form-control fontFORM" id="floatingPassword3" placeholder="Digite o PM Testemunha:" v-model="form.dados.pmTEST">
              <label for="floatingPassword3">PM Testemunha: </label>
            </div>
          </div>

        </div>

        <div class="mt-2 mb-2">
          <label for="exampleFormControlTextarea1" class="form-label mb-2">Data</label>
          <textarea class="form-control" id="exampleFormControlTextarea1" rows="1" disabled>{{form.dados.dataFORM}}</textarea>
        </div>

      </div>

      <div class="mb-5" style="display:flex;justify-content: center;">
        <button type="submit" class="mx-2 mt-3 mb-5 btn btn-success">{{ idForm ? 'Atualizar Dados' : 'Enviar dados' }}</button>
        <button type="submit" class="mx-2 mt-3 mb-5 btn btn-danger">Reset</button>
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
    name: "FORMTERMINO",
    components: {
      Header: Header,
      Footer: Footer
    },
    data() {
      return {
        mode: 'ADD',
        show: true,
        casoId:null,
        idForm: null,
        caso: null,
        form: {
          tipo: 'FORMTERMINO',
          dados: {
            dataFORM:null,
            end:null,
            bairro:null,
            numero:null,
            telefone:null,
            nomeVIT:null,
            pmFISC:null,
            pmTEST:null,
            q1:{
              descricao:null,
            }
          }
        }
      }
    },
    async mounted(){
      this.casoId = this.$route.query.id;
      this.idForm = this.$route.query.idForm;

      if (!await this.isLoggedIn()) {
        this.$router.push('/');
      }
      
      if (this.idForm) {
        this.caso = await this.getCasoById(this.casoId);
        this.form = this.caso.formularios.filter(f => f.id != this.idForm)[0];
      }

      this.getCurrentDate();
    },
    methods: {
      getCurrentDate(){
        this.form.dados.dataFORM = new Date();
      },
      async atualizaCaso() {
        console.log('Caso', this.caso);

        this.caso.formularios = this.caso.formularios.filter(f => f.id != this.idForm);
        this.caso.formularios.push(this.form);

        console.log('Caso updateded', this.caso);

        const updatedCaso = await this.updateCaso(this.caso);
      },
      async onSubmit() {
        if (this.idForm) {
          this.atualizaCaso();
          return;
        }

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

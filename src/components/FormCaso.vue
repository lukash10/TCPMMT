<template>

  <div style="width: 100% !important;padding: 20px;">
    
    <b-form @submit.prevent="onSubmit" @reset.prevent="onReset">

      
      <b-form-input class="mt-2 mb-4" id="input-nome" v-model="form.titulo" placeholder="Insira o Código do Caso" type="number" required/>
    

      <div class="d-flex" style="justify-content: space-between;">
        <b-button type="submit" variant="primary">Salvar</b-button>
        <b-button type="reset" variant="danger">Limpar Campos</b-button>
      </div>

      <hr class="mt-4 mb-0">

    </b-form>
  </div>
  
</template>

<script>

  import api from '../api.js';

  export default {
    data() {
      return {
        geoLocation: {},
        form: {
          titulo: '',
          situacao: 'PENDENTE',
          policial: '',
          lng: '',
          lat: '',
          dataCreation: ''
        },
      };
    },
    async mounted() {

      if (!await this.isLoggedIn()) {
        this.$router.push('/');
      }

      const usuario = await this.getUsuario();

      this.form.policial = usuario.nome;
      this.form.dataCreation = new Date();
      
    },
    methods: {
      async onSubmit() {
 
        const caso = await this.addCaso(this.form);
        
        if(navigator.onLine){
          //Se estiver online ... 
          await api.saveSync(caso);
          alert('Caso salvo com sucesso.');
        }else{
          alert('Caso salvo com sucesso offline.');
        }
        this.$router.push('/');

      },      
    }
  }
</script>
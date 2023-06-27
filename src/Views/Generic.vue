<template>

  <div class="Generic">

    <Header></Header>

    <main id="generic">

      <h3 class="text-center mt-3 mb-2">Área de Inclusão de Formulários</h3>


      <div class="d-flex mb-3 mt-3" style="justify-content:center">

        <b-button style="background-color: #06569b" v-b-modal="'my-modal'">Selecionar Formulário</b-button>

        <b-modal id="my-modal" hide-footer>
          <template #modal-title>
            Formulários
          </template>
          <div class="d-flex mt-3 mb-5" style="justify-content: center;flex-flow:column">
            <b-button style="margin-bottom:10px; margin-left: 40px;margin-right: 40px;" variant="success" @click="$router.push('/form_visita1?id=' + caso['caso_id'])"> + Formulário Visita 1</b-button>
            <b-button style="margin-bottom:10px; margin-left: 40px;margin-right: 40px;" variant="primary" @click="$router.push('/form_visita_acompanhamento?id=' + caso['caso_id'])"> + Formulário Visita 2 ou +</b-button>
            <b-button style="margin-bottom:10px; margin-left: 40px;margin-right: 40px;" variant="secondary" @click="$router.push('/form_visita_vulneravel?id=' + caso['caso_id'])"> + Formulário Visita Vulnerável</b-button>

            <b-button style="margin-bottom:10px; margin-left: 40px;margin-right: 40px;" variant="success" @click="$router.push('/form_negativa?id=' + caso['caso_id'])"> + Formulário Negativa de Endereço</b-button>
            <b-button style="margin-bottom:10px; margin-left: 40px;margin-right: 40px;" variant="primary" @click="$router.push('/form_autor_fato?id=' + caso['caso_id'])"> + Formulário Autor do Fato</b-button>
            <b-button style="margin-bottom:10px; margin-left: 40px;margin-right: 40px;" variant="danger" @click="$router.push('/form_termino?id=' + caso['caso_id'])"> + Formulário Término</b-button>
          </div>

          <div class="d-flex" style="justify-content:flex-end">
            <b-button style="background-color: #06569b" class="mt-3" block @click="$bvModal.hide('my-modal')">Fechar</b-button>
          </div>   
        </b-modal>


      </div>


      <b-card-group class="p-2" style="flex-flow: column" v-for="f in caso.formularios" :key="f.id">

        <b-card style="margin-bottom:30px;box-shadow: rgb(0 0 0 / 12%) 0px 5px 15px 5px !important;" header-tag="header" footer-tag="footer">
          <template #header>
            <div class="">
              <div style="display: flex;justify-content: space-between;align-items: center;">
                <h6 style="color:white">{{ nomeForm[f.tipo] }} | Relatório Nº {{ f.numeroRelatorio }} </h6>
                <div>
                  <i v-if="online" @click="goToEdit(f)" v-b-tooltip.hover title="Editar Formulário" class="fa-solid fa-file-pen fa-xl mx-3" style="color:white" ></i>
                  <i v-b-tooltip.hover title="Ver Dados" class="fa-solid fa-eye fa-xl mx-3" style="color:white" ></i>
                </div>
              </div>

            </div>
          </template>


        </b-card>


      </b-card-group>



      <small class="mx-3" style="font-weight: bold;">TOTAL DE FORMULÁRIOS: {{ total }}</small>
      <Footer></Footer>

    </main>

  </div>

</template>

<script>

  import Header from '../component-View/Header.vue';
  import Footer from '../component-View/Footer.vue';

  export default{
    name: "Generic",
    components: {
      Header: Header,
      Footer: Footer
    },
    data() {
      return {
        online: true, nomeForm: {"VISITA1" : "Form. de Visita",
          "VISITAVULNERAVEL": "Form. de Visita Vulnerável",
          "VISITAACOMPANHAMENTO": "Form. Visita Acompanhamento",
          "AUTORDOFATO": "Form. Autor do Fato",
          "NEGATIVAENDERECO": "Form. Negativa de Endereço",
          "FORMTERMINO": "Form. Término de Atendimento"
        },
        caso: {
          id: '',
          formularios: []
        },
        total: 0
      };
    },
    async mounted() {
      this.caso.id = this.$route.query.id;

      if (!await this.isLoggedIn()) {
        this.$router.push('/');
      }

      await this.showList();
    },
    created() {
      window.addEventListener('online', this.handleOnline);
      window.addEventListener('offline', this.handleOffline);
    },
    destroyed() {
      window.removeEventListener('online', this.handleOnline);
      window.removeEventListener('offline', this.handleOffline);
    },
    methods: {
      async showList() {;
        this.caso = await this.getCasoById(this.caso.id);
        this.total = this.caso.formularios.length;
      },
      handleOnline() {
        this.online = true;
      },
      handleOffline() {
        this.online = false;
      },
      goToEdit(f) {
        if (f.tipo === 'FORMTERMINO') this.$router.push('/form_termino?id=' + this.caso['caso_id'] + '&idForm=' + f.id);
      }
    },

  }

</script>


<style scoped>

#generic{
  height: 100%;
}

.card-lks{
  box-shadow: rgb(0 0 0 / 12%) 0px 5px 15px 5px;
  background: white;
  border-radius: 10px;
}

.card-body{
  display: none;
}


.user{
  justify-content: center;
  color: white;
  display: flex;
  background: rgb(6, 86, 155);
  border-radius: 5px;
  padding: 5px;
  font-size: 13px;
}

</style>

<template>

    <div>
        <Header></Header>
        <main>
            <div class="mt-3 text-center">
                <div class="user">Bem vindo (a) {{user}} <br>ao Sistema de Gestão de Proteção à Mulher.</div>
            </div>

            <div v-if="isOnline" class="d-flex mt-3" style="justify-content: center;">
                <b-button variant="danger" v-b-modal="'my-modal'">+ Cadastrar Novo Caso</b-button>
            </div>
            
            <b-modal id="my-modal" hide-footer>
                <template #modal-title>
                    Cadastrar Novo Caso
                </template>

                <FormCaso />

                <div class="d-flex" style="justify-content:flex-end">
                    <b-button style="background-color: #06569b" class="mt-3" block @click="$bvModal.hide('my-modal')">Fechar</b-button>
                </div>   
            </b-modal>

            <form class="d-flex px-5 py-3">
                <input v-model="querySearch" class="form-control mr-sm-2" type="search" placeholder="Procurar Caso (Nº Relatório)" aria-label="Search">
            </form>

            <div class="d-flex" style="justify-content:center">
                <b-button style="background-color: #06569b;border: none;" class="mx-2 mt-3" >Meus casos</b-button>
                <b-button style="background-color: #06569b;border: none;" class="mx-2 mt-3" >Todos os casos</b-button>    
            </div>   
            
            <hr>

            <div>

                <h2 class="text-center">Casos em Andamento do {{user}}</h2>

                <div v-if="isOnline">
                    <div class="d-flex" style="margin:30px;flex-direction: column;justify-content: center;align-items: center;" v-if="isLoading == false">
                        <FacebookLoader></FacebookLoader>
                    </div>
                </div>

                <div id="cards" style="flex-direction: column;" class="d-flex w-100 mt-1 mb-5">
                
                    <b-card-group style="flex-flow: column">

                        <b-card style="margin-bottom:30px;box-shadow: rgb(0 0 0 / 12%) 0px 5px 15px 5px !important;" header-tag="header" footer-tag="footer" v-for="caso in casos" :key="caso.id">
                            <template #header>
                                <div class="">
                                    <div style="display: flex;justify-content: space-between;align-items: center;">
                                        <h6 style="color:white">Caso Nº {{ caso.titulo }}<br><br> {{caso.policial}} </h6>
                                        <div class="d-flex">
                                                
                                        
                                            <!-- <b-button class="" v-b-modal="'rel'+ caso['caso_id']" style="background: #faebd700;padding: 5px;"><i class="fa-solid fa-file-text fa-xl mx-3" type="button" style="color:white" ></i></b-button>&nbsp; -->
                                            <b-button class="" v-b-modal="'upd'+ caso['caso_id']" style="background: rgb(98 0 0);padding: 5px;"><i class="fa-sharp fa-solid fa-check fa-xl mx-3" type="button" style="color:white"></i></b-button>
                                            <!-- <b-button class="" v-b-modal="'del'+ caso['caso_id'] " style="background: #faebd700;padding: 5px;"><i class="fa-sharp fa-solid fa-trash fa-xl mx-3" type="button" style="color:white"></i></b-button>&nbsp;
                                             -->

                                            <!-- <b-modal :id="'rel'+ caso['caso_id']" title="Relatório de Casos">
                                                <b-form-input placeholder="Digite o e-mail para onde será enviado o relatório..." type="email"></b-form-input>
                                            </b-modal> -->

                                            <!-- <b-modal :id="'del'+ caso['caso_id']" title="Deletar Caso ?" @ok="deleteCaso(caso['caso_id'])">
                                                <form ref="form">
                                                    <p>Deseja realmente deletar o caso <b>{{caso.titulo}}</b>?</p>
                                                </form>
                                            </b-modal> -->

                                            <b-modal :id="'upd'+ caso['caso_id']" title="Finalizar Caso" @ok="finalizarCaso(caso['caso_id'])">
                                                <form ref="form">
                                                    <p>Deseja realmente finalizar o caso <b>{{caso.titulo}}</b>?</p>
                                                </form>
                                            </b-modal>

                                            

                                        </div>
                                    </div>
                                </div>
                                
                            </template>
                        
                            <div class="mb-4" style="display: flex;justify-content: space-between;align-items: center;">
                                <div class="d-flex" style="flex">
                                    <h6>Status: {{ caso.situacao ? caso.situacao : '' }}</h6>
                                </div>                                 
                                
                            </div>

                            <div class="mx-2" style="display: flex;justify-content: space-between;align-items: center;">

                                <b-button href="#" @click="$router.push('/generic?id=' + caso['caso_id'])" style="background-color: #06569b;">Acessar Caso</b-button>
                                <b-icon class="arrow-detalhes" scale="2" v-b-toggle="'col' + caso['caso_id']"  icon="arrow-down-square-fill"></b-icon>

                            </div>

                            <b-collapse :id="'col'+ caso['caso_id']" class="colapse-detalhes">
                                <b-card class="card-detalhe" title="Detalhes">
                                    <div class="mt-2">
                                        <p>Nome da Vítima:</p>
                                        <p>Nome do Agressor:</p>
                                        <p>Formulários Atendidos:</p>
                                    </div>
                                </b-card>
                            </b-collapse>

                        </b-card>
                        

                    </b-card-group>
                
                </div>
            </div>

        <Footer></Footer>

        </main>
    </div>
   
</template>

<script>

import Header from '../component-View/Header.vue';
import Footer from '../component-View/Footer.vue';
import FormCaso from '../components/FormCaso.vue';
import api from '../api.js';
import { FacebookLoader } from 'vue-content-loader'

export default{
    name: "HomePage",
    components: {
        Header: Header,
        Footer: Footer,
        FormCaso: FormCaso,
        FacebookLoader
    },
    data() {
        return {
            user: null,
            isLoading: false,
            casos: [],
            options: [
                { value: 'PENDENTE', text: 'Caso em Andamento' },
                { value: 'FINALIZADO', text: 'Caso Finalizado' }
            ],
            querySearch: ''
        };
    },
    async mounted() {

    
        if (!await this.isLoggedIn()) {
            this.$router.push('/');
            return
        }

        const usuario = await this.getUsuario();

        this.user = usuario.nome;

        if (navigator.onLine) {

            const localCasos = await this.getCasos(); // Pega todos os casos do indexedb (local) e persiste

            for (let c of localCasos) { // pego todos os casos locais
                await api.saveSync(c); // e atualizo 1 por 1 com a base do banco
            }

            await this.syncAllCasos();

            await this.showList();

            this.isLoading = true;

        } else {
            console.log("offline");
            await this.showList();
        }     
        
    },
    watch: {
        querySearch(newValue, oldValue) {
            this.casos = this.casos.filter((c) => c.titulo.includes(newValue));

            if (newValue === '') {
                this.showList();
            }
        }
    },
    methods: {
        async deleteCaso(casoId) {

            await api.deleteCaso(casoId);

            await this.showList();
        },
        async finalizarCaso(casoId) {
            var caso = await this.getCasoById(casoId);

            caso.situacao = 'FINALIZADO';

            await this.updateCaso(caso);

            await api.saveSync(caso);

            await this.showList();
        },
        async showList() {

            this.casos = await this.getCasos();

            this.casos = this.casos.filter((c)=>{
                return (c.situacao != "FINALIZADO");
            });

        },
        async syncAllCasos() {
            
            const result = (await api.findAllSync())?.data; // Tenta pegar todos os casos do Banco (?. if undefined)
            
            await this.deleteCasos(); // Apago tudo que esta no indexedb
            
            await this.addListCaso(result.map((r) => { // sobrescrevo tudo que esta no banco para local, garantindo que fique atualizado.
                r.dados.created_at = r.created_at;
                return r.dados;
            }));
        }
    }
}

</script>

<style>


#caseSelect{
    border-radius: 10px !important;
    padding:5px;
}

header.card-header{
    background-color: #06569b !important;
    padding:12px;
}

.activedButton{
    background-color: #74a103 !important;
}

.user{
    justify-content: center;
    color: white;
    display: flex;
    background: rgb(6, 86, 155);
    border-radius: 5px;
    padding: 5px;
    font-size: 13px;
    margin: 10px;
}

.colapse-detalhes {
  padding-top: 15px;
  background-color: #ffffff !important;
}

.card-detalhe {
  background-color: #ffffff !important;
  border: none !important;
  padding: 0;
  -webkit-box-shadow: 0px 5px 15px 5px rgb(0 0 0 / 36%);
  box-shadow: 0px 5px 15px 5px rgb(0 0 0 / 2%);
}

.arrow-detalhes:focus {
  outline: none;
}

.col-detalhes {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.arrow-detalhes{
    color: #06569b !important;
}

.arrow-setor {
  color: #74a103;
}

.btn-shadow:focus {
  box-shadow: none !important;
  outline: none;
}

.p-listar-setores {
  margin: 10px;
  font-weight: 500;
}

.btn-editar {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.collapse-options {
  background-color: pink;
}

</style>
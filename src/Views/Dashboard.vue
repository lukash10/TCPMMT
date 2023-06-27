<!-- lukash.tcc2023@gmail.com
Lukash10@ -->
<template>
  <body>
    <NavMobile></NavMobile>
    <NavVertical></NavVertical>

    <div id="main">

      <div class="row">

        <div class="col mt-5">

          <div class="card bg-c-blue order-card">
            <div class="card-block">
              <h6 class="m-b-20">Casos em andamento</h6>
              <h2 class="text-right"><i class="fa fa-rocket f-left"></i><span>{{  dashboard.qtdEmAndamento }}</span></h2>
            </div>
          </div>

          <div class="card bg-c-blue order-card">
            <div class="card-block">
              <h6 class="m-b-20">Casos Finalizados</h6>
              <h2 class="text-right"><i class="fa fa-rocket f-left"></i><span>{{  dashboard.qtdFinalizados }}</span></h2>
            </div>
          </div>

          <div class="card bg-c-blue order-card">
            <div class="card-block">
              <h6 class="m-b-20">Casos Totais</h6>
              <h2 class="text-right"><i class="fa fa-rocket f-left"></i><span>{{  dashboard.qtdTotal }}</span></h2>
            </div>
          </div>

        </div>

        <div class="col">

          <div class="d-flex mt-5 mb-2">
            <h3><i class="fas fa-exclamation-triangle" style="color:grey"></i> <span style="text-decoration: underline;">Áreas de Risco</span> <i class="fas fa-exclamation-triangle" style="color:grey"></i></h3>
          </div>

          <div class="mt-3 shadow-sm p-3 mb-5 bg-white rounded">
            <GmapMap v-if="markers[0]" :center="markers[0]" :zoom="13" map-type-id="roadmap" style="width:100%; height: 400px;">
            <GmapMarker :key="index" v-for="(m, index) in markers" :position="m" :clickable="true" :draggable="true"/>
            </GmapMap> <!-- :key="index"  -->
          </div>
        </div>
      </div>
    </div>

    <div id="main" class="mt-5">
      <div class="col-12">
        <div class="grid search">
          <div class="grid-body">
            <div class="row">
              <!-- BEGIN FILTERS -->
              <div class="col-md-3">
                <h2 class="grid-title"><i class="fa fa-filter"></i>Filtros</h2>
                <hr>


                <h4>Por Status:</h4>

                <input type="radio" id="option1" name="options" value="PENDENTE" @click="filterByStatus">
                <label for="option1">Em andamento</label><br>
                <input type="radio" id="option2" name="options" value="FINALIZADO" @click="filterByStatus">
                <label for="option2">Finalizado</label><br>
                <input checked type="radio" id="option3" name="options" value="TODOS" @click="filterByStatus">
                <label for="option3">Todos</label><br>

                <div class="padding mt-4"></div>


                <h4>Por Data:</h4> De <div class="input-group date form_date" data-date="2014-06-14T05:25:07Z" data-date-format="dd-mm-yyyy" data-link-field="dtp_input1">
                  <input type="text" class="form-control">
                  <span class="input-group-addon bg-blue"><i class="fa fa-th"></i></span>
                </div>
                <input type="hidden" id="dtp_input1" value="">

                Até
                <div class="input-group date form_date" data-date="2014-06-14T05:25:07Z" data-date-format="dd-mm-yyyy" data-link-field="dtp_input2">
                  <input type="text" class="form-control">
                  <span class="input-group-addon bg-blue"><i class="fa fa-th"></i></span>
                </div>
                <input type="hidden" id="dtp_input2" value="">
                <!-- END FILTER BY DATE -->

                <div class="padding"></div>


              </div>
              <!-- END FILTERS -->
              <!-- BEGIN RESULT -->
              <div class="col-md-9">
                <h2><i class="fa fa-file-o"></i> Resultados</h2>
                <hr>
                <!-- BEGIN SEARCH INPUT -->
                <div class="input-group mb-3">
                  <input style="height: 50px;" type="text" class="form-control" placeholder="número do caso" v-model="querySearch">
                  <span class="input-group-btn">
                    <button class="btn btn-primary" type="button"><i class="fa fa-search"></i></button>
                  </span>
                </div>


                <div class="padding"></div>

                <div class="row">
                  <!-- BEGIN ORDER RESULT -->

                  <!-- END ORDER RESULT -->


                </div>

                <!-- BEGIN TABLE RESULT -->
                <div class="table-responsive">
                  <table class="mt-2 table table-hover">
                    <tbody>
                      <tr v-for="caso in casos">
                        <td class="product"><strong>Número do Caso: "{{ caso.dados.titulo }}"</strong></td>
                        <td style="text-align: end;"><b style="padding: 6px; background: #0d6efd;border-radius: 10px;color: white;" @click="goToCaso(caso)">Acessar Caso</b></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>  


  </body>


</template>

<script>

import Header from '../component-View/Header.vue';
import Footer from '../component-View/Footer.vue';
import NavVertical from '../component-View/NavVertical.vue';
import NavMobile from '../component-View/NavMobile.vue';
import api from '../api.js'

export default{
  name: "Dasboard",
  components: {
    Header: Header,
    Footer: Footer,
    NavVertical,
    NavMobile
  },
  data() {
    return {
      position: {lat:null, lng:null},
      geoLocation: {},
      casos: [],
      allcasos: [],
      dashboard: {},
      querySearch: '',
      page: 1,
      size: 100,
      statusFilter: 'TODOS',
      markers: []
    };
  },
  async mounted() {

    if (!await this.isLoggedIn()) {
      this.$router.push('/');
    }

    await this.listCasos();

   // this.getGeoPosition();

    await this.showAllMapsPoint();
    const responseDash = await api.findDashboardInfo();

    this.dashboard = responseDash.data;

  },

  methods: {
    async goToCaso(caso) {
      this.$router.push( `/generic?id=${caso.id}` );
    },
    async showAllMapsPoint() {
      if(!("geolocation" in navigator)) {
        console.log("Erro ao pegar loc do GPS");
        return;
      }

      console.log(navigator);

    },
    async listCasos() {
      const response = await api.findAllSync();

      this.casos = response.data;
    },
    async filterByStatus(e) {
      const value = e.target.value;

      this.statusFilter = value;

      if (this.querySearch === '') {
        await this.listCasos();
      } else {
        const result = await api.searchCaso(this.querySearch);

        this.casos = result.data;
      }

      if (value === 'FINALIZADO') {
        this.casos = this.casos.filter(c => c.dados.situacao === value);
      } else if (value === 'PENDENTE') {
        this.casos = this.casos.filter(c => c.dados.situacao === value);
      } 
    },
    goToGeneric(idCaso) {
      this.$cookies.set('idCaso', idCaso);
      this.$router.push('/generic');
    },
    getGeoPosition() {
      if(!("geolocation" in navigator)) {
        console.log("Erro ao pegar loc do GPS");
        return;
      }
      navigator.geolocation.getCurrentPosition(pos => {
        this.geoLocation = pos;

        this.position.lat = pos.coords.latitude;
        this.position.lng = pos.coords.longitude;


        console.log(this.geoLocation);

      }, err => {
        console.log("Erro ao pegar loc do GPS", err);
      })
    },
  },
  watch: {
    querySearch: async function(val) {
      if (val == '') {
        await this.listCasos();
      }

      if (val.length >= 3) {
        if (val.match(/^[0-9]+$/)) {
          const result = await api.searchCaso(val);

          this.casos = result.data;

        }
      }

      if (this.statusFilter !== 'TODOS') {
        this.casos = this.casos.filter(c => c.dados.situacao === this.statusFilter);
      }
    },
    casos: async function(val) {
      this.markers = this.casos.map(c => ({ lat: c.dados.lat, lng: c.dados.lng })); 
      this.markers = this.markers.filter(m => m.lat != '' || m.lng != '');
    }
  },

}

</script>

<style scoped>

@media only screen and (max-width: 800px) {
    nav{
        display: none;
    }
    nav#mobile{
        display: block;
    }
}

@media only screen and (min-width:800px){
    nav{
        display: block;
    }
    nav#mobile{
        display: none;
    }

    #main{
        padding-left: 90px;
        padding-right: 20px;
    }
}

body{
    width: 100% !important;
    height: 100%;
}

.btn {
    margin-bottom: 5px;
}

.grid {
    position: relative;
    width: 100%;
    background: #fff;
    color: #666666;
    border-radius: 2px;
    margin-bottom: 25px;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1);
}

.grid .grid-body {
    padding: 15px 20px 15px 20px;
    font-size: 0.9em;
    line-height: 1.9em;
}

.search table tr td.rate {
    color: #f39c12;
    line-height: 50px;
}

.search table tr:hover {
    cursor: pointer;
}

.search table tr td.image {
	width: 50px;
}

.search table tr td img {
	width: 50px;
	height: 50px;
}

.search table tr td.rate {
	color: #f39c12;
	line-height: 50px;
}

.search table tr td.price {
	font-size: 1.5em;
	line-height: 50px;
}

.search #price1,
.search #price2 {
	display: inline;
	font-weight: 600;
}


.centered{
    display: flex;
    justify-content: center;
    align-items: center;
}

.fa {
    position: relative;
    display: table-cell;
    width: 60px;
    height: 36px;
    text-align: center;
    vertical-align: middle;
    font-size:20px;
}


a:hover,a:focus {
text-decoration:none;
}

nav {
-webkit-user-select:none;
-moz-user-select:none;
-ms-user-select:none;
-o-user-select:none;
user-select:none;
}

nav ul,nav li {
    outline:0;
    margin:0;
    padding:0;
}

.order-card {
    color: #fff;
}

.bg-c-blue {
    background: linear-gradient(45deg,#4099ff,#73b4ff);
}

.bg-c-green {
    background: linear-gradient(45deg,#2ed8b6,#59e0c5);
}

.bg-c-yellow {
    background: linear-gradient(45deg,#FFB64D,#ffcb80);
}

.bg-c-pink {
    background: linear-gradient(45deg,#FF5370,#ff869a);
}


.card {
    border-radius: 5px;
    -webkit-box-shadow: 0 1px 2.94px 0.06px rgba(4,26,55,0.16);
    box-shadow: 0 1px 2.94px 0.06px rgba(4,26,55,0.16);
    border: none;
    margin-bottom: 20px;
    -webkit-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;

}

.card .card-block {
    padding: 25px;
}

.order-card i {
    font-size: 26px;
}

.f-left {
    float: left;
}

.f-right {
    float: right;
}

</style>

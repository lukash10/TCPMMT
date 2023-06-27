<template>
    <div class="Case">

        <Header></Header>

        <FormCaso />

        <Footer></Footer>

    </div>
</template>

<script>

import FormCaso from '../components/FormCaso.vue';
import Header from '../component-View/Header.vue';
import Footer from '../component-View/Footer.vue';

export default{
    name: "Caso",
    components: {
        FormCaso: FormCaso,
        Header: Header,
        Footer: Footer
    },
    async mounted() {

        await this.getBanco();

        if (!await this.isLoggedIn()) {
            this.$router.push('/');
        }
    }
}

</script>


<style>



.card-lks{
    box-shadow: rgb(0 0 0 / 12%) 0px 5px 15px 5px;
    background: white;
    border-radius: 10px;
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
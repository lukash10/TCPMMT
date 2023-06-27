import axios from 'axios';
import md5 from 'md5';

const api = axios.create({
  baseURL: 'https://shark-app-cdsj3.ondigitalocean.app'
});

export default {
    async doLogin(form) {
        return await api.post('/api/login', form);
    },
    async findAllCaso() {
        return await api.get('/api/caso');
    },
    async addCaso(form) {
        return await api.post('/api/caso', form);
    },
    async getCaso(casoId) {
        return await api.get(`/api/caso/${casoId}`);
    },
    async deleteCaso(casoId) {
        return await api.delete(`/api/caso/${casoId}`);
    },
    async createFormulario(form) {
        return await api.post('/api/formulario', form);
    },
    async listFormulario(casoId, page, size) {
        return await api.get(`/api/formulario?casoId=${casoId}&page=${page}&size=${size}`);
    },
    async findDashboardInfo() {
        return await api.get('/api/dashboard');
    },
    async searchCaso(query) {
        return await api.get(`/api/casosearch?query=${query}`)
    },
    async deleteFormulario(id) {
        return await api.delete(`/api/formulario/${id}`);
    },
    async saveSync(caso) {
        caso.created_at = undefined; //Tirei esse campo do DB
        
        return await api.post('/api/sync',{ dados: caso, idCaso: caso.id, last_hash: md5(JSON.stringify(caso)) });
    },
    async findAllSync() {
        return await api.get('/api/sync');
    }
}

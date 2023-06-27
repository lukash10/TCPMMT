export default {
  install(Vue) {
    Vue.DB = null; // Preenchido com o getBanco()
    Vue.DB_NAME = "tcc1";
    Vue.DB_VERSION = 1;

    Vue.uuid = function () {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      })
    }

    Vue.mixin({
      methods: {
        async getBanco() {
          return new Promise((resolve, reject) => {
            if (Vue.DB) {
              return resolve(Vue.DB);
            }

            let request = window.indexedDB.open(Vue.DB_NAME, Vue.DB_VERSION);

            request.onerror = (e) => {
              console.log("Error opening db", e);
              reject("Error");
            };

            request.onsuccess = (e) => {
              Vue.DB = e.target.result;
              resolve(Vue.DB);
            };

            request.onupgradeneeded = (e) => {
              Vue.DB = e.target.result;

              Vue.DB.createObjectStore("usuario", {
                autoIncrement: true,
              });

              Vue.DB.createObjectStore("caso", {
                autoIncrement: true,
              });
            };
          });
        },
        async addUsuario(usuario) {
          await this.getBanco();

          return new Promise((resolve, reject) => {
            if (!Vue.DB) {
              console.log("Erro! precisa inicializar o banco antes await getBanco().");
              reject("Error");
            }

            let trans = Vue.DB.transaction(["usuario"], "readwrite");

            trans.oncomplete = (e) => {
              resolve(e);
            };

            trans.onerror = (e) => {
              reject(e);
            };

            let store = trans.objectStore("usuario");

            store.add(usuario);
          });
        },
        async getUsuario() {
          await this.getBanco();

          return new Promise((resolve, reject) => {
            if (!Vue.DB) {
              reject("Erro!");
            }

            let trans = Vue.DB.transaction(["usuario"], "readonly");

            trans.oncomplete = () => {
              resolve(usuario);
            };

            let store = trans.objectStore("usuario");
            let usuario = null;

            store.openCursor().onsuccess = (e) => {
              let cursor = e.target.result;
              if (cursor) {
                usuario = cursor.value;
              }
            };
          });
        },
        async deleteUsuario() {
          await this.getBanco();

          return new Promise((resolve, reject) => {

            if (!Vue.DB) {
              reject("Erro!");
            }

            let trans = Vue.DB.transaction(["usuario"], "readwrite");

            trans.oncomplete = () => {
              resolve(usarios);
            };

            let store = trans.objectStore("usuario");
            let usarios = [];

            store.openCursor().onsuccess = (e) => {
              let cursor = e.target.result;
              if (cursor) {
                cursor.delete()
                cursor.continue();
              }
            };
          });
        },
        async isLoggedIn() {

          const usuario = await this.getUsuario();
          
          const isLoggedIn = usuario !== undefined && usuario !== null;

          return isLoggedIn;
        },
        async addCaso(caso) {
          await this.getBanco();

          return new Promise((resolve, reject) => {
            if (!Vue.DB) {
              console.log("Erro! precisa inicializar o banco antes await addCaso().");
              reject("Error");
            }

            let trans = Vue.DB.transaction(["caso"], "readwrite");

            trans.oncomplete = (e) => {
              resolve(caso);
            };

            trans.onerror = (e) => {
              reject(e);
            };

            let store = trans.objectStore("caso");
            caso.caso_id = caso.caso_id ?? Vue.uuid();

            caso.formularios = [];

            store.add(caso);
          });
        },
        async getCasos() {
          
          await this.getBanco();

          return new Promise((resolve, reject) => {
            if (!Vue.DB) {
              reject("Erro!");
            }

            let trans = Vue.DB.transaction(["caso"], "readonly");

            trans.oncomplete = () => {
              resolve(casos);
            };

            let store = trans.objectStore("caso");
            let casos = [];

            store.openCursor().onsuccess = (e) => {
              let cursor = e.target.result;

              if (cursor) {
                let v = cursor.value;
                casos.push(v);
                cursor.continue();
              }
            };
          });
        },
        async getCasoById(id) {
          await this.getBanco();

          return new Promise((resolve, reject) => {
            let trans = Vue.DB.transaction(['caso'], 'readonly');

            trans.onerror = e => {
              reject(e)
            }

            let store = trans.objectStore('caso')

            store.openCursor().onsuccess = (e) => {
              let cursor = e.target.result;
              
              if (cursor) {
                let v = cursor.value;

                if (v.caso_id == id) {
                  resolve(v);
                }

                cursor.continue();
              }
            }
          });
        },
        async updateCaso(newValue) {
          await this.getBanco();

          return new Promise((resolve, reject) => {
            let trans = Vue.DB.transaction(['caso'], 'readwrite');
            
            trans.onerror = e => {
              console.error(e);

              reject(null);
            }

            let store = trans.objectStore('caso')

            store.openCursor().onsuccess = (e) => {
              let cursor = e.target.result;
              
              if (cursor) {
                let v = cursor.value;

                if (v.caso_id == newValue.caso_id) {
                  cursor.update(newValue);

                  resolve(newValue);
                }

                cursor.continue();
              }
            }
          });
        },
      async deleteCasos() {
        await this.getBanco();

        return new Promise((resolve, reject) => {

          if (!Vue.DB) {
            reject("Erro!");
          }

          let trans = Vue.DB.transaction(["caso"], "readwrite");

          trans.oncomplete = () => {
            resolve(true);
          };

          let store = trans.objectStore("caso");
          store.openCursor().onsuccess = (e) => {
            let cursor = e.target.result;
            if (cursor) {
              cursor.delete()
              cursor.continue();
            }
          };
        });
      },
      async addListCaso(casos) {
        await this.getBanco();

        return new Promise((resolve, reject) => {
          if (!Vue.DB) {
            console.log("Erro! precisa inicializar o banco antes await addCaso().");
            reject("Error");
          }

          let trans = Vue.DB.transaction(["caso"], "readwrite");

          trans.oncomplete = (e) => {
            resolve(casos);
          };

          trans.onerror = (e) => {
            reject(e);
          };

          let store = trans.objectStore("caso");

          casos.forEach((c) => {
            store.add(c);
          });
        });
      }
    },
    
    });
  }
}
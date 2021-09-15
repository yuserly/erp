import {
    required
  } from "vuelidate/lib/validators";

import Multiselect from "vue-multiselect";
import Swal from "sweetalert2";

import Layout from "../../layouts/main";
export default {
    components: {
      Layout,
      Multiselect,
      Swal
    },
    data() {
      return {
        urlbackend: this.$urlBackend,
        form: {
          id_estudiante: 1,
          rut_empresa: '',
          rut_represetante: '',
          razon_social: '',
          nombre_fantasia:'',
          celular: '',
          email: '',
          capital_inicial: 0,
          tipo_empresa:''
        },
        options: [],
        submitted: false,
        
      };
    },
    validations: {
      form: {
        tipo_empresa:{
          required
        }
      },
      
    },
    mounted() {
      this.traerTipoEmpresa();

    },
    methods: {
     
      traerTipoEmpresa(){
        this.axios
        .get(`${this.urlbackend}/empresa/obtenertipoempresa/`)
        .then((response) => {
          this.options = response.data;
        });

      },
      // eslint-disable-next-line no-unused-vars
      formSubmit() {
        this.submitted = true;
        // stop here if form is invalid
        this.$v.$touch();
        if (!this.$v.$invalid) {

            console.log(this.form);

            this.axios
              .post(`${this.urlbackend}/empresa/crearempresa`, this.form)
              .then((res) => {
                console.log(res)
                if (res.data.success) {

                    Swal.fire({
                        title: "Crear Empresa",
                        text: "Empresa creada con éxito!",
                        icon: "success",
                        showCancelButton: false,
                        confirmButtonColor: "#34c38f",
                        confirmButtonText: "Ok",
                      }).then((result) => {
                        if (result.value) {
                            this.$router.push('/empresa')
                        }
                      });
                 
                    
  
                }
              })
              .catch((error) => {
                console.log("error", error);
                const title = "Crear empresa";
                const message = "Error al crear la empresa";
                const type = "error";
                this.$v.form.$reset();
  
                this.successmsg(title, message, type);
              });
        }
      },

    
    
      successmsg(title, message, type) {
        Swal.fire(title, message, type);
      },
  
    },
  };
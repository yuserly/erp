import { required} from "vuelidate/lib/validators";
import $ from 'jquery'

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

        id: this.$route.params.id,
        options: [],
        submitted: false,
        titlemodal: "Editar Unidad de Negocio",
        modal: false,
        typeform: 'create',

        form: {
          id: this.$route.params.id,
          nombre: '',
        },
        formE: {
            id: this.$route.params.id,
            codigo: '',
            nombre: '',
        },

        //TABLA
        tableData: [],

        title: "Alumnos",
        items: [
            {
                text: "Tables",
            },
            {
                text: "Alumnos",
                active: true,
            },
        ],
        totalRows: 1,
        currentPage: 1,
        perPage: 10,
        pageOptions: [10, 25, 50, 100],
        filter: null,
        filterOn: [],
        sortBy: "codigo",
        sortDesc: false,
        fields: [
            {
                key: "codigo",
                sortable: true,
            },
            {
                key: "nombre",
                sortable: true,
            },
                "action",
            ],
      };
    },

    validations: {
      form: {
        nombre:{
          required
        },
        id:{
            required
          },
      },
      formE: {
        nombre:{
          required
        },
        idUnidad:{
            required
          },
      },
    },

    mounted() {
    
      this.getIncial();

    },
    methods: {
    
        onFiltered(filteredItems) {
        this.totalRows = filteredItems.length;
        this.currentPage = 1;
        },

        getIncial()
        {
            this.axios
            .get(`${this.urlbackend}/unidadNegocio/getInicial/`+this.id)
            .then((res) => {
                this.tableData = res.data;
            })    
            .catch((error) => {
                console.log("error", error);
                const title = "Crear empresa";
                const message = "Error al crear la empresa";
                const type = "error";
                this.$v.form.$reset();

                this.successmsg(title, message, type);
            });
        },
        
        formSubmit() {
            this.submitted = true;
        
            if (this.typeform == "create") {
                this.axios
                .post(`${this.urlbackend}/unidadNegocio/store`, this.form)
                .then((res) => {
                    
                    if (res.data.success) {
                        const title = "Nueva Cuenta";
                        const message = "Cuenta Creada Exitosamente";
                        const type = "success";
                        this.successmsg(title, message, type);

                        this.form = {
                            id: this.$route.params.id,
                            nombre: '',
                        }
                        this.typeform = 'create';
                        this.getIncial();
                    }
                })
                .catch((error) => {
                    console.log("error", error);
                    const title = "Problemas";
                    const message = "Ha ocurrido un problema.";
                    const type = "error";
                    this.$v.form.$reset();
                    this.successmsg(title, message, type);
                });

            }else if (this.typeform == "edit") {
                this.axios
                .put(`${this.urlbackend}/unidadNegocio/update/${this.formE.idUnidad}`, this.formE)
                .then((res) => {
                    if (res.data.success) {
                    const title = "Unidad de Negocio";
                    const message = "Actualizada Exitosamente";
                    const type = "success";
                    this.modal = false;
                    this.getIncial();
                    this.formE = {
                        idUnidad: '',
                        nombre: '',
                        codigo: '',
                    }
                    this.typeform = 'create';
                    this.btnCreate        = true,
                    this.successmsg(title, message, type);
                    }
                })
                .catch((error) => {
                    console.clear();
                    $.each(error.response.data.errors, function(key, value) {
                        const Toast = Swal.mixin({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 4000,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                            }
                        })
                        Toast.fire({
                            icon: 'warning',
                            title: value[0]
                        })
                    });
                });
            }
        },
        
        editar(datos)
        {
            this.modal = true;
            this.typeform = "edit";
            this.formE.idUnidad = datos.id_unidadnegocio;
            this.formE.codigo = datos.codigo;
            this.formE.nombre = datos.nombre;
            this.btnCreate        = false;
        },

        eliminar()
        {
            //PENDIENTE
        },

        successmsg(title, message, type) {
            Swal.fire(title, message, type);
        },
  
    },

  };
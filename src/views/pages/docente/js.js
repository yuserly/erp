
import Layout from "../../layouts/main";
import Swal from "sweetalert2";

import {
    required,
    email,
    minLength
  } from "vuelidate/lib/validators";
import Multiselect from "vue-multiselect";
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
          nombres: '',
          apellidos: '',
          email: '',
          subnivel_id: null,
          password: '',
        },
        nivel:'',
        options: [],
        optionsNivel: [],
        submitted: false,
        typeform:'create',
        titlemodal: 'Crear Docente',
        modal: false,
        emailexist: false,

        // tabla

        tableData: [],

        title: "SubNiveles",
        items: [
          {
            text: "Tables",
          },
          {
            text: "SubNiveles",
            active: true,
          },
        ],
        totalRows: 1,
        currentPage: 1,
        perPage: 10,
        pageOptions: [10, 25, 50, 100],
        filter: null,
        filterOn: [],
        sortBy: "Nivel",
        sortDesc: false,
        fields: [
          {
            key: "nombres",
            sortable: true,
          },
          {
            key: "apellidos",
            sortable: true,
          },
          {
            key: "estado",
            sortable: true,
          },
          "action",
        ],
      };
    },
    validations: {
      form: {
        nombres: {
          required,
        },
        apellidos: {
          required,
        },
        email: {
          required,
          email
        },
        subnivel_id:{
          required
        },
        password: {
          required,
          minLength: minLength(6)
        },
      },
      
    },
    mounted() {
      this.traerData();
    // Set the initial number of items
      this.totalRows = this.items.length;
    },
    methods: {
      traerData() {
        this.axios
          .get(`${this.urlbackend}/docente/obtenerdocente`)
          .then((response) => {

            response.data.map((p) => {
              if (p.user.estado_id == 1) {
                p.user.estado_id = "Activo";
              } else {
                p.user.estado_id = "Desactivado";
              }
              // crear nueva propiedad y asigno el valor
              p["estado"] = p.user.estado_id;
  
              // remover la propiedad actual
              delete p.user.estado_id;
              // retornar el nuevo objeto
              return p;
            });
            this.tableData = response.data;
          });
      },
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length;
        this.currentPage = 1;
      },
      formSubmit() {
        this.submitted = true;
        // stop here if form is invalid
        
        this.$v.$touch();

        if (!this.$v.$invalid && !this.emailexist) {
          if (this.typeform == "create") {
            this.axios
              .post(`${this.urlbackend}/docente/creardocente`, this.form)
              .then((res) => {
                if (res.data.success) {
                  const title = "Crear docente";
                  const message = "Docente creado con exito";
                  const type = "success";
  
                  this.form = {
                    nombres: '',
                    apellidos: '',
                    email: '',
                    subnivel_id: null,
                    password: '',
                  };
  
                  this.modal = false;
                  this.emailexist = false;

                  this.$v.form.$reset();
  
                  this.successmsg(title, message, type);
  
                  // this.traerDataSubnivel();
                }
              })
              .catch((error) => {
                console.log("error", error);
                const title = "Crear Docente";
                const message = "Error al crear el Docente";
                const type = "error";
  
                this.modal = false;
                this.$v.form.$reset();
  
                this.successmsg(title, message, type);
              });
          }
        }
      },

      validarEmail($event){


        if(this.$v.form.email.email){

          this.axios
          .get(`${this.urlbackend}/docente/validaremail/${$event.target.value}`)
          .then((response) => {
            if(response.data == 1){
              this.emailexist = true;
            }else{

              this.emailexist = false;

            }
          });

        }

        
      },

      traerNivel(){

        this.axios
        .get(`${this.urlbackend}/nivel/obtenernivel`)
        .then((response) => {
          this.optionsNivel = response.data;
        });

      },

      traerSubnivel($event){
        this.axios
        .get(`${this.urlbackend}/nivel/obtenersubnivelesporNivel/${$event.id_nivel}`)
        .then((response) => {
          this.options = response.data;
        });

      },
      traerSubnivelId(id){
        this.axios
        .get(`${this.urlbackend}/nivel/obtenersubnivelesporNivel/${id}`)
        .then((response) => {
          this.options = response.data;
        });

      },

      successmsg(title, message, type) {
        Swal.fire(title, message, type);
      },

      editar(datos) {
        this.modal = true;

        //traer el nivel al que pertenece

        this.axios
        .get(`${this.urlbackend}/nivel/obtenersubniveles/${datos.docentenivel[0].subnivel_id}`)
        .then((response) => {

          this.traerNivel();
          this.traerSubnivelId(response.data.nivel_id);

          console.log(this.options)

          this.typeform = "edit";
          this.form.nombres = datos.nombres;
          this.form.apellidos = datos.apellidos;
          this.form.nombres = datos.nombres;
          this.form.email=datos.user.email;
          // this.form.subnivel_id = datos.docentenivel,
          
          this.titlemodal = "Editar Subnivel";


          this.nivel = this.optionsNivel.find(option => option.id_nivel === response.data.nivel_id);
      

        });

      
      },
      eliminar(datos) {
        console.log(datos);
  
        // if (datos.estado == "Activo") {
        //  var estado = 2;
        //  var title = "Desactivar subnivel";
        //  var text = `Esta seguro de desactivar el subnivel ${datos.nombre}`;
        // } else {
        //    estado = 1;
        //    title = "Activar subnivel";
        //    text = `Esta seguro de activar el subnivel ${datos.nombre}`;
        // }
  
        // Swal.fire({
        //   title: title,
        //   text: text,
        //   icon: "warning",
        //   showCancelButton: true,
        //   confirmButtonColor: "#34c38f",
        //   cancelButtonColor: "#f46a6a",
        //   confirmButtonText: "Si",
        // }).then((result) => {
        //   if (result.value) {
        //     this.axios
        //       .get(
        //         `${this.urlbackend}/nivel/updatesubnivel/${datos.id_subnivel}/${estado}`
        //       )
        //       .then((res) => {
        //         if (res.data.success) {
        //           if (estado == 1) {
        //             var message = "Subnivel activado con exito";
        //           } else {
        //              message = "Subnivel desactivado con exito";
        //           }
  
        //           var type = "success";
        //         } else {
        //           if (estado == 1) {
        //             message = "Error al activar el subnivel";
        //           } else {
        //              message = "Error al desactivar el subnivel";
        //           }
        //            type = "error";
        //         }
  
        //         this.successmsg(title, message, type);
  
        //         this.traerDataSubnivel();
        //       });
        //   }
        // });
      }
  
    },
  };
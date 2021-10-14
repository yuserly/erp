import Layout from "../../layouts/main";
import Swal from "sweetalert2";
import Multiselect from "vue-multiselect";
import Vue from 'vue';

import {
  required,
  maxLength,
  minLength,
  numeric,
} from "vuelidate/lib/validators";

export default {
  components: { Layout, Swal, Multiselect },
  data() {
    return {
      urlbackend: this.$urlBackend,
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
          key: "codigo",
          sortable: true,
        },
        {
          key: "nombre",
          sortable: true,
        },
        "action",
      ],
      // tabla niveles
      tableDataNivel: [],
      itemsN: [
        {
          text: "Tables",
        },
        {
          text: "SubNiveles",
          active: true,
        },
      ],
      totalRowsN: 1,
      currentPageN: 1,
      perPageN: 10,
      pageOptionsN: [10, 25, 50, 100],
      filterN: null,
      filterOnN: [],
      sortByN: "Nivel",
      sortDescN: false,
      fieldsN: [
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
      info: {
        codigo: "", 
        nombre: "",
        descripcion: "",
        clasificacion: null,
        subclasificacion: null,
        cargos: "",
        abonos: "",
        saldoDeudor: "",
        saldoAcreedor: "",
      },
      formAdd: {
        manual: "",
        empresa: "",
      },
      submitted: false,
      submitform: false,
      submit: false,
      typesubmit: false,
      modalInfo: false,
      titlemodal: "Información",
      options: [],
      plancuentaSelect: "",
      plancuentaData: [],

       // permiso

       crearsubnivel: this.$CrearSubNivel,
       listarsubnivel: this.$ListarSubNivel,
       editarsubnivel: this.$EditarSubnivel,
       eliminarsubnivel: this.$EliminarSubnivel,
    };
  },

  mounted() {

    this.traerDataInicial();
    this.traerplanCuenta();

  },

  validations: {
    form: {
      nombre: {
        required,
      },
      ano_generacion: {
        required,
        numeric,
        minLength: minLength(4),
        maxLength: maxLength(4),
      },
    },
  },

  methods: {

    traerDataInicial() {
        this.axios
          .get(`${this.urlbackend}/plancuenta/obterDatos`, { 'headers': { 'Authorization': `Bearer ${localStorage.getItem('token')}` } })
          .then((response) => {
            this.tableData = response.data.datos;
            this.options = response.data.empresas;
          });
    },
  
    verInformacion(datos){
          this.modalInfo = true;
  
          this.info.codigo            = '-'+datos.codigo;
          this.info.nombre            = '-'+datos.nombre;
          this.info.descripcion       = '-'+datos.descripcion;
          this.info.clasificacion     = '-'+datos.clasificacion.nombre;
          this.info.subclasificacion  = '-'+datos.subclasificacion.nombre;
          this.info.cargos            = '-'+datos.cargos;
          this.info.abonos            = '-'+datos.abonos;
          this.info.saldoDeudor       = '-'+datos.saldo_deudor;
          this.info.saldoAcreedor     = '-'+datos.saldo_acreedor;
    },

    addPlanCuenta(datos)
    {   
        this.formAdd.empresa = JSON.parse(Vue.prototype.$globalEmpresasSelected)
        this.formAdd.manual  = datos.id_manual_cuenta;

        this.axios
            .post(`${this.urlbackend}/plancuenta/addPlanCuenta`, this.formAdd, { 'headers': { 'Authorization': `Bearer ${localStorage.getItem('token')}` } })
            .then((res) => {
              if (res.data.success) {
                const title = "Plan de Cuenta";
                const message = "cuenta añadida exitosamente";
                const type = "success";

                this.formAdd = {
                  empresa: "",
                  manual: "",
                };

                this.successmsg(title, message, type);

                this.plancuentaData.push(datos);
              }
            })
            .catch((error) => {
                console.clear();
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
                    title: error.response.data.errors,
                })
            });
        
    },

    traerplanCuenta(){
        var selected = JSON.parse(Vue.prototype.$globalEmpresasSelected);
        this.axios
        .get(`${this.urlbackend}/plancuenta/getPlanCuenta/`+selected.id_empresa, { 'headers': { 'Authorization': `Bearer ${localStorage.getItem('token')}` } })
        .then((response) => {
          console.log(response);
            response.data.map((p) => {
                p["codigo"]     = p.manual_cuenta.codigo;
                p["nombre"]     = p.manual_cuenta.nombre;              
                return p;
              });
          this.plancuentaData = response.data;
        });
        
    },

    deleteCuenta(datos) {
        
        this.formAdd.empresa = this.plancuentaSelect.id_empresa;
        this.formAdd.manual = datos.manual_cuenta.id_manual_cuenta;

        this.axios
        .post(`${this.urlbackend}/plancuenta/deleteCuenta`, this.formAdd, { 'headers': { 'Authorization': `Bearer ${localStorage.getItem('token')}` } })
        .then((res) => {
          console.log(res);
        });

       
    },

    //   creado por defecto para la tabla
    onFilteredN(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRowsN = filteredItems.length;
      this.currentPageN = 1;
    },

    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },

    editar(datos) {
      this.form.typeform = "edit";
      this.form.nombre = datos.nombre;
      this.form.ano_generacion = datos.ano_generacion;
      this.form.nivel_id = datos.nivel_id;
      this.form.nombrenivel = datos.nivel;
      this.modal = true;
      this.titlemodal = "Editar Subnivel";
      this.form.id_subnivel = datos.id_subnivel;
    },
 
    formSubmit() {
      this.submitted = true;
      // stop here if form is invalid
      this.$v.$touch();

      if (!this.$v.$invalid) {
        if (this.form.typeform == "create") {
          this.axios
            .post(`${this.urlbackend}/nivel/crearsubnivel`, this.form)
            .then((res) => {
              if (res.data.success) {
                const title = "Crear subnivel";
                const message = "Subnivel creado con exito";
                const type = "success";

                this.form = {
                  nombrenivel: "",
                  nombre: "",
                  ano_generacion: "",
                  nivel_id: "",
                  typeform: "",
                };

                this.modal = false;
                this.$v.form.$reset();

                this.successmsg(title, message, type);

                this.traerDataInicial();
              }
            })
            .catch((error) => {
              console.log("error", error);
              const title = "Crear subnivel";
              const message = "Error al crear el subnivel";
              const type = "error";

              this.modal = false;
              this.$v.form.$reset();

              this.successmsg(title, message, type);
            });
        } else {
          this.axios
            .put(
              `${this.urlbackend}/nivel/updatesubnivel/${this.form.id_subnivel}`,
              this.form
            )
            .then((res) => {
              if (res.data.success) {
                const title = "Editar subnivel"; 
                const message = "Subnivel editado con exito";
                const type = "success";

                this.form = {
                  nombrenivel: "",
                  nombre: "",
                  ano_generacion: "",
                  nivel_id: "",
                  typeform: "",
                };

                this.modal = false;
                this.$v.form.$reset();

                this.successmsg(title, message, type);

                this.traerDataInicial();
              }
            })
            .catch((error) => {
              console.log("error", error);
              const title = "Editar subnivel";
              const message = "Error al editar el subnivel";
              const type = "error";
              this.modal = false;
              this.$v.form.$reset();

              this.successmsg(title, message, type);
            });
        }
      }
    },

    successmsg(title, message, type) {
      Swal.fire(title, message, type);
    },
  },
};

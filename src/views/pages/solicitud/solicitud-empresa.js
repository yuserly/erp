import Layout from "../../layouts/main";
import Multiselect from "vue-multiselect";
export default {
  components: {
    Layout,
    Multiselect,
  },

  data() {
    return {
      subnivelbusqueda: "",
      options: [],
      urlbackend: this.$urlBackend,
      // tabla
      tableData: [],
      title: "Empresas",
      items: [
        {
          text: "Tables",
        },
        {
          text: "Solicitud Empresa",
          active: true,
        },
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 25, 50, 100],
      filter: null,
      filterOn: [],
      sortBy: "empresa",
      sortDesc: false,
      fields: [
        {
          key: "empresa",
          sortable: true,
        },
        {
          key: "estudiante",
          sortable: true,
        },
        "action",
      ],
      
    };
  },
  mounted() {
    this.axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;
    this.traerSubnivel();
    this.probarlocal()
  },
  methods: {
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },

    
    probarlocal(){

        // let arrayrol = [];

        // arrayrol.push({'Docente':['Crear Docente', 'Editar Docente', 'Listar Docente', 'Eliminar Docente', 'Activar Docente', 'Solicitud Empresa', 'Solicitud Inicio Actividad']})

        // localStorage.setItem('rol', JSON.stringify(arrayrol));

        // let roles = JSON.parse(localStorage.getItem('rol'));

        let roles = JSON.parse(localStorage.getItem('roles'));

        if(roles){
        roles[0].Docente.map((p) => {
            console.log(p);
        
            this.$CrearDocente =  (p === 'Crear Docente') ? true : false;
            console.log(this.$CrearDocente)
            this.$EditarDocente = (p === 'Editar Docente') ? true : false;
            this.$ListarDocente = (p === 'Listar Docente') ? true : false;
            this.$EliminarDocente = (p === 'Eliminar Docente') ? true : false;
            this.$ActivarDocente = (p === 'Activar Docente') ? true : false;
            this.$SolicitudEmpresa =(p === 'Solicitud Empresa') ? true : false;
            this.$SolicitudInicioActividad = (p === 'Solicitud Inicio Actividad') ? true : false;
            return p;
        });
        
        }

        

    },

    customLabel({ nombre, nivel, ano_generacion }) {
      return `( ${nivel.nombre} - ${ano_generacion} ) ${nombre}`;
    },
    traerSubnivel() {
      this.axios
        .get(`${this.urlbackend}/nivel/obtenersubnivelesporNivel/`)
        .then((response) => {
          this.options = response.data;
        });
    },

    traerbusqueda() {
      this.axios
        .get(
          `${this.urlbackend}/empresa/obtenersolicitud/${this.subnivelbusqueda.id_subnivel}`
        )
        .then((response) => {
          console.log(response);
          response.data.map((p) => {

            const nombreestudiante = `${p.empresa.estudiante.nombres} ${p.empresa.estudiante.apellidos}`;

            // crear nueva propiedad y asigno el valor
            p["empresa"] = p.empresa.razon_social;
            p["estudiante"] = nombreestudiante ;
            return p;
          });
          this.tableData = response.data;
          this.totalRows = response.data.length;
        });
    },
  },
};

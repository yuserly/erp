import Layout from "../../layouts/main";

export default {

    components: {
        Layout,
      },

      data() {
        return {
        urlbackend: this.$urlBackend,
        id_empresa: "",
        rut_empresa: "",
        rut_represetante: "",
        razon_social: "",
        nombre_fantasia: "",
        celular: "",
        email: "",
        capital_inicial: 0,
        tipo_empresa: "",
        alertas:[],
        id: this.$route.params.id,
        }
      },
      mounted() {
        this.axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${localStorage.getItem("token")}`;
        this.traerDatoempresa();
      },
      methods: {
        async traerDatoempresa() {
            this.axios
              .get(`${this.urlbackend}/empresa/obtenerempresasolicitud/${this.id}`)
              .then((response) => {
      
                console.log(response)
                this.id_empresa = response.data.id_empresa;
                this.rut_empresa = response.data.rut_empresa;
                this.rut_represetante = response.data.rut_represetante;
                this.razon_social = response.data.razon_social;
                this.nombre_fantasia = response.data.nombre_fantasia;
                this.celular = response.data.celular;
                this.email = response.data.correo;
                this.capital_inicial = response.data.capital_inicial;
                this.tipo_empresa = response.data.tipo_empresa.nombre;
              
              });

              this.axios
              .get(`${this.urlbackend}/empresa/alertaempresa/${this.id}`)
              .then((response) => {
      
                console.log(response)

                this.alertas = response.data
              
              });
          },
      },
};
import Layout from "../../layouts/main";
import Multiselect from "vue-multiselect";
import { required } from "vuelidate/lib/validators";
import Swal from "sweetalert2";

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
        solcitud_rut: 0,
        inicio_actividad: 0,
        f_inicio_actividad: "",
        rol_tributario: "",
        regimen_id: "",
        nombres: "",
        apellido_p: "",
        apellido_m: "",
        razon_social: "",
        nombre_fantasia: "",
        n_insc_comercio: "",
        f_insc_comercio: "",
        calle_pasaje: "",
        numero_casa: "",
        of_depto: "",
        bloque: "",
        villa_poblacion: "",
        rol_propietario: "",
        comuna: "",
        cuidad: "",
        region: "",
        telefono_movil: "",
        telefono_fijo: "",
        giro_id: "",
        descripcion_act_economica: "",
        enterado: "",
        por_enterar: "",
        total: "",
        f_por_enterar: "",
        socio_nombre: "",
        socio_rut: "",
        socio_enterado: "",
        socio_por_enterar: "",
        socio_f_enterar: "",
        socio_porcentaje: "",
        representante_rut: "",
        representante_nombre: "",
        representante_apellido_p: "",
        representante_apellido_m: "",
        credito_fiscal: "",
        docente: "",
        id_empresa: this.$route.params.id,
      },
      optionsDocente: [],
      regiments: [],
      options: [],

      submitted: false,
    };
  },

  validations: {
    form: {
      docente: {
        required,
      }
    },
  },

  mounted() {
    this.axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    this.traerDocente();
    this.regimen();
    this.traerGiros();

    this.form.n_insc_comercio = this.nroInscripcion();
  },
  methods: {
    customLabel({ nombres, apellidos }) {
      return `${nombres} ${apellidos}`;
    },

    customLabelGiro({ nombre, codigo }) {
      return `( ${codigo} ) - ${nombre}`;
    },

    traerDocente() {
      this.axios
        .get(`${this.urlbackend}/empresa/obtenerdocentealumno/`)
        .then((response) => {
          this.optionsDocente = response.data[0].docente;
        });
    },

    regimen() {
      this.axios
        .get(`${this.urlbackend}/empresa/obtenerregimen/`)
        .then((response) => {
          this.regiments = response.data;
        });
    },
    traerGiros() {
      this.axios
        .get(`${this.urlbackend}/proveedor/getGirosProveedor`)
        .then((response) => {
          this.options = response.data;
        });
    },

    formSubmit() {
      this.submitted = true;
      console.log(this.form);
      // stop here if form is invalid
      this.$v.$touch();
      if (!this.$v.$invalid) {
        console.log(this.form, "valido");

        this.axios
          .post(`${this.urlbackend}/empresa/crearf4415`, this.form)
          .then((res) => {
            console.log(res);
            if (res.data.success) {

                Swal.fire({
                    title: "Crear Formulario F4415",
                    text: "Formulario F4415 creado con éxito!",
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
            const title = "Crear Formulario F4415";
            const message = "Error al crear el Formulario F4415";
            const type = "error";
            this.$v.form.$reset();

            this.successmsg(title, message, type);
          });
      }
    },

    nroInscripcion(prefix = "", random = false) {
      const sec = Date.now() * 1000 + Math.random() * 1000;
      const id = sec
        .toString(16)
        .replace(/\./g, "")
        .padEnd(14, "0");
      return `${prefix}${id}${
        random ? `.${Math.trunc(Math.random() * 100000000)}` : ""
      }`;
    },

    asignarRut(){
        console.log(this.form.solcitud_rut);
        if(this.form.solcitud_rut == 1){
            var num = Math.floor(Math.random() * 10000000000)

            this.form.rol_tributario = num;
        }else{

            this.form.rol_tributario = '';

        }
        
      
    }

  },
};

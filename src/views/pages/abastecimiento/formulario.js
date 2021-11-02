import Swal from "sweetalert2";
import Layout from "../../layouts/main";
import Multiselect from "vue-multiselect";
export default {
    components: {
      Layout,
      Swal,
      Multiselect
    },
    data() {
      return {
        urlbackend: this.$urlBackend,     
        proveedores: [],
        unidades: [],
        typeform: "create",
        buttonForm: true,
        infoEmpresa: JSON.parse(localStorage.getItem("globalEmpresasSelected")),
        info: {
            rut: JSON.parse(localStorage.getItem("globalEmpresasSelected")).rut_empresa,
            razon_social: JSON.parse(localStorage.getItem("globalEmpresasSelected")).razon_social,
            celular: JSON.parse(localStorage.getItem("globalEmpresasSelected")).celular,
            direccion: JSON.parse(localStorage.getItem("globalEmpresasSelected")).direccion,
            correo: JSON.parse(localStorage.getItem("globalEmpresasSelected")).correo,
        },

        form : {
            tipo: "",
            descripcion: "",
            codigo: "",
            debe_haber: "0",
            comprobante: "",
            vencimiento: "0",
        },

      };
    },
    
    mounted() {
        this.getInicial();
    },
    methods: {
       
        getInicial()
        {   
            this.axios
                .get(`${this.urlbackend}/compraemitirdocumento/getInicial`)
                .then((res) => {
                    console.log(res);
                    this.proveedores = res.proveedores.data;
                    this.unidades = res.unidades.data;
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
        },
        
        formSubmit() {
            this.submitted = true;
            
              if (this.typeform == "create") {
                this.axios
                  .post(`${this.urlbackend}/tipodocumentos/store`, this.form)
                  .then((res) => {
                    if (res.data.success) {
                      const title = "Documento Tributario";
                      const message = "Añadido exitosamente";
                      const type = "success";
      
                      this.form = {
                        tipo: "",
                        descripcion: "",
                        codigo: "",
                        debe_haber: "0",
                        comprobante: "",
                        vencimiento: "0",
                      };
      
                      this.modal = false;
                      
                      this.successmsg(title, message, type);
      
                    }
                  })
                  .catch((error) => {
                    console.log("error", error);
                    const title = "Documento Tributario";
                    const message = "haasa";
                    const type = "error";
      
                    this.modal = false;
                    this.$v.form.$reset();
      
                    this.successmsg(title, message, type);
                  });
              } else if(this.typeform == "edit") {
                this.axios
                  .put(
                    `${this.urlbackend}/tipodocumentos/update/${this.form.id}`,this.form
                  )
                  .then((res) => {
                    if (res.data.success) {
                      const title = "Documento Tributario"; 
                      const message = "actualizado con exito";
                      const type = "success";
      
                      this.form = {
                        tipo: "",
                        descripcion: "",
                        codigo: "",
                        debe_haber: "0",
                        comprobante: "",
                        vencimiento: "0",
                      };
      
                        this.modal = false;
                        this.typeform = "create";
                        this.buttonForm = false;
                      
                      this.successmsg(title, message, type);
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
        },

        successmsg(title, message, type) {
            Swal.fire(title, message, type);
        },
    },
    
  };
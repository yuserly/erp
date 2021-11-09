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
        documentoName: "",
        tipoDocumento: this.$route.params.tipo,
        inputFechaVencimiento: true,

        form : {
            documento_id: "",
            n_documento: "",
            proveedor: "",
            fechadoc: "",
            fechaven: "",
            glosa: "",
            direccion: "",
            unidad: "",
            empresa: JSON.parse(localStorage.getItem("globalEmpresasSelected")),
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
                .get(`${this.urlbackend}/compraemitirdocumento/getInicial/`+this.tipoDocumento)
                .then((res) => {
                    this.proveedores = res.data.proveedores;
                    this.unidades = res.data.unidades;
                    this.documentoName = res.data.documento.descripcion;
                    this.form.documento_id = res.data.documento.id_documento;
                    if(res.data.documento.f_vencimiento == 1){ this.inputFechaVencimiento= true; }else if(res.data.documento.f_vencimiento == 2){ this.inputFechaVencimiento= false;}
                })
                .catch((error) => {
                console.log("error", error);
                });
        },
        onChangeProveedor(value)
        {
          this.form.direccion = value['direccion'];
        },
        formSubmit() {
            this.submitted = true;
              if (this.typeform == "create") {
                this.axios
                  .post(`${this.urlbackend}/compraemitirdocumento/encabezadoSave`, this.form)
                  .then((res) => {
                    console.log(res);
                    this.$router.push('../modificarDocumento/'+res.data) 
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
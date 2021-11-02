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
        modal: false,
        titlemodal: "Nuevo Documento Tributario",
        Tipocomprobantes: [],
        typeform: "create",
        buttonForm: true,
        form : {
            tipo: "",
            descripcion: "",
            codigo: "",
            debe_haber: "0",
            comprobante: "",
            vencimiento: "0",
        },
        
        tableData: [],
        title: "Empresas",
        items: [
          {
            text: "Tables",
          },
          {
            text: "Empresas",
            active: true,
          },
        ],
        totalRows: 1,
        currentPage: 1,
        perPage: 10,
        pageOptions: [10, 25, 50, 100],
        filter: null,
        filterOn: [],
        sortBy: "tipo empresa",
        sortDesc: false,
        fields: [
           "acción",
          {
            label: "Tipo Documento",
            key: "tipo",
            sortable: true,
          },
          {
            label: "Descripción",
            key: "descripcion",
            sortable: true,
          },
          {
            key: "comprobante",
            sortable: true,
          },
          {
            label: "Vecimiento",
            key: "vencimiento",
            sortable: true,
          },
          {
            label: "Debe / Haber",
            key: "deber",
            sortable: true,
          },
          
        ],
      };
    },
    
    mounted() {
        this.totalRows = this.items.length;
        this.getInicial();
        this.getTabla();
    },
    methods: {
        onFiltered(filteredItems) {
            this.totalRows = filteredItems.length;
            this.currentPage = 1;
        },  

        getInicial()
        {
            this.axios
                  .get(`${this.urlbackend}/tipodocumentos/getInicial`)
                  .then((res) => {
                     this.Tipocomprobantes = res.data;
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
        
        getTabla()
        {
            this.axios
                  .get(`${this.urlbackend}/tipodocumentos/getTabla`)
                  .then((res) => {
                        this.tableData = res.data;
                        res.data.map((p) => {
                            p["comprobante"]     = p.tipo_comprobante.nombre;
                            if(p.f_vencimiento == 1){ p["vencimiento"]  = "SI";}else{ p["vencimiento"]  = "NO";}
                            if(p.debe_haber == 1){ p["deber"]  = "DEBE";}else{ p["deber"]  = "HABER";}
                            
                            return p;
                        });
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
    
        nuevoDocumento()
        {   
            this.titlemodal = "Nuevo Documento Tributario",
            this.typeform == "create"
            this.modal = true;
            this.buttonForm = true;
        },

        editar(datos)
        {   
            this.titlemodal = "Editar Documento Tributario";
            this.typeform = "edit";
            this.modal = true;
            this.buttonForm = false;
            this.form = {
                id: datos.id_documento,
                tipo: datos.tipo,
                descripcion: datos.descripcion,
                codigo: datos.cod_sii,
                comprobante: datos.tipo_comprobante,
                vencimiento: datos.f_vencimiento,
                debe_haber: datos.debe_haber,
            };
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
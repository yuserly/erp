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
        infoEmpresa: JSON.parse(localStorage.getItem("globalEmpresasSelected")),
        
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
            label: "Descripción",
            key: "descripcion",
            sortable: true,
          },
          {
            label: "Proveedor",
            key: "proveedorName",
            sortable: true,
          },
          {
            label: "Total",
            key: "total",
            sortable: true,
          },
          {
            label: "Fecha Emisión",
            key: "fecha_emision",
            sortable: true,
          },
          {
            label: "Estado",
            key: "estado",
            sortable: true,
          },
        ],
      };
    },
    
    mounted() {
        this.totalRows = this.items.length;
        this.getInicial();
    },
    methods: {

        onFiltered(filteredItems) {
            this.totalRows = filteredItems.length;
            this.currentPage = 1;
        },  

        getInicial()
        {
            this.axios
                .get(`${this.urlbackend}/compraemitirdocumento/getDocumentoEmitido/`+this.infoEmpresa.id_empresa)
                .then((res) => {
                    console.log(res);
                    this.tableData = res.data;
                        res.data.map((p) => {
                            p['descripcion']    = p.documento_tributario.descripcion;
                            p['total']          = '$ '+p.total_documento;
                            p['proveedorName'] = p.proveedor.razon_social;
                            if(p.estado_id == 14){ p["estado"]  = "EMITIDO";}else{ p["estado"]  = "-";}
                            
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
        
        eliminarDocumento(documento)
        {   
          console.log(documento);
          Swal.fire({
            icon: 'error',
            title: 'STOP!',
            text: "Acción aun no disponible",
            timer: 1500,
            showConfirmButton: false
          });
        },

        gerenerarDocumento(documento)
        {   
          console.log(documento);
          Swal.fire({
            icon: 'error',
            title: 'STOP!',
            text: "Acción aun no disponible",
            timer: 1500,
            showConfirmButton: false
          });
        },
    
    },
    
  };
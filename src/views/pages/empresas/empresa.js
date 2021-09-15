import Swal from "sweetalert2";
import Layout from "../../layouts/main";
export default {
    components: {
      Layout,
      Swal
    },
    data() {
      return {
        urlbackend: this.$urlBackend,
        // tabla
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
        sortBy: "nombres",
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
    
    mounted() {
      this.totalRows = this.items.length;
    },
    methods: {
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length;
        this.currentPage = 1;
      },
      editar(datos){
        
        console.log(datos)

      },

      successmsg(title, message, type) {
        Swal.fire(title, message, type);
      },
  
    },
  };
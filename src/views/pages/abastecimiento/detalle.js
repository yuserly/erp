import Layout from "../../layouts/main";
import Multiselect from "vue-multiselect";
import Swal from "sweetalert2";


import { required, numeric } from "vuelidate/lib/validators";
export default {
  components: { Layout, Swal, Multiselect },

  data() {
    return {
        urlbackend: this.$urlBackend,     
        proveedores: [],
        unidades: [],
        productos: [],
        centros: [],
        detalles: [],
        existeDetalle: 0,
        tipoImpuesto: '',
        idEncabezado: '',
        m_afecto: 0,
        m_iva: 0,
        retenciones: 0,
        total: 0,
        submitted: false,
        guardarDetalle: {
          detalles: [],
          m_afecto: 0,
          m_iva: 0,
          retenciones: 0,
          total: 0,
          idEncabezado: '',
        },

        typeform: "create", 
        buttonForm: true,
        infoEmpresa: JSON.parse(localStorage.getItem("globalEmpresasSelected")),
        documentoName: "",
        tipoDocumento: this.$route.params.tipo,

        form : {
            documento_id: "",
            n_documento: "",
            proveedor: "",
            fechadoc: "",
            fechaven: "",
            glosa: "",
            direccion: "",
            unidad: "",
        },

        formDetalle: {
            sku: "",
            producto: "",
            cantidad: "",
            precio: "",
            descuento_porcentaje: "",
            precio_descuento: "",
            descripcion: "",
            descripcion_adicional: "",
            total: "",
            centro_costo: "",
        },

        validations: {
          formDetalle: {
            sku: {
              required,
              numeric,
            },
          },
        },

      title: "Tabs & Accordions",
      items: [
        {
          text: "UI Elements",
        },
        {
          text: "Tabs & Accordions",
          active: true,
        },
      ],
      text: `
         Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher synth. Cosby sweater eu banh mi, qui irure terry richardson ex squid. Aliquip placeat salvia cillum iphone. Seitan aliquip quis cardigan american apparel, butcher voluptate nisi qui.
        `,
      content: `Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid. Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee. Qui photo booth letterpress, commodo enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR. Homo nostrud organic, assumenda labore aesthetic magna delectus.`,
    };
    
  },
  middleware: "authentication",
  mounted() {
    this.getInicial();
    
},
methods: {
   
    getInicial()
    {   
        this.axios
            .get(`${this.urlbackend}/compraemitirdocumento/getInicialDetalle/`+this.tipoDocumento)
            .then((res) => {
                //console.log(res.data);
                this.proveedores = res.data.proveedores;
                this.unidades = res.data.unidades;
                this.tipoImpuesto = res.data.encabezado.documento_tributario.iva_honorario;
                this.form = {
                    documento_id: "",
                    n_documento: res.data.encabezado.n_documento,
                    proveedor: res.data.encabezado.proveedor,
                    fechadoc: res.data.encabezado.fecha_emision,
                    fechaven: res.data.encabezado.fecha_vencimiento,
                    glosa: res.data.encabezado.glosa,
                    direccion: res.data.encabezado.proveedor.direccion,
                    unidad: res.data.encabezado.unidad_negocio,
                }
                this.productos = res.data.encabezado.proveedor.producto;
                this.centros = res.data.centros;
                this.idEncabezado = res.data.encabezado.id_encabezado;
                this.detalles = res.data.encabezado.detalle_documento;
                this.m_afecto = res.data.encabezado.total_afecto;
                this.m_iva = res.data.encabezado.total_iva;
                this.retenciones = res.data.encabezado.total_retenciones;
                this.total = res.data.encabezado.total_documento;
            })
            .catch((error) => {
            console.log("error", error);
            });
    },

    onChangeProveedor(value)
    {
      this.form.direccion = value['direccion'];
    },

    onChangeProducto(value)
    {
        this.formDetalle.precio = value['precio_neto'];
        this.formDetalle.descripcion = value['descripcion'];
        this.formDetalle.sku = value['sku'],
        this.formDetalle.cantidad = 1;
    },

    formSubmitDetalle() { 
      this.submitted = true;

      if (!this.$v.$invalid) {
        alert("pase");
      }
        this.detalles.find(detalle => {
          if (parseInt(detalle.sku) === parseInt(this.formDetalle.sku)) {
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
                title: "Producto ya ingresado.",
            });
            this.existeDetalle = 1;
          }
        });

        //Verificamos si el producto existe o no.
        if(this.existeDetalle == 1){
          this.existeDetalle = 0;
          return false;
        } 

        //Calculamos precio dependiendo si tiene o no descuento
        if(this.formDetalle.descuento_porcentaje != ''){
          this.formDetalle.total = parseInt(this.formDetalle.precio_descuento)*parseInt(this.formDetalle.cantidad);
        }else{
          this.formDetalle.total = parseInt(this.formDetalle.precio)*parseInt(this.formDetalle.cantidad);
        }
        
        this.detalles.push(this.formDetalle);

        this.m_afecto = parseInt(this.m_afecto)+parseInt(this.formDetalle.total);

        if(this.tipoImpuesto == 1){
            this.m_iva =  Math.round(parseInt(this.m_afecto)*(1.19)-(parseInt(this.m_afecto)));
            this.total = parseInt(this.m_afecto)+parseInt(this.m_iva);
        }else if( this.tipoImpuesto == 2){
            this.m_iva = 0;
            this.total = parseInt(this.m_afecto);
        }else if(this.tipoImpuesto == 3){
            this.retenciones = Math.round(parseInt(this.m_afecto)*(11.5)/100);
            this.total = parseInt(this.m_afecto)+parseInt(this.retenciones);
        }

        this.formDetalle = {
          n_detalle: "",
          sku: "",
          producto: "",
          cantidad: "",
          precio: "",
          porcentaje: "",
          precio_descuento: "",
          descripcion: "",
          descricion_adicional: "",
          centrocosto: '',
        }
      
    },

    GuardarDetalles()
    {
      if(this.detalles.length > 0){
        this.guardarDetalle = {
          detalles: this.detalles,
          m_afecto: this.m_afecto,
          m_iva: this.m_iva,
          retenciones: this.retenciones,
          total: this.total,
          idEncabezado: this.idEncabezado,
        },

        this.axios
            .post(`${this.urlbackend}/detalledocumento/guardarDetalle/`, this.guardarDetalle)
            .then((res) => {
              const title = "Documento Tributario";
              const message = res.data;
              const type = "success";

              this.successmsg(title, message, type);

            })
            .catch((error) => {
              console.log("error", error);
            });
      }else{
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
          title: "Debes tener minimo un detalle agregado al documento."
      })
      }
    },

    calcularDescuento()
    { 
      if(this.formDetalle.descuento_porcentaje > 100){
        this.formDetalle.descuento_porcentaje = "";
        this.formDetalle.precio_descuento = "";
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
          title: "Maximo 100% descuento."
      })
      }else{
        this.formDetalle.precio_descuento = this.formDetalle.precio-(Math.round(this.formDetalle.precio*this.formDetalle.descuento_porcentaje/100));
      }
    },

    changeCantidad()
    {
      this.formDetalle.descuento_porcentaje = "";
      this.formDetalle.precio_descuento = "";
    },

    EliminarDetalle(index, total)
    { 
      this.m_afecto = parseInt(this.m_afecto-total);
      if(this.tipoImpuesto == 1){
        this.m_iva =  Math.round(parseInt(this.m_afecto)*(1.19)-(this.m_afecto));
        this.total =  this.m_afecto+this.m_iva;
      }else if( this.tipoImpuesto == 2){
          this.m_iva = 0;
          this.total = this.m_afecto;
      }else if(this.tipoImpuesto == 3){
          this.retenciones = Math.round(parseInt(this.m_afecto*(11.5)/100));
          this.total = parseInt(this.m_afecto+this.retenciones);
      }
      this.detalles.splice(index, 1);
    },

    successmsg(title, message, type) {
        Swal.fire(title, message, type);
    },
},
};
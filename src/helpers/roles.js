// permisos
import Vue from "vue";
export function permisos() {
  let roles = JSON.parse(localStorage.getItem("roles"));
  if (roles) {
    roles[0].Docente.map((p) => {
      console.log(p);
      if (p == "Crear Docente") {
        Vue.prototype.$CrearDocente = true;
      } else if (p == "Editar Docente") {
        Vue.prototype.$EditarDocente = false;
      } else if (p == "Listar Docente") {
        Vue.prototype.$ListarDocente = true;
      } else if (p == "Eliminar Docente") {
        Vue.prototype.$EliminarDocente = true;
      } else if (p == "Activar Docente") {
        Vue.prototype.$ActivarDocente = true;
      } else if (p == "Solicitud Empresa") {
        Vue.prototype.$SolicitudEmpresa = true;
      } else if (p == "Solicitud Inicio Actividad") {
        Vue.prototype.$SolicitudInicioActividad = true;
      }
      return p;
    });
  } else {
    Vue.prototype.$CrearDocente = false;
    Vue.prototype.$EditarDocente = false;
    Vue.prototype.$ListarDocente = false;
    Vue.prototype.$EliminarDocente = false;
    Vue.prototype.$ActivarDocente = false;
    Vue.prototype.$SolicitudEmpresa = false;
    Vue.prototype.$SolicitudInicioActividad = false;
  }
}

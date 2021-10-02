import Vue from "vue";

export const menuItems = [
  {
    id: 0,
    label: "Administración",
    isTitle: true,
    permiso: Vue.prototype.$SolicitudEmpresa,
  },
  {
    id: 1,
    label: "Gestión Usuarios",
    icon: "fas fa-users",
    permiso: Vue.prototype.$ListarProductoProveedor,
    subItems: [
      {
        id: 1.2,
        label: "Docentes",
        link: "/listado-docente",
        parentId: 1,
        permiso: Vue.prototype.$ListarDocente,
      },
      {
        id: 1.2,
        label: "Estudiantes",
        link: "/listado-alumno",
        parentId: 1,
        permiso: Vue.prototype.$ListarEstudiante,
      },
    ],
  },
  {
    id: 2,
    label: "Gestión Sistema",
    icon: "fas fa-network-wired",
    permiso: Vue.prototype.$ListarProductoProveedor,
    subItems: [
      {
        id: 2.1,
        label: "Niveles",
        link: "/niveles",
        parentId: 2,
        permiso: Vue.prototype.$ListarSubNivel,
      },
      {
        id: 2.2,
        label: "Act. Economicas",
        link: "/actividad_economica",
        parentId: 2,
        permiso: Vue.prototype.$SolicitudEmpresa,
      },
      {
        id: 2.3,
        label: "Gestión Proveedores",
        link: "/gestion_proveedor",
        parentId: 2,
        permiso: Vue.prototype.$ListarProveedor,
      },
      {
        id: 2.4,
        label: "Productos Proveedor",
        link: "/producto_proveedor",
        parentId: 2,
        permiso: Vue.prototype.$ListarProductoProveedor,
      },
    ],
  },
  {
    id: 3,
    label: "Plataforma",
    isTitle: true,
    permiso: Vue.prototype.$CrearEmpresa,
  },
  {
    id: 4,
    label: "Gestión Empresas",
    icon: "fas fa-building",
    permiso: Vue.prototype.$CrearEmpresa,
    subItems: [
      {
        id: 4.1,
        label: "Empresas",
        link: "/empresa",
        parentId: 4,
        permiso: Vue.prototype.$CrearEmpresa,
      },
    ],
  },
];

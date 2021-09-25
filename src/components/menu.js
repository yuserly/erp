export const menuItems = [
    {
        id: 0,
        label: "Administración",
        isTitle: true
    },
    {
        id: 1,
        label: "Gestión Usuarios",
        icon: "fas fa-users",
        subItems: [
            {
                id: 1.2,
                label: "Docentes",
                link: "/listado-docente",
                parentId: 1
            },
            {
                id: 1.2,
                label: "Estudiantes",
                link: "/listado-alumno",
                parentId: 1
            }
        ]
    },
    {
        id: 2,
        label: "Gestión Sistema",
        icon: "fas fa-network-wired",
        subItems: [
            {
                id: 2.1,
                label: "Niveles",
                link: "/niveles",
                parentId: 2
            },
            {
                id: 2.2,
                label: "Act. Economicas",
                link: "/actividad_economica",
                parentId: 2
            },
            {
                id: 2.3,
                label: "Gestión Proveedores",
                link: "/gestion_proveedor",
                parentId: 2
            },
            {
                id: 2.4,
                label: "Productos Proveedor",
                link: "/producto_proveedor",
                parentId: 2
            }
        ]
    },
    {
        id: 3,
        label: "Plataforma",
        isTitle: true
    },
    {
        id: 4,
        label: "Gestión Empresas",
        icon: "fas fa-building",
        link: "/empresa",
    }
];


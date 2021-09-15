export const menuItems = [
    {
        id: 1,
        label: "Docente",
        icon: "fas fa-users",
        subItems: [
           
            {
                id: 2,
                label: "Listar Docente",
                link: "/listado-docente",
                parentId: 1
            }
        ]
    },
    {
        id: 3,
        label: "Alumnos",
        icon: "fas fa-graduation-cap",
        subItems: [
           
            {
                id: 4,
                label: "Listar Alumnos",
                link: "/listado-alumno",
                parentId: 3
            }
        ]
    },
    {
        id: 5,
        label: "Niveles",
        icon: "fas fa-network-wired",
        subItems: [
            {
                id: 6,
                label: "Listado de Niveles",
                link: "/niveles",
                parentId: 5
            }
        ]
    },
    {
        id: 7,
        label: "Empresas",
        icon: "fas fa-building",
        subItems: [
            {
                id: 8,
                label: "Empresas",
                link: "/empresa",
                parentId: 7
            }
        ]
    }
];


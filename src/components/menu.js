export const menuItems = [
    {
        id: 1,
        label: "Docente",
        icon: "fas fa-users",
        subItems: [
            {
                id: 1,
                label: "Crear Docente",
                link: "/crear-docente",
                parentId: 1
            },
            {
                id: 2,
                label: "Listar Docente",
                link: "/listado-docente",
                parentId: 1
            }
        ]
    },
    {
        id: 2,
        label: "Alumnos",
        icon: "fas fa-graduation-cap",
        subItems: [
            {
                id: 3,
                label: "Crear Alumnos",
                link: "/crear-alumno",
                parentId: 2
            },
            {
                id: 4,
                label: "Listar Alumnos",
                link: "/listado-alumno",
                parentId: 2
            }
        ]
    },
    {
        id: 3,
        label: "Niveles",
        icon: "fas fa-network-wired",
        subItems: [
            {
                id: 5,
                label: "Crear Niveles",
                link: "/ecommerce/products",
                parentId: 3
            },
            {
                id: 6,
                label: "Listar Niveles",
                link: "/ecommerce/product-detail/1",
                parentId: 3
            },
            {
                id: 7,
                label: "Crear Subniveles",
                link: "/ecommerce/product-detail/1",
                parentId: 3
            },
            {
                id: 8,
                label: "Listar Subniveles",
                link: "/ecommerce/product-detail/1",
                parentId: 3
            }
        ]
    }
];


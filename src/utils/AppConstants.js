export const AREA_LIST = Object.freeze([
    // "Mumbai", "Delhi", "Banglore", "Pune"
    {
        id: 0,
        label: "mumbai",
        value: "Mumbai"
    },
    {
        id: 1,
        label: "delhi",
        value: "Delhi"
    },
    {
        id: 2,
        label: "banglore",
        value: "Banglore"
    },
    {
        id: 3,
        label: "pune",
        value: "Pune"
    },
]);

export const COLLECTION_FEES_DATA_HEADCELLS = Object.freeze([
    {
        id: 0,
        columnId: "status",
        value: "Status",
        minWidth: "120px",
        maxWidth: "120px",
        fixed: "right"
    },
    {
        id: 1,
        columnId: "payment",
        value: "Payment",
        minWidth: "120px",
        maxWidth: "120px",
        fixed: "right"
    },
    {
        id: 2,
        columnId: "area",
        value: "Area",
        minWidth: "120px",
        maxWidth: "120px",
        fixed: "right"
    },
    {
        id: 3,
        columnId: "date",
        value: "Date",
        minWidth: "120px",
        maxWidth: "120px",
        fixed: "right"
    },
]);

export const COLLECTION_FEES_DATA = Object.freeze([
    {
        id: 0,
        status: "Completed",
        payment: "Collect Fees",
        area: "Mumbai",
        date: "09/10/2022"
    },
    {
        id: 1,
        status: "Completed",
        payment: "Refused to pay",
        area: "Delhi",
        date: "09/10/2022"
    },
    {
        id: 2,
        status: "Incompleted",
        payment: "Refused to avail service",
        area: "Banglore",
        date: "09/10/2022"
    },
    {
        id: 3,
        status: "Incompleted",
        payment: "Service to be provided",
        area: "Pune",
        date: "09/10/2022"
    }
]);
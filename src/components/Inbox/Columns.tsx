const Columns = [
    {
        name:"id",
        label:"Id",
        options:{
            filter:false,
            display: false
        }
    },
    {
        name:"from",
        label:"From",
        options:{
            filter:false,
            sort:false
        },
    },
   {
    name:"label",
    label:"Type",
    options:{
        filter:true,
        display: false
    }
   },
   {
    name:"subject",
    label:"Subject",
    options:{
        filter:false,
        sort:true
    }
   },
   {
    name:"snippet",
    label:"Snippet",
    options:{
        filter:false,
        sort:false,
        display:false
    }
   },
   {
    name:"date",
    label:"Date",
    options:{
        filter:false,
        sort:false
    }
   }
]

export default Columns;
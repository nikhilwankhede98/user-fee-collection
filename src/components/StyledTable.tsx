import React, {useState, useEffect, useContext} from "react"
import { format, isValid, toDate } from "date-fns";
import _ from "lodash";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    Typography,
    Box,
    Button,
    tableCellClasses,
} from "@mui/material";
import { COLLECTION_FEES_DATA_HEADCELLS, COLLECTION_FEES_DATA } from "../utils/AppConstants"
// import TitleLabel from "./TitleLabel"
import LabelImportantOutlinedIcon from '@mui/icons-material/LabelImportantOutlined';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useNavigate } from "react-router-dom";
import EmptyRecords from "./EmptyRecords.tsx"
import {FeeCollectionContext} from "../lib/context/FeeCollectionContext.tsx"

const StyledTable = (props: any) => {

    let navigate = useNavigate();

    const { isAdmin= false, dataList } = props
    const { userInfo, updateUserInfo }: any = useContext(FeeCollectionContext)

    const [updatedArray, setUpdatedArray] = useState<any>([])
    // useEffect(() => {
    //     dataList?.map(datObj => {
    //         const newCollection = {}
    //         newCollection.ddn = datObj.ddn
    //         newCollection.area = datObj.area
    //         newCollection.propertyStatus = datObj.propertyStatus
    //         newCollection.collectionStatus = datObj.collectionStatus
    //         newCollection.name = datObj && datObj.survey && colleciton.survey.contactOwnerName || ""
    //         newCollection.contactNumber = datObj && datObj.survey && coll
    //     })
    // }, [dataList])

    const feeCollections = [] // from api
    let tableFeeCollections: any = [];

    const stringToDateTime = (str: string, dateFormat?: string) => {
        var originalDate = new Date(str);
        let formatString = dateFormat || "dd/MM/yyyy HH:mm"
        var epochDate = new Date(Number(str));
        if (isValid(originalDate)) {
            return format(originalDate, formatString);
        }
        else if (isValid(epochDate)) {
            return format(epochDate, formatString);
        }
        else return str;
    };

    dataList?.forEach((collection, index) => {
        const newCollection: any = {}
        newCollection.srNo = index + 1
        newCollection.name = collection && collection.survey && collection.survey.propertyOwnerName || "-"
        newCollection.contactNumber = collection && collection.survey && collection.survey.contactNumber || ""
        newCollection.ddn = collection.ddn || "-"
        newCollection.area = collection?.area ? _.startCase(_.camelCase(collection?.area.slice(2).replace(/_/, " "))) : "-"
        newCollection.propertyStatus = _.capitalize(collection.propertyStatus) || "-"
        newCollection.collectionStatus =  collection.collectionStatus ? _.startCase(_.camelCase(collection.collectionStatus)) : "-"
        newCollection.paymentType = collection && collection.payment && _.capitalize(collection.payment.type) || ""
        newCollection.paymentStatus = collection && collection.payment && _.capitalize(collection.payment.status) || ""
        newCollection.amount = collection && collection.payment && parseFloat(collection.payment.amount).toFixed(2) || ""
        newCollection.createdAt= collection && collection.createdAt && stringToDateTime(collection.createdAt) || ""
        tableFeeCollections?.push(newCollection)
    });

    const headCells: any = [
        {id: 0, columnName: "Sr. No"},
        {id: 1, columnName: "Name"},
        {id: 2, columnName: "Contact Number"},
        {id: 3, columnName: "DDN"},
        {id: 4, columnName: "Area"},
        {id: 5, columnName: "Property Status"},
        {id: 6, columnName: "Collection Status"},
        {id: 8, columnName: "Payment Type"},
        {id: 9, columnName: "Payment Status"},
        {id: 10, columnName: "Amount"},
        {id: 11, columnName: "Created At"},
    ]

    useEffect(() => {
        setUpdatedArray(tableFeeCollections)
    }, [tableFeeCollections])

    const TitleLabel = (props: any) => {
        return (
            <Box display= "flex" alignItems= "center">
                {props?.children}
                <Typography sx= {{marginLeft: 1, color: props?.textColor, fontWeight: 500, fontSize: "20px", fontFamily: "Montserrat"}}>
                    {`${props?.text}`}
                </Typography>
            </Box>
        )
    }

    function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
        if (b[orderBy] < a[orderBy]) {
          return -1;
        }
        if (b[orderBy] > a[orderBy]) {
          return 1;
        }
        return 0;
      }
      
      type Order = 'asc' | 'desc';
      
      function getComparator<Key extends keyof any>(
        order: Order,
        orderBy: Key,
      ): (
        a: { [key in Key]: number | string },
        b: { [key in Key]: number | string },
      ) => number {
        return order === 'desc'
          ? (a, b) => descendingComparator(a, b, orderBy)
          : (a, b) => -descendingComparator(a, b, orderBy);
      }

    const getTableCellValue = (column, value, row) => {

        const getValue = (value) => {
            return _.isNumber(value) ? value : _.isEmpty(value) ? "-" : value;
        };
        return column?.format
            ? _.capitalize(getValue(
                column?.format({
                    value,
                    row,
                })
            ))
            : _.capitalize(getValue(value))
    };

    const handleCollectFeeBtn = () => {
        // if(userInfo?.propertyCode) {
        //     updateUserInfo({propertyCode: ""})
        // }
        navigate("/scan-property-code")
    }
      
    return (
        <Box width= {1}>
            {/* {isAdmin && (
                <Box width= {1}>
                    <TitleLabel text= "Collection Fee List" textColor= "#27878e">
                        <LabelImportantOutlinedIcon style= {{color: "#27878e"}} />
                    </TitleLabel>
                </Box>
            )} */}

            {/* ADD FEE / ADMIN TABLE FILTERS */}
            {!isAdmin && (
                <Box display= "flex" justifyContent= "flex-end">
                    {/* <Button variant="contained" sx= {{backgroundColor: "#cb7871"}} startIcon={<AddCircleIcon />} onClick= {() => navigate("/user-availablity-status")}> */}
                    <Button variant="contained" sx= {{backgroundColor: "#df736a"}} startIcon={<AddCircleIcon />} onClick= {handleCollectFeeBtn}>
                        Collect Fee
                    </Button>
                    {/* <Box>
                        <TitleLabel text= "Collect Fee" textColor= "#cb7871">
                            <AddCircleIcon fontSize= "large" style= {{color: "#cb7871"}} />
                        </TitleLabel>
                    </Box> */}
                </Box>
            )}
            <Paper 
                sx={{width: "100%",
                    backgroundColor: "white",
                    border: "1px solid #77C7B4",
                    mt: 3
                }}
            >
                <TableContainer>
                    <Table
                        // stickyHeader
                        sx= {{minWidth: 750,}}
                        aria-labelledby="tableTitle"
                        aria-label="enhanced table"
                        size= "medium"
                    >
                        {/* TABLE HEAD */}
                        <TableHead>
                            <TableRow sx= {{backgroundColor: "#27878e", color: "white"}}>
                                {/* {COLLECTION_FEES_DATA_HEADCELLS?.map(headCell => ( */}
                                {headCells?.map(headCell => (
                                    <TableCell
                                        // className = { classes.tableCellHead}
                                        key={headCell?.id}
                                        align= "left"
                                        padding= "normal"
                                        // sortDirection={
                                        //     orderBy === headCell.columnId ? order : false
                                        // }
                                        style={{
                                            minWidth: headCell?.minWidth,
                                            ...(headCell?.fixed && {
                                                position: "sticky",
                                                zIndex: 19,
                                            }),
                                            right: "5px",
                                            left: "5px",
                                        }}
                                    >
                                        <Typography sx= {{color: "#fff", fontWeight: 500}}
                                        >
                                            {/* {headCell.value} */}
                                            {headCell.columnName}
                                        </Typography>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>

                        {/* TABLE BODY */}
                        <TableBody>
                            { _.isEmpty(tableFeeCollections) ? (
                                <TableRow>
                                    <TableCell colSpan={headCells?.length} >
                                        <EmptyRecords />
                                    </TableCell>
                                </TableRow>
                            ) : 
                                tableFeeCollections?.map((row, index) => (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={row?.index}
                                    >
                                        {Object.values(row)?.map((objectItem:any) => (
                                            <TableCell
                                                align= "left"
                                                style={{
                                                    verticalAlign:
                                                        "baseline",
                                                    maxWidth: "500px",
                                                    overflowWrap:
                                                        "break-word",
                                                    right: "0.5px",
                                                    left: "0.5px",
                                                }}
                                            >
                                                    <Typography
                                                        // className={
                                                        //     classes.text
                                                        // }
                                                        sx= {{color: "#606060", fontWeight: 500}}
                                                    >
                                                        {objectItem || "-"}
                                                    </Typography>
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    )
}

export default StyledTable

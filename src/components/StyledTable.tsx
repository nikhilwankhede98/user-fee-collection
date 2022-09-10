import React from "react"
import _ from "lodash"
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

const StyledTable = (props: any) => {

    let navigate = useNavigate();

    const { isAdmin= false } = props

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

        console.log("yo", column, value, row)
        const getValue = (value) => {
            return _.isNumber(value) ? value : _.isEmpty(value) ? "-" : value;
        };
        return column?.format
            ? getValue(
                  column?.format({
                      value,
                      row,
                  })
              )
            : getValue(value);
    };
      
    return (
        <Box width= {1}>
            {isAdmin && (
                <Box width= {1}>
                    <TitleLabel text= "Collection Fee List" textColor= "#27878e">
                        <LabelImportantOutlinedIcon style= {{color: "#27878e"}} />
                    </TitleLabel>
                </Box>
            )}

            {/* ADD FEE / ADMIN TABLE FILTERS */}
            {!isAdmin && (
                <Box display= "flex" justifyContent= "flex-end">
                    <Button variant="contained" sx= {{backgroundColor: "#cb7871"}} startIcon={<AddCircleIcon />} onClick= {() => navigate("/user-availablity-status")}>
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
                                {COLLECTION_FEES_DATA_HEADCELLS?.map(headCell => (
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
                                            {headCell.value}
                                        </Typography>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>

                        {/* TABLE BODY */}
                        <TableBody>
                                { COLLECTION_FEES_DATA?.map(row => (
                                    <TableRow
                                    hover
                                    // onClick={(event) => handleClick(event, row.name)}
                                    role="checkbox"
                                    tabIndex={-1}
                                    key={row?.id}
                                    // selected={isItemSelected}
                                  >
                                    { COLLECTION_FEES_DATA_HEADCELLS?.map((column, index) => {
                                        const value = _.get(
                                            row,
                                            column.columnId
                                        );
                                        return (
                                            <TableCell
                                                key={
                                                    `${column.id}` +
                                                    index
                                                }
                                                align= "left"
                                                style={{
                                                    verticalAlign:
                                                        "baseline",
                                                    maxWidth:
                                                        column?.maxWidth,
                                                    overflowWrap:
                                                        "break-word",
                                                    ...(column?.fixed && {
                                                        position:
                                                            "sticky",
                                                        backgroundColor:
                                                            "white",
                                                    }),
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
                                                    {getTableCellValue(
                                                        column,
                                                        value,
                                                        row
                                                    )}
                                                </Typography>
                                            </TableCell>
                                        )
                                    })}
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    )
}

export default StyledTable

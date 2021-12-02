import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Pagination from "./Pagination";

function TableUi() {
  const [mydata, setMydata] = useState([]);
  const [showPerPage, setShowPerPage] = useState(8);
  const [pagination, setPagination] = useState({
    start: 0,
    end: showPerPage,
  });
  const [filtervalue, setFiltervalue] = useState([]);

  useEffect(() => {
    fetch(
      `https://staging-backend.esyms-api.com/esyms/website/product/front-condition?categoryId=&name=%20`
    )
      .then((res) => res.json())
      .then((data) => setMydata(data.results.docs));
  }, []);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const onPaginationChange = (start, end) => {
    setPagination({ start: start, end: end });
  };

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  const handlefilterdata = (e) => {
    const pricevalue = mydata.filter(
      (data) => data.price == parseInt(Math.round(e.target.value))
    );
    setFiltervalue(pricevalue);
  };
  return (
    <div className="App">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: "100%" }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Medicine name</StyledTableCell>
              <StyledTableCell align="left">Brand</StyledTableCell>
              <StyledTableCell align="left">Uses</StyledTableCell>
              <StyledTableCell align="left">price</StyledTableCell>
              <StyledTableCell align="left">specialPrice</StyledTableCell>
              <StyledTableCell align="left">rating</StyledTableCell>
            </TableRow>
            <StyledTableCell align="left">
              <input
                type="text"
                placeholder="Search by price range"
                onChange={handlefilterdata}
              />
            </StyledTableCell>
          </TableHead>
          {filtervalue.length > 3
            ? filtervalue
                .slice(pagination.start, pagination.end)
                .map((data) => {
                  return (
                    <>
                      <TableRow
                        key={data._id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="right">{data.productId}</TableCell>
                        <TableCell align="right">{data.price}</TableCell>
                        <TableCell align="right">{data.specialPrice}</TableCell>
                      </TableRow>
                    </>
                  );
                })
            : mydata.slice(pagination.start, pagination.end).map((data) => {
                return (
                  <>
                    <StyledTableRow
                      key={data._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <StyledTableCell align="left">
                        {data.name.en}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {data.brand}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {data.routeOfAdministration}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {data.price}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {data.specialPrice}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {data.rating}
                      </StyledTableCell>
                    </StyledTableRow>
                  </>
                );
              })}
        </Table>
      </TableContainer>

      <Pagination
        showPerPage={showPerPage}
        onPaginationChange={onPaginationChange}
        total={mydata.length}
      />
    </div>
  );
}

export default TableUi;

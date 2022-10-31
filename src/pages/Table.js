import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const columns = [
  { id: "ESGReport", label: "ESG Report", minWidth: 170 },
  { id: "date", label: "Date", minWidth: 100, align: "center" },
  {id: "PercentageComplete",label: "Percentage Complete",minWidth: 170,align: "center",},
  {id: "Notes",label: "Notes",minWidth: 170,align: "center",},
];

function createData(ESGReport, date, PercentageComplete, Notes) {
  return { ESGReport, date, PercentageComplete, Notes };
}

const rows = [
  createData("climate chang", "15-09-2020", "20%", "capturing results"),
  createData("carbon emission	", "15-09-2020", "50%", "capturing results"),
  createData("product carbon footprint","15-09-2020","25%	","capturing results"),
  createData("Financial impact", "15-09-2020", "40%", "capturing results"),
  createData("climate change", "15-09-2020", "50%", "capturing results"),
  createData("climate chang", "15-09-2020", "20%", "capturing results"),
  createData("carbon emission	", "15-09-2020", "50%", "capturing results"),
  createData("product carbon footprint","15-09-2020","25%	","capturing results"),
  createData("Financial impact", "15-09-2020", "40%", "capturing results"),
  createData("climate change", "15-09-2020", "50%", "capturing results"),
  createData("climate chang", "15-09-2020", "20%", "capturing results"),
  createData("carbon emission	", "15-09-2020", "50%", "capturing results"),
  createData("product carbon footprint","15-09-2020","25%	","capturing results"),
  createData("Financial impact", "15-09-2020", "40%", "capturing results"),
  createData("climate change", "15-09-2020", "50%", "capturing results"),
];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const history = useNavigate();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    fontWeight: "bolder",
                    fontSize: "15px",
                    backgroundColor: "lightBlue",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell
                style={{
                  fontWeight: "bolder",
                  fontSize: "15px",
                  backgroundColor: "lightBlue",
                }}
              ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                    <TableCell align="center">
                      <Button
                        size="small"
                        onClick={() => history("/ViewReport")}
                        variant="contained"
                      >
                        Open
                      </Button>
                      <span> &emsp;</span>

                      <Button size="small" variant="contained" color="error">
                        Delete
                      </Button>
                      <span> &emsp;</span>

                      <Button size="small" variant="contained" color="warning">
                        Publish
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

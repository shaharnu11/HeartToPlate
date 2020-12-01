import React from 'react';
import ReactExport from 'react-export-excel';

const { ExcelFile } = ReactExport;
const { ExcelSheet } = ReactExport.ExcelFile;
const { ExcelColumn } = ReactExport.ExcelFile;

const DownloadExcel = props => {
  const { data = [] } = props;

  const a = data.length > 0 ? Object.keys(data[0]).map(_ => <ExcelColumn label={_} value={_} />) : 1;

  return (
    <ExcelFile hideElement>
      <ExcelSheet data={data} name="Employees">
        {a}
        <ExcelColumn label="Name" value="name" />
        <ExcelColumn label="Wallet Money" value="amount" />
        <ExcelColumn label="Gender" value="sex" />
        <ExcelColumn label="Marital Status" value={col => (col.is_married ? 'Married' : 'Single')} />
      </ExcelSheet>
    </ExcelFile>
  );
};

export default DownloadExcel;

import React from 'react';
import DefaultLayout from'../../../components/instructorComponents/Layouts/DefaultLayout'
import InsTable from '../../../components/instructorComponents/Tables/Table';

const Table = () => {
  return (
    <DefaultLayout>
      <div className="flex flex-col gap-10">
        <InsTable />
      </div>
    </DefaultLayout>
  )
}

export default Table;
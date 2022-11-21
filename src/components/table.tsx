import { useEffect, useState } from 'react';
import ReactTable from 'react-table-6';
import "react-table-6/react-table.css";
import { TABLE_COLOMN } from '../constants/contant';

interface Props{
    tableData: any;
}

const Table = ({tableData}: Props) => {
    const [page, setPage] = useState<number>(1);

    const getOnChangePage = (pageNumber: number) => {
        if(pageNumber > page){
            setPage(pageNumber+1)
        }else{
            setPage(pageNumber-1)
        }
    }

    return (
        <div className='table-container'>
           <ReactTable
            data={tableData}
            columns={TABLE_COLOMN}
            showPagination={true}
            defaultPageSize={10}
            page={page}
            showPageJump={false}
            showPaginationBottom={true}
            onPageChange={getOnChangePage}
      />
        </div>           
    )
}

export default Table;
import Pagination from '@mui/material/Pagination';
import React from 'react';
import styled from 'styled-components';
import PageInfo from '../../models/PageInfo';

const Paginator : React.FC<{pageInfo: PageInfo, onChangePage: any}> = props => {
    return (
        <StyledPaginator>
            <Pagination 
                count={props.pageInfo.totalPages} 
                page={props.pageInfo.currentPage} 
                defaultPage={1} 
                boundaryCount={2}
                onChange={props.onChangePage} />
        </StyledPaginator>
    );
};

const StyledPaginator = styled.div`
    display: flex;
    margin: 3rem;
    justify-content: center;
`

export default Paginator;
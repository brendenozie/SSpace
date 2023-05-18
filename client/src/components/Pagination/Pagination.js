import React from 'react';
import { Link } from "react-router-dom";

    
const getPages = (totalItemsCount, perPage, currentPage, pagesToShow) => {
    const c = Math.ceil(totalItemsCount / perPage);
    const p = currentPage || 1;
    pagesToShow = pagesToShow || 9; //this shows the pages as a list
    const pages = [];
    pages.push(p);
    const times = pagesToShow - 1;
    for (let i = 0; i < times; i++) {
        if (pages.length < pagesToShow) {
            if (Math.min.apply(null, pages) > 1) {
                pages.push(Math.min.apply(null, pages) - 1);
            }
        }
        if (pages.length < pagesToShow) {
            if (Math.max.apply(null, pages) < c) {
                pages.push(Math.max.apply(null, pages) + 1);
            }
        }
    }
    pages.sort((a, b) => a - b);
    return pages;//[1,2,3,4,5,6,7,8,9,10,11];
}

const Pagination = ({ totalItemsCount,
                        currentPage,
                        perPage,
                        pagesToShow,
                        onGoPage,
                        onPrevPage,
                        onNextPage,}) => {

    const onPage = (n) => {
        onGoPage(n);
    }
    
    const isOnLastPage = () => {
        return perPage * currentPage >= totalItemsCount;
    }
    
    const totalPages = () => {
        return Math.ceil(totalItemsCount / perPage) || 0;
    }
    
    const getMin = () => {
        return ((perPage * currentPage) - perPage) + 1;
    }
    
    const getMax = () => {
        let max = perPage * currentPage;
        if (max > totalItemsCount) {
            max = totalItemsCount;
        }
        return max;
    }

    const onPrev = () => {
        onPrevPage();
    }
    
    const onNext = () =>  {
        onNextPage();
    }
    

    const pages =  getPages(totalItemsCount, perPage, currentPage, pagesToShow).map(pageNum => {

        let buttonClass = 'page-item';

        if(pageNum === currentPage) {
            buttonClass += ' active';
        }

        return (<li className={buttonClass} onClick={() => {onPage(pageNum)}}><button className="page-link" >{ pageNum <= 9  ? "0"+ pageNum : pageNum}.</button></li>);
    });

    let prevButtonClass = 'page-item';

    if (currentPage === 1) {
        prevButtonClass += ' disabled';
    }

    const prevButton = (<li className={prevButtonClass} style={{marginRight : "30px"}}>
                            <button  className="page-link" onClick={onPrev} tabIndex="-1">Previous</button>
                        </li>);

    let nextButtonClass = 'page-item';

    if(isOnLastPage()) {
        nextButtonClass += ' disabled';
    }

    const nextButton = (
                            <li className={nextButtonClass}>
                                <button  disabled={isOnLastPage()}
                                    className="page-link" onClick={onNext}>Next</button>
                            </li>
                        );

        return (                
                <ul className="pagination justify-content-end mt-50">
                    {prevButton}
                    {pages}
                    {nextButton}
            </ul>
        );
    }


const mapStateToProps = (state) => {
    return {
        ...state.pagination,
        totalItemsCount: state.shop.products.length,
    }
};

export default Pagination;

class PageInfo
{
    currentPage: number;
    totalResults: number;
    currentPageItemsCount: number;

    constructor (currentPage: number, totalResults: number, currentPageItemsCount: number)
    {
        this.currentPage = currentPage;
        this.totalResults = totalResults;
        this.currentPageItemsCount = currentPageItemsCount;
    }

    get totalPages() {
        if (this.totalResults === 0)
            return 0;
            
        return Math.ceil(this.totalResults/this.currentPageItemsCount);
    }
}

export default PageInfo;
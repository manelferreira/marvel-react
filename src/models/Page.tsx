import PageInfo from "./PageInfo";

class Page<T>
{
    items : T[];
    pageInfo: PageInfo;

    constructor (items: T[], currentPage: number, totalResults: number, currentPageItemsCount: number)
    {
        this.items = items;
        this.pageInfo = new PageInfo(currentPage, totalResults, currentPageItemsCount);
    }
}

export default Page;
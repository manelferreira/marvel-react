interface MarvelPageBaseApiResponse
{
    data: {
        offset: number,
        limit: number,
        count: number,
        total: number,
        results: []
    }
}

export default MarvelPageBaseApiResponse;
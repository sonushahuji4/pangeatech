import { useEffect,useMemo,useState } from 'react';
import { APIsService } from '../services/apisService';
import { Utils } from '../helper/utils';

const Revenue = () => {
    const [revenue, setRevenue] = useState([]);
    const [revenueTypes, setRevenueTypes] = useState<any[string]>([]);
    const [revenueTypesMappedToProduct, setRevenueTypesMappedToProduct] = useState<any>({});
    const [products, setProducts] = useState<any>({});
    const [seriesValues, setSeries] = useState<any[]>([]);
    const [selectRevenueType, setSelectRevenueType] = useState<string>("All Revenue Type");
    const [tableData, setTableData] = useState<any[]>([]);


    useEffect(() => {
        (async ()=>{
            try {
                setRevenue(await APIsService.fetchData({method : 'get',url : 'http://fetest.pangeatech.net/data',x_api_key:''}));
            } catch (error) {
                console.log('error while fetching tenantdefinition and exclusionRules: ',error);
            }
        })();
    },[]);


    useMemo(() => {
        if(revenue){
            const {revenueTypes, revenueTypesMappedToProduct, products,seriesData,tableData} = Utils.segregateAndClubInProducts(revenue);
            setRevenueTypes([...revenueTypes])
            setRevenueTypesMappedToProduct(revenueTypesMappedToProduct)
            setProducts(products)
            setSeries(seriesData)
            setTableData(tableData);

        }
    },[revenue]);

    useEffect(() => {
        if(selectRevenueType && revenueTypesMappedToProduct){
            const listOfProductsInRevenue = revenueTypesMappedToProduct.get(selectRevenueType) || [];
            const seriesData: any = [];
            listOfProductsInRevenue.forEach((key: string) => {
                seriesData.push({
                    name: key,
                    data: products.get(key),
                });
            });
            setSeries(seriesData);
        }
    },[selectRevenueType])

    return { revenueTypes, seriesValues,selectRevenueType,setSelectRevenueType,tableData }
}

export default Revenue;
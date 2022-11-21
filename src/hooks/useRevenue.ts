import { useEffect,useMemo,useState } from 'react';
import { APIsService } from '../services/apisService';
import { Utils } from '../helper/utils';

const Revenue = () => {
    const [revenue, setRevenue] = useState([]);
    const [revenueTypes, setRevenueTypes] = useState({});
    const [revenueTypesMappedToProduct, setRevenueTypesMappedToProduct] = useState<any>({});
    const [products, setProducts] = useState<any>({});
    const [seriesValues, setSeries] = useState<any[]>([]);
    const [selectRevenueType, setSelectRevenueType] = useState<string>("ALL");


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
            const {revenueTypes, revenueTypesMappedToProduct, products,seriesData} = Utils.segregateAndClubInProducts(revenue);
            setRevenueTypes(revenueTypes)
            setRevenueTypesMappedToProduct(revenueTypesMappedToProduct)
            setProducts(products)
            setSeries(seriesData)

        }
    },[revenue]);

    useEffect(() => {
        if(selectRevenueType && revenueTypesMappedToProduct){
            console.log("selectRevenueType :",selectRevenueType);
            const listOfProductsInRevenue = revenueTypesMappedToProduct.get("Revenue Type -11") || []; //selectRevenueType
            const seriesData: any = [];
            listOfProductsInRevenue.forEach((key: string) => {
                seriesData.push({
                    name: key,
                    data: products.get(key),
                });
            });
            setSeries(seriesData);
        }
    },[selectRevenueType,revenueTypesMappedToProduct])

    return { revenueTypes, revenueTypesMappedToProduct, products, seriesValues,selectRevenueType,setSelectRevenueType }
}

export default Revenue;
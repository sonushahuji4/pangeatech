import { MONTH_NAMES } from '../constants/contant';
export class Utils {

    public static removeDuplicate = (arr: [string | number]) => {
        return [...new Set(arr)]
    }

    public static addMonthToACV = (arr: [[string, number]], targetArr: [string, number]) => {
        const newArr: [[string, number]] = [...arr]; 
        let isTargetArrAlreadyExists = false;
        arr.forEach((item, index) => {
            if(item[0] === targetArr[0]){
                newArr[index][1] = newArr[index][1] + targetArr[1];
                isTargetArrAlreadyExists = true;
            }
        });
        if(!isTargetArrAlreadyExists){
            return [...newArr,targetArr];
        }
        return newArr;
    }

    public static segregateAndClubInProducts = (revenue: any[]) => {
        const All_Revenue_Type = "All Revenue Type";
        const revenueTypes = new Set();
        const revenueTypesMappedToProduct = new Map<string,any>();
        const products = new Map<string,any>();
        const allProducts = new Set();
        const tableData = [] as any[];
        revenueTypes.add(All_Revenue_Type);
        revenue.forEach((item: any) => {
            tableData.push(item);
            revenueTypes.add(item.revenue_type);
            allProducts.add(item.product);
            if(revenueTypesMappedToProduct.get(item.revenue_type)){
                revenueTypesMappedToProduct.set(item.revenue_type, [...revenueTypesMappedToProduct.get(item.revenue_type), item.product]);
            }else{
                revenueTypesMappedToProduct.set(item.revenue_type, [item.product]);
            }
            if(products.get(item.product)){
                products.set(item.product, Utils.addMonthToACV(products.get(item.product),[item.month,item.acv])) 
            }else{
                products.set(item.product, [[item.month,item.acv]]);
            }
        });

        revenueTypes.forEach((item:any) => {
            if(item === All_Revenue_Type){
                revenueTypesMappedToProduct.set(All_Revenue_Type, [...allProducts]);
            }else{
                revenueTypesMappedToProduct.set(item,Utils.removeDuplicate(revenueTypesMappedToProduct.get(item)));
            }
        });

        const seriesData: any = [];
        products.forEach((item, key) => {
            item.sort(function (a: [string , number], b: [string , number]) {
                return MONTH_NAMES[a[0]] - MONTH_NAMES[b[0]];
             });

            seriesData.push({
                name: key,
                data: item,
            });
        });

        return {revenueTypes, revenueTypesMappedToProduct, products,seriesData,tableData}
    }
}
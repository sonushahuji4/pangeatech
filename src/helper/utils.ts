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
        const revenueTypes = new Set<[string]>();
        const revenueTypesMappedToProduct = new Map<string,any>();
        const products = new Map<string,any>();

        revenue.forEach((item: any) => {
            revenueTypes.add(item.revenue_type);
            if(revenueTypesMappedToProduct.get(item.revenue_type)){
                revenueTypesMappedToProduct.set(item.revenue_type, [...revenueTypesMappedToProduct.get(item.revenue_type), item.product]);
                //revenueTypesMappedToProduct[item.revenue_type] = [...revenueTypesMappedToProduct[item.revenue_type], item.product] 
            }else{
                revenueTypesMappedToProduct.set(item.revenue_type, [item.product]);
                // revenueTypesMappedToProduct[item.revenue_type] = [item.product]
            }
            if(products.get(item.product)){
                // products[item.product] = Utils.addMonthToACV(products[item.product],[item.month,item.acv]) 
                products.set(item.product, Utils.addMonthToACV(products.get(item.product),[item.month,item.acv])) 
            }else{
                products.set(item.product, [[item.month,item.acv]]);
                //products[item.product] = [[item.month,item.acv]]
            }
        });

        revenueTypes.forEach((item:any) => {
            revenueTypesMappedToProduct.set(item,Utils.removeDuplicate(revenueTypesMappedToProduct.get(item)));
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

        return {revenueTypes, revenueTypesMappedToProduct, products,seriesData}
    }
}
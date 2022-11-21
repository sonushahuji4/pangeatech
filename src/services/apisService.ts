import axios from 'axios';

interface Props {
    url : string;
    method : string;
    x_api_key : string;
}

export class APIsService {
    public static fetchData = async (Params:Props) => {
        try {
            const {url,method, x_api_key} = Params;
            const response = await axios({method,url});
            if(response && response.status === 200 && response.data){
                return response.data
            }  
            return []
        } catch (error) {
            console.log('error while fetching tenantdefinition and exclusionRules: ',error);
            return []
        }
    }
}
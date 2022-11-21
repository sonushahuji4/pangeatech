import './styles/App.scss';
import Revenue from './components/revenue';
import Navbar from './components/navBar';
import useRevenue from './hooks/useRevenue';

const App = () => {
  const { revenueTypes, revenueTypesMappedToProduct, products, seriesValues,selectRevenueType,setSelectRevenueType } = useRevenue();
  return (
    <div className="main-container">
      <Navbar revenueTypes={[...revenueTypes as any[] || []]} selectRevenueType={selectRevenueType} setSelectRevenueType={setSelectRevenueType}/>
      <Revenue seriesValues={seriesValues}/>
    </div>
  );
}

export default App;

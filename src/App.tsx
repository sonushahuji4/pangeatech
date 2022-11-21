import './styles/App.scss';
import Revenue from './components/revenue';
import Navbar from './components/navBar';
import Table from './components/table';
import Footer from './components/footer';
import useRevenue from './hooks/useRevenue';


const App = () => {
  const { revenueTypes, seriesValues,selectRevenueType,setSelectRevenueType,tableData } = useRevenue();
  return (
    <div className="main-container">
      <Navbar revenueTypes={revenueTypes} selectRevenueType={selectRevenueType} setSelectRevenueType={setSelectRevenueType}/>
      <Revenue seriesValues={seriesValues}/>
      <Table tableData={tableData}/>
      <Footer/>
    </div>
  );
}

export default App;

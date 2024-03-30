import DashboardWrapper from "./DashboardWrapper";
import ConfigPanel from "./config/ConfigPanel";
import FilterProvider from "./config/filter/FilterProvider";
import HeatMap from "./map/HeatMap";

const Dashboard = () => {
  return (
    <FilterProvider>
      <DashboardWrapper>
        <ConfigPanel />
        <HeatMap />
      </DashboardWrapper>
    </FilterProvider>
  );
};

export default Dashboard;

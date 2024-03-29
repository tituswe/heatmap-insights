import { DashboardProvider } from "./DashboardProvider";
import DashboardWrapper from "./DashboardWrapper";
import ConfigPanel from "./config/ConfigPanel";
import FilterProvider from "./config/filter/FilterProvider";
import HeatMap from "./map/HeatMap";

const Dashboard = () => {
  return (
    <DashboardProvider>
      <FilterProvider>
        <DashboardWrapper>
          <ConfigPanel />
          <HeatMap />
        </DashboardWrapper>
      </FilterProvider>
    </DashboardProvider>
  );
};

export default Dashboard;

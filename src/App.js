import CorrelationPlot from "./plots/CorrelationPlot";
import correlation_data from "./data/correlation_1";
import Scatterplots from "./plots/Scatterplots";
import scatterplots_data from "./data/scatterplots_1";
import SpaghettiPlot from "./plots/SpaghettiPlot";
import spaghetti_data from "./data/spaghetti_1";
import LinePlot from "./plots/LinePlot";
import lineplot_data from "./data/lineplot_data";

const Page = ({ children }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        placeItems: "center",
        gap: 20,
      }}
    >
      {children}
    </div>
  );
};

const Card = ({ children }) => {
  return (
    <div
      style={{
        height: "500px",
        width: "90vw",
        boxShadow: "0 0 10px rgb(0 0 0 / 10%)",
        padding: 30,
      }}
    >
      {children}
    </div>
  );
};

function App() {
  return (
    <Page>
      <Card>
        <LinePlot data={lineplot_data} />
      </Card>
    </Page>
  );
}

export default App;

import CorrelationPlot from "./plots/CorrelationPlot";
import Scatterplots from "./plots/Scatterplots";
import SpaghettiPlot from "./plots/SpaghettiPlot";
import "./index.css";

window.jsmodule = {
  ...window.jsmodule,
  "react-plots": {
    CorrelationPlot,
    Scatterplots,
    SpaghettiPlot,
  },
};

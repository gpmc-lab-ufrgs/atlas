import { useFeatures, useComparison } from "../../../../store"
import { ReactComponent as ComparisonIcon } from "../../../../assets/compare.svg"
import "./styles.css"

export const ComparisonButton = () => {
  const { selectedFeature } = useFeatures();
  const { comparison, addComparisonFeature, removeComparisonFeature } = useComparison();
  const isCompared = comparison.find((feature : any) => feature.properties["NAME_DIST"] === selectedFeature?.properties["NAME_DIST"]) !== undefined;
  const enableButton = comparison.length >= 4;

  const comparisonClick = (feature: any) => {
    if (isCompared) {
      removeComparisonFeature(feature);
    } else {
      addComparisonFeature(feature);
    }
  }

  return (
    <div className="actionButtonsContainer">
      <button disabled={enableButton} className="actionButton" onClick={() => comparisonClick(selectedFeature)}>
        <ComparisonIcon className="icon"/>
        {isCompared ? "Remove from Comparison" : "Add to Comparison"}
      </button>
    </div> 
  )
}
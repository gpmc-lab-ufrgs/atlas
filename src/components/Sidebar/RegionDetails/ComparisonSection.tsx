import CollapsibleSection from "@components/CollapsibleSection";

import { useComparison } from "@store/comparisonContext";

import * as Styles from "./styles";

const ComparisonSection = () => {
  const { comparison, removeComparisonDistrict } = useComparison();

  const comparisonRegionIds = comparison.map(
    (feature: any) => feature.properties.CD_MUN
  );

  const ComparisonResult = () => (
    <Styles.ComparisonButton
      to={"/comparison/" + comparisonRegionIds.join("+")}
    >
      <p>Mostrar comparação</p>
      <Styles.ChevronIcon />
    </Styles.ComparisonButton>
  );

  return (
    <CollapsibleSection title="Regiões em comparação">
      {comparison.map((feature: any) => (
        <Styles.ComparisonList key={feature.properties.CD_MUN}>
          {feature.properties["NM_MUN"]}
          <Styles.CloseIcon onClick={() => removeComparisonDistrict(feature)} />
        </Styles.ComparisonList>
      ))}

      {comparison.length > 0 && ComparisonResult()}
      <Styles.DisclaimerText>Máximo de regiões 4.</Styles.DisclaimerText>
    </CollapsibleSection>
  );
};

export default ComparisonSection;

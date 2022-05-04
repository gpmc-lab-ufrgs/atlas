import styled from "styled-components";

export const GridContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const Grid = styled.div`
  width: 260px;

  display: inline-block;

  margin: 5px 0;

  margin-right: auto;
`;

export const Title = styled.div`
  padding: 0 15px;
`;

export const GridItem = styled.div`
  min-height: 110px;

  padding: 0 15px;
  margin-bottom: 20px;

  border-left: 1px solid #e6e6e6;
`;

export const ComparisonLabel = styled.div`
  display: flex;
  justify-content: space-between;

  label {
    font-size: 14px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    margin-right: 8px;
  }
`;

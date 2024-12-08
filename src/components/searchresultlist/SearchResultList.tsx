import React, { useState } from "react";
import styled from "styled-components";
import { SearchResultCard } from "../searchresultcard/SearchResultCard";
import { MoreButton } from "../more/MoreButton";
import { calcResponsive } from "@common/styles/theme";
import scrollbarStyle from "@common/styles/scrollbarStyle";

interface SearchResultListProps {
  results: {
    imageSrc: string;
    title: string;
    address: string;
    lat: number;
    lng: number;
  }[];
  onResultClick: (
    lat: number,
    lng: number,
    title: string,
    address: string,
    imageSrc: string
  ) => void;
}

export const SearchResultList: React.FC<SearchResultListProps> = ({ results, onResultClick }) => {
  const [visibleCount, setVisibleCount] = useState(5);

  const hasMore = visibleCount < results.length;

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => Math.min(prevCount + 5, results.length));
  };

  return (
    <Container>
      <Header>
        Search Result <Count>{results.length} Places</Count>
      </Header>
      <List>
        {results.slice(0, visibleCount).map((result, index) => (
          <SearchResultCard
            key={index}
            imageSrc={result.imageSrc}
            title={result.title}
            address={result.address}
            lat={result.lat}
            lng={result.lng}
            onLocationClick={() =>
              onResultClick(result.lat, result.lng, result.title, result.address, result.imageSrc)
            }
          />
        ))}
      </List>
      {hasMore && (
        <MoreWrapper onClick={handleLoadMore}>
          <MoreButton />
        </MoreWrapper>
      )}
      <Footer>search by google</Footer>
    </Container>
  );
};

const Container = styled.div`
  width: ${calcResponsive({ value: 400, dimension: "width" })};
  height: ${calcResponsive({ value: 800, dimension: "height" })};
  padding: ${calcResponsive({ value: 20, dimension: "width" })};
  background-color: ${({ theme }) => theme.colors.background.neutral0};
  border-radius: ${({ theme }) => theme.cornerRadius.extraLarge};
  box-shadow: ${({ theme }) => theme.shadows.small};
  position: relative;
  display: flex;
  flex-direction: column;
`;

const Header = styled.h2`
  font-size: ${calcResponsive({ value: 22, dimension: "height" })};
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text.title};
  margin-bottom: ${calcResponsive({ value: 25, dimension: "width" })};
  display: flex;
  align-items: center;
`;

const Count = styled.span`
  font-size: ${calcResponsive({ value: 14, dimension: "height" })};
  font-weight: ${({ theme }) => theme.typography.caption.fontWeight};
  color: ${({ theme }) => theme.colors.text.body};
  margin-left: ${calcResponsive({ value: 10, dimension: "width" })};
`;

const List = styled.div`
  height: ${calcResponsive({ value: 590, dimension: "height" })};
  display: flex;
  flex-direction: column;
  gap: ${calcResponsive({ value: 20, dimension: "width" })};
  overflow-y: auto;
  overflow-x: hidden;
  margin-right: ${calcResponsive({ value: -25, dimension: "width" })};
  ${scrollbarStyle}
`;

const MoreWrapper = styled.div`
  position: absolute;
  bottom: ${calcResponsive({ value: 55, dimension: "height" })};
  left: 50%;
  transform: translateX(-50%);
`;

const Footer = styled.div`
  width: ${calcResponsive({ value: 120, dimension: "width" })};
  height: ${calcResponsive({ value: 20, dimension: "height" })};
  position: absolute;
  bottom: ${calcResponsive({ value: 20, dimension: "height" })};
  right: ${calcResponsive({ value: 20, dimension: "width" })};
  font-size: ${({ theme }) => theme.typography.caption.fontSize};
  color: ${({ theme }) => theme.colors.text.caption};
  text-align: right;
`;

export default SearchResultList;

import React, { useState } from "react";
import styled from "styled-components";
import { SearchResultCard } from "../searchresultcard/SearchResultCard";
import { MoreButton } from "../more/MoreButton";

interface SearchResultListProps {
  results: {
    imageSrc: string;
    title: string;
    address: string;
  }[];
}

export const SearchResultList: React.FC<SearchResultListProps> = ({ results }) => {
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
  width: 400px;
  height: 770px;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.background.neutral0};
  border-radius: ${({ theme }) => theme.cornerRadius.extraLarge};
  box-shadow: ${({ theme }) => theme.shadows.small};
  position: relative;
  display: flex;
  flex-direction: column;
  padding-right: 15px;
`;

const Header = styled.h2`
  font-size: ${({ theme }) => theme.typography.heading.h3.fontSize};
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text.title};
  margin-bottom: 25px;
  display: flex;
  align-items: center;
`;

const Count = styled.span`
  font-size: ${({ theme }) => theme.typography.caption.fontSize};
  font-weight: ${({ theme }) => theme.typography.caption.fontWeight};
  color: ${({ theme }) => theme.colors.text.body};
  margin-left: 10px;
`;

const List = styled.div`
  height: 585px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto;
  overflow-x: hidden;
  margin-right: -10px;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.background.neutral2};
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary.hover};
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.primary.normal};
  }
`;

const MoreWrapper = styled.div`
  position: absolute;
  bottom: 55px;
  left: 50%;
  transform: translateX(-50%);
`;

const Footer = styled.div`
  width: 120px;
  height: 20px;
  position: absolute;
  bottom: 20px;
  right: 20px;
  font-size: ${({ theme }) => theme.typography.caption.fontSize};
  color: ${({ theme }) => theme.colors.text.caption};
  text-align: right;
`;

export default SearchResultList;

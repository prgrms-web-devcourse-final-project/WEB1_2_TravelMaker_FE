import React from "react";
import styled from "styled-components";
import SearchIcon from "../assets/icons/SearchIcon.svg";
import { calcResponsive } from "@common/styles/theme";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ placeholder = "Search Place", onSearch }) => {
  const [inputValue, setInputValue] = React.useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSearchClick = () => {
    if (onSearch && inputValue.trim()) {
      onSearch(inputValue.trim());
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && onSearch && inputValue.trim()) {
      onSearch(inputValue.trim());
    }
  };

  return (
    <Container>
      <Input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
      />
      <IconWrapper onClick={handleSearchClick}>
        <img src={SearchIcon} alt="SearchIcon" />
      </IconWrapper>
    </Container>
  );
};

export default SearchBar;

const Container = styled.div`
  width: ${calcResponsive({ value: 400, dimension: "width" })};
  height: ${calcResponsive({ value: 50, dimension: "height" })};
  display: flex;
  align-items: center;
  border-radius: ${({ theme }) => theme.cornerRadius.extraLarge};
  padding: 10px 15px;
  background-color: ${({ theme }) => theme.colors.background.neutral0};
  font-family: ${({ theme }) => theme.typography.fontFamily.main};
  box-shadow: ${({ theme }) => theme.shadows.small};
  max-width: 400px;
`;

const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  color: ${({ theme }) => theme.colors.text.bodySubtle};
  font-size: ${calcResponsive({ value: 18, dimension: "height" })};
  font-weight: ${({ theme }) => theme.typography.heading.h4.fontWeight};
  &::placeholder {
    color: ${({ theme }) => theme.colors.text.caption};
    font-size: ${calcResponsive({ value: 16, dimension: "height" })};
  }
`;

const IconWrapper = styled.div`
  width: ${calcResponsive({ value: 32, dimension: "width" })};
  height: ${calcResponsive({ value: 32, dimension: "height" })};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
  }
`;

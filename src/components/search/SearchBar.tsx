import React from "react";
import styled from "styled-components";
import SearchIcon from "../assets/icons/SearchIcon";

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
    if (onSearch) {
      onSearch(inputValue);
    }
  };

  return (
    <Container>
      <Input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
      />
      <IconWrapper onClick={handleSearchClick}>
        <SearchIcon />
      </IconWrapper>
    </Container>
  );
};

export default SearchBar;

const Container = styled.div`
  width: 400px;
  height: 50px;
  display: flex;
  align-items: center;
  border-radius: 20px;
  padding: 10px 15px;
  background-color: #fff;
  font-family: ${({ theme }) => theme.typography.fontFamily.main};
  box-shadow: ${({ theme }) => theme.shadows.small};
  max-width: 400px;
`;

const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  color: ${({ theme }) => theme.colors.text.bodySubtle};
  font-size: ${({ theme }) => theme.typography.heading.h4.fontSize};
  font-weight: ${({ theme }) => theme.typography.heading.h4.fontWeight};
  &::placeholder {
    color: ${({ theme }) => theme.colors.text.caption};
  }
`;

const IconWrapper = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  svg {
    width: 100%;
    height: 100%;
  }
`;

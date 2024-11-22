import { useAppDispatch, useAppSelector } from "@common/hooks/useAppRedux";
import styled from "styled-components";
import { decrement, increment } from "./features/counter/counterSlice";

const Main = () => {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <Wrapper>
      <Title>Hello World!</Title>
      <SecondaryFont>Departure: 2024.11.20 Arrival: 2024.11.22</SecondaryFont>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <button
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={() => dispatch(increment())}>
        Increment
      </button>
      <h2 className="text-indigo-300">{count}</h2>
      <button
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={() => dispatch(decrement())}>
        Decrement
      </button>
    </Wrapper>
  );
};

export const SecondaryFont = styled.h1`
  font-family: ${({ theme }) => theme.typography.fontFamily.secondary};
`;

// Create a Title component that'll render an <h1> tag with some styles
const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: #bf4f74;
`;

// Create a Wrapper component that'll render a <section> tag with some styles
const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;

export default Main;

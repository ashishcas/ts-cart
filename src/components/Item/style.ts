import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    width: 100%;
    border: 1px solid white;
    border-radius: 20px;
    height: 100%;
    
    button {
        border-radius: 0 0 20px 20px;
        background-color: #b7c2ba;
    }

    img {
        max-height: 200px;
        object-fit: contain;
        border-radius: 20px 20px 0 0;
    }

    div {
        font-family: Arial, Helevtica , sans-serif;
        padding: 1rem;
        height: 100%;
    }
    
`;

export const Rupee = styled.span`
    font-family:Arial;
`;
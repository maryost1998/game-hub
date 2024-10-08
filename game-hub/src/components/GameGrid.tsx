import React from "react";
import {SimpleGrid, Spinner, Text} from "@chakra-ui/react";
import useGames from "../hooks/useGames";
import GameCard from "./GameCard";
import GameCardSkeleton from "./GameCardSkeleton";
import GameCardContainer from "./GameCardContainer";
import InfiniteScroll from "react-infinite-scroll-component";



const GameGrid = ( ) => {
    const {
        data
        , error
        , isLoading
        , isFetchingNextPage
        , fetchNextPage
        , hasNextPage
    } = useGames( );
    const skeleton = [1, 2, 3, 4, 5, 6, 7, 8];

    if (error) return <Text>{error.message}</Text>

    const fetchedGamesCount = data?.pages.reduce
    ((total, page) => total + page.results.length, 0) || 0;

    return (


            <InfiniteScroll next={() => fetchNextPage()} hasMore={!!hasNextPage} loader={<Spinner/>} dataLength={fetchedGamesCount}>
                <SimpleGrid columns={{sm: 1, md: 2, lg: 3, xl: 4}} padding="10px" spacing={6}>
                    {isLoading && skeleton.map(skeleton =>
                        <GameCardContainer key={skeleton}>
                            <GameCardSkeleton/>
                        </GameCardContainer>)}
                    {data?.pages.map((page, index) =>
                        <React.Fragment key={index}>
                            {page.results.map(game =>
                                <GameCardContainer key={game.id}>
                                    <GameCard game={game}/>
                                </GameCardContainer>)}
                        </React.Fragment>)}


                </SimpleGrid>
            </InfiniteScroll>


    );
};

export default GameGrid;
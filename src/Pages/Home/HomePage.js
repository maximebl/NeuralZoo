import {compose, withHandlers, branch, renderComponent, renderNothing} from 'recompose';
import React from 'react';
import {TextField, Typography, withStyles} from 'material-ui';
import Card, {CardActions, CardContent, CardMedia} from 'material-ui/Card';
import Button from 'material-ui/Button';
import Fuse from 'fuse.js';
import {connect} from "react-redux";
import {showSearchResults, setUserIsSearching} from "../../redux/reducers/searchReducer";
import {map} from 'ramda';
import {FileInput} from "../../FileInput/FileInput";

const styles = theme => ({
    card: {
        maxWidth: 345,
    },
    media: {
        height: 200,
    },
});

const ResultsCardBase = (props) => {
    const {classes} = props;
    return (
        <div>
            <Card className={classes.card}>
                <CardMedia
                    className={classes.media}
                    image="http://www.animalfactguide.com/wp-content/uploads/2015/09/sloth4_full.jpg"
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography type="headline" component="h2">
                        {props.title}
                    </Typography>
                    <Typography component="p">
                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                        across all continents except Antarctica
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button dense color="primary">
                        Share
                    </Button>
                    <Button dense color="primary">
                        Learn More
                    </Button>
                    <FileInput/>
                </CardActions>
            </Card>
        </div>
    );
};

const ResultsCardExt = compose(
    withStyles(styles),
);

const ResultsCard = ResultsCardExt(ResultsCardBase);

const onSearchHandler = ({showSearchResults, setUserIsSearching}, {target}) => {
    // TODO: make this functionnal
    const result = fuse.search(target.value);
    showSearchResults(result);
    if (target.value !== "") {
        setUserIsSearching(true);
    }
    else {
        setUserIsSearching(false);
    }
};

const formatFoundItems = (resultCount, isSearching) => {
    // TODO: make this functionnal
    if (!isSearching){
        return 'Search for AI stuff here';
    }
    if (isSearching && resultCount === 1){
        return `${resultCount} item found!`;
    }
    if (isSearching && resultCount > 0){
        return `${resultCount} items found!`;
    }
    if (isSearching && resultCount === 0){
        return 'No items were found';
    }

};

const SearchFieldBase = ({resultCount, onSearchHandler, isSearching}) => {
    return(
        <div>
            <TextField
                autoFocus={true}
                id="full-width"
                label={formatFoundItems(resultCount, isSearching)}
                fullWidth
                margin="normal"
                onChange={onSearchHandler}
            />
        </div>
    )
};

export const SearchFieldEnhancements = compose(
    connect((state)=>({
            resultCount: state.searchReducer.foundItems.length,
            isSearching: state.searchReducer.isSearching
        }),
        {showSearchResults, setUserIsSearching}
    ),
    withHandlers({
        onSearchHandler: props => event => {
            onSearchHandler(props, event)
        }
    })
);

export const SearchField = SearchFieldEnhancements(SearchFieldBase);

export const HomePageBase = (props) => (
    <div>
        <SearchField/>
        <FoundItems/>
    </div>
);

const ResultsIfFound = resultsFound => branch(resultsFound,
    renderComponent(({searchResults}) => map((result) => (<ResultsCard title={result.title}/>), searchResults)),
    renderNothing
);

export const FoundItems = compose(
    connect((state) => ({searchResults: state.searchReducer.foundItems})),
    ResultsIfFound((props) => props.searchResults.length !== 0)
)();

export const HomePageEnhancements = compose(
    connect((state)=>({searchResults: state.searchReducer.foundItems}))
);

export const HomePage = HomePageEnhancements(HomePageBase);

const list =  [
    {
        title: "Old Man's War",
        author: {
            firstName: "John",
            lastName: "Scalzi"
        }
    },
    {
        title: "The Lock Artist",
        author: {
            firstName: "Steve",
            lastName: "Hamilton"
        }
    },
    {
        title: "HTML5",
        author: {
            firstName: "Remy",
            lastName: "Sharp"
        }
    },
    {
        title: "Right Ho Jeeves",
        author: {
            firstName: "P.D",
            lastName: "Woodhouse"
        }
    },
    {
        title: "The Code of the Wooster",
        author: {
            firstName: "P.D",
            lastName: "Woodhouse"
        }
    },
    {
        title: "Thank You Jeeves",
        author: {
            firstName: "P.D",
            lastName: "Woodhouse"
        }
    },
    {
        title: "The DaVinci Code",
        author: {
            firstName: "Dan",
            lastName: "Brown"
        }
    },
    {
        title: "Angels & Demons",
        author: {
            firstName: "Dan",
            lastName: "Brown"
        }
    },
    {
        title: "The Silmarillion",
        author: {
            firstName: "J.R.R",
            lastName: "Tolkien"
        }
    },
    {
        title: "Syrup",
        author: {
            firstName: "Max",
            lastName: "Barry"
        }
    },
    {
        title: "The Lost Symbol",
        author: {
            firstName: "Dan",
            lastName: "Brown"
        }
    },
    {
        title: "The Book of Lies",
        author: {
            firstName: "Brad",
            lastName: "Meltzer"
        }
    },
    {
        title: "Lamb",
        author: {
            firstName: "Christopher",
            lastName: "Moore"
        }
    },
    {
        title: "Fool",
        author: {
            firstName: "Christopher",
            lastName: "Moore"
        }
    },
    {
        title: "Incompetence",
        author: {
            firstName: "Rob",
            lastName: "Grant"
        }
    },
    {
        title: "Fat",
        author: {
            firstName: "Rob",
            lastName: "Grant"
        }
    },
    {
        title: "Colony",
        author: {
            firstName: "Rob",
            lastName: "Grant"
        }
    },
    {
        title: "Backwards, Red Dwarf",
        author: {
            firstName: "Rob",
            lastName: "Grant"
        }
    },
    {
        title: "The Grand Design",
        author: {
            firstName: "Stephen",
            lastName: "Hawking"
        }
    },
    {
        title: "The Book of Samson",
        author: {
            firstName: "David",
            lastName: "Maine"
        }
    },
    {
        title: "The Preservationist",
        author: {
            firstName: "David",
            lastName: "Maine"
        }
    },
    {
        title: "Fallen",
        author: {
            firstName: "David",
            lastName: "Maine"
        }
    },
    {
        title: "Monster 1959",
        author: {
            firstName: "David",
            lastName: "Maine"
        }
    }
];

const options = {
    shouldSort: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [
        "title",
        "author.firstName"
    ]
};

const fuse = new Fuse(list, options);

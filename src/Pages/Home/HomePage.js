import {compose, withHandlers, branch, renderComponent, renderNothing} from 'recompose';
import React from 'react';
import {TextField, Typography, withStyles} from 'material-ui';
import Card, {CardActions, CardContent, CardMedia} from 'material-ui/Card';
import Button from 'material-ui/Button';
import Fuse from 'fuse.js';
import {connect} from "react-redux";
import {showSearchResults, setUserIsSearching} from "../../redux/reducers/actions";
import {construct, ifElse, gt, always, map, not, equals, and, cond} from 'ramda';
import {maybe} from 'folktale';
import {FileInput} from "../../FileInput/FileInput";
import store from '../../redux/store';
import {
    ITEMS_FOUND, NO_ITEMS_FOUND, ONE_ITEM_FOUND, PLACEHOLDER_TRY, SEARCH_HERE,
    UNKNOWN_TITLE
} from "../../utils/constants";
import {generateIds, safeGet} from "../../redux/reducers/utils";
import * as modelData from "../../data";

const styleObj = ({
    card: {
        maxWidth: 500,
        paddingBottom: 10
    },
    bold: {
        fontWeight: "bold"
    },
    media: {
        height: 200,
    },
});

const styles = theme => styleObj;

const Bold = (props) => <span style={styleObj.bold}>{props.children}</span>;

const ResultsCardBase = (props) => {
    const {title, classes, inputLabel, id, description, uploadedImage, result, endpoint} = props;

    return (
        <div className={classes.card}>
            <Card>
                <CardMedia
                    className={classes.media}
                    image={uploadedImage}
                />
                <CardContent>
                    <Typography type="headline" component="h2">
                        {title}
                    </Typography>
                    <Typography component="p" gutterBottom>
                        {description}
                    </Typography>
                    <Typography type="caption" component="h2">
                        <SearchResult result={result}/>
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button dense color="primary">
                        Share
                    </Button>
                    <Button dense color="primary">
                        Learn More
                    </Button>
                    <FileInput id={id} label={inputLabel} endpoint={endpoint}/>
                </CardActions>
            </Card>
        </div>
    );
};
const Result = ({result}) => (
    <div>
        {'We are '}
        <Bold>{result.probability + '%'}</Bold>
        {' sure that this is a '}
        <Bold>{result.prediction}</Bold>
    </div>
);

const checkIfSearchResultsFound = ({result}) => gt(result.length, 0);

const SearchResultIfResultFound = branch(checkIfSearchResultsFound,
        renderComponent(Result),
        renderNothing
    );

const SearchResult = compose(
  SearchResultIfResultFound
)();

const ResultsCardExt = compose(
    withStyles(styles)
);

const ResultsCard = ResultsCardExt(ResultsCardBase);

const setSearchingIfUserIsEnteringText = (val) => ifElse(
    () => not(equals(val, "")),
    () => store.dispatch(setUserIsSearching(true)),
    () => store.dispatch(setUserIsSearching(false))
)();

function resultCard(id, title, description, inputLabel, uploadedImage, result, endpoint) {
    this.id = id.getOrElse("");
    this.title = title.getOrElse(UNKNOWN_TITLE);
    this.inputLabel = inputLabel.getOrElse(PLACEHOLDER_TRY);
    this.description = description.getOrElse("");
    this.uploadedImage = uploadedImage.getOrElse("");
    this.result = result.getOrElse({"prediction": "", "probability": ""});
    this.endpoint = endpoint.getOrElse("");
}

const ResultCardConstructor = construct(resultCard);

const resultCardMapper = ({inputLabel, id, title, description, uploadedImage, result, endpoint}) => ResultCardConstructor(
    maybe.fromNullable(id),
    maybe.fromNullable(title),
    maybe.fromNullable(description),
    maybe.fromNullable(inputLabel),
    maybe.fromNullable(uploadedImage),
    maybe.fromNullable(result),
    maybe.fromNullable(endpoint)
);

const toResultCardObj = map(resultCardMapper);

export const processItems = compose(
    generateIds,
    toResultCardObj
);

export const displaySearchResults = (value) => {
    let foundItems = fuse.search(value);
    let processedItems = processItems(foundItems).getOrElse([]);
    return store.dispatch(showSearchResults(processedItems));
};

const onSearchHandler = ({target}) => {
    displaySearchResults(target.value);
    setSearchingIfUserIsEnteringText(target.value);
};

export const formatFoundItems = (resultCount, isSearching) => {
    const notSearching = () => not(isSearching);
    const oneItemFound = equals(resultCount, 1);
    const moreThanOneItemFound = gt(resultCount, 1);
    const nothingFound = equals(resultCount, 0);

    const oneItemFoundWhileSearching = () => and(isSearching, oneItemFound);
    const multipleItemsFoundWhileSearching = () => and(isSearching, moreThanOneItemFound);
    const noItemsFoundWhileSearching = () => and(isSearching, nothingFound);

    return cond([
        [notSearching, always(SEARCH_HERE)],
        [oneItemFoundWhileSearching, always(ONE_ITEM_FOUND)],
        [multipleItemsFoundWhileSearching, always(`${resultCount}${ITEMS_FOUND}`)],
        [noItemsFoundWhileSearching, always(NO_ITEMS_FOUND)]
    ])();
};

const SearchFieldBase = ({resultCount, onSearchHandler, isSearching}) => (
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
);

export const SearchFieldEnhancements = compose(
    connect((state) => ({
            resultCount: state.searchReducer.foundItems.length,
            isSearching: state.searchReducer.isSearching,
            resultCards: state.searchReducer.resultCards
        })
    ),
    withHandlers({
        onSearchHandler: props => event => {
            onSearchHandler(event)
        }
    })
);

export const SearchField = SearchFieldEnhancements(SearchFieldBase);

export const HomePageBase = () => (
    <div>
        <SearchField/>
        <FoundItems/>
    </div>
);

const ResultsCards = ({searchResults}) => mapResultsToCards(toResultCardObj(searchResults));

const mapResultsToCards = map(({id, title, inputLabel, description, uploadedImage, endpoint, result}) =>
    (<ResultsCard
        key={id}
        id={id}
        title={title}
        inputLabel={inputLabel}
        description={description}
        uploadedImage={uploadedImage}
        endpoint={endpoint}
        result={result}
    />)
);

const renderIfResultsFound = resultsFound =>
    branch(resultsFound,
        renderComponent(ResultsCards),
        renderNothing
    );

const checkIfResultsFound = ({searchResults}) => gt(searchResults.length, 0);

export const FoundItems = compose(
    connect((state) => ({searchResults: state.searchReducer.foundItems})),
    renderIfResultsFound(checkIfResultsFound)
)();

export const HomePageEnhancements = compose(
    connect((state) => ({searchResults: state.searchReducer.foundItems}))
);

export const HomePage = HomePageEnhancements(HomePageBase);

const options = {
    shouldSort: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [
        "title",
        "description"
    ]
};

const fuse = new Fuse(modelData.models, options);


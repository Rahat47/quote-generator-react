import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

const QuoteContainer = () => {
    const proxyURL = "https://pure-inlet-02907.herokuapp.com/";
    const apiUrl =
        "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";

    const [quote, setQuote] = useState("");
    const [author, setAuthor] = useState("");
    const [isSpinnerVisible, setIsSpinnerVisible] = useState(false);
    const [isQuoteVisible, setIsQuoteVisible] = useState(true);

    function showLoadingSpinner() {
        setIsSpinnerVisible(true);
        setIsQuoteVisible(false);
    }
    function hideLoadingSpinner() {
        if (isSpinnerVisible) {
            setIsQuoteVisible(true);
            setIsSpinnerVisible(false);
        }
    }

    function handleFetchedData(data) {
        //Check if there is any author
        data.quoteAuthor === ""
            ? setAuthor("Unknown")
            : setAuthor(data.quoteAuthor);

        //set quote
        setQuote(data.quoteText);
        hideLoadingSpinner();
    }

    function handleTweet() {
        const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
        window.open(twitterUrl, "_blank");
    }

    useEffect(() => {
        showLoadingSpinner();
        fetch(proxyURL + apiUrl)
            .then(response => response.json())
            .then(data => {
                handleFetchedData(data);
            })
            .catch(err => {
                hideLoadingSpinner();
                setAuthor("Error 404");
                setQuote("woops! something went wrong");
            });
    }, [quote]);
    return (
        <>
            <div
                className="quote-container"
                id="quote-container"
                hidden={!isQuoteVisible}
            >
                <div
                    className={
                        quote.length > 120
                            ? "quote-text long-quote"
                            : "quote-text"
                    }
                >
                    <FontAwesomeIcon icon={faQuoteLeft} />
                    <span id="quote"> {quote}</span>
                </div>

                <div className="quote-author">
                    <span id="author">{author}</span>
                </div>

                <div className="button-container">
                    <button
                        className="twitter-button"
                        id="twitter"
                        title="Tweet This!!"
                        onClick={handleTweet}
                    >
                        <FontAwesomeIcon icon={faTwitter} />
                    </button>
                    <button onClick={() => setQuote("")} id="new-quote">
                        New Quote
                    </button>
                </div>
            </div>
            <div
                className="loader"
                id="loader"
                hidden={!isSpinnerVisible}
            ></div>
        </>
    );
};

export default QuoteContainer;

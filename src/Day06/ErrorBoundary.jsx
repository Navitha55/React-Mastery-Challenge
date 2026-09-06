import React from "react";


class ErrorBoundary extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            hasError: false
        };

    }


    static getDerivedStateFromError() {

        return {
            hasError: true
        };

    }


    handleRetry = () => {

        this.setState({
            hasError: false
        });

    };


    render() {

        if (this.state.hasError) {

            return (

                <div
                    style={{
                        textAlign: "center",
                        padding: "30px"
                    }}
                >

                    <h2>Something went wrong 😵</h2>

                    <p>
                        This part of the application crashed.
                    </p>

                    <button
                        onClick={this.handleRetry}
                    >
                        Try Again
                    </button>

                </div>

            );

        }


        return this.props.children;

    }

}


export default ErrorBoundary;
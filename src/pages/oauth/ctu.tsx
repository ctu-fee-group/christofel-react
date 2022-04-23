import {Component, FC} from 'react';
import {withRouter} from "next/router";
import {WithRouterProps} from "next/dist/client/with-router";
import {withApollo} from "@apollo/client/react/hoc";
import {WithApolloClient} from "@apollo/client/react/hoc/types";
import {isError} from "../../data/graphql";
import UserErrors from "../../components/UserErrors";
import {RegisterCtuMutation, RegisterCtuPayload} from "../../data/RegisterCtu";
import {RingLoader} from "react-spinners";

interface CtuState {
    error: boolean;
    mutationResponse?: RegisterCtuPayload;
}

class Ctu extends Component<WithApolloClient<WithRouterProps>, CtuState> {
    constructor(props: WithApolloClient<WithRouterProps>) {
        super(props);
        this.state = {
            error: false
        };
    }

    componentDidUpdate(prevProps: Readonly<WithApolloClient<WithRouterProps>>, prevState: Readonly<CtuState>, snapshot?: any) {
        const query = this.props.router.query;
        const code = query.code;
        const state = query.state;
        const error = query.error;
        if (code && !error && !prevProps.router.query.code) {
            this.props.client?.mutate<RegisterCtuPayload>({
                mutation: RegisterCtuMutation,
                variables: {
                    oauthCode: code,
                    registrationCode: state,
                    redirectUri: process.env.oauthCtuRedirectUri
                }
            })
                .then(d => {
                    const error = !!(isError(d.data, undefined) || d.errors);
                    this.setState(s => {
                        return {
                            ...s,
                            mutationResponse: d.data ?? undefined,
                            error
                        };
                    });

                    if (!error) {
                        return this.props.router.push("/auth/success");
                    }
                });
        }

        if (error && !this.state.error) {
            this.setState(s => {
                return {
                    ...s,
                    error: true
                };
            });
        }
    }

    render() {
        if (this.state.error) {
            return <UserErrors responseData={this.state.mutationResponse}
                               defaultMessage="Ověření se nepodařilo, zkuste se ověřit znovu."
                               redirectUri={"/auth?code=" + this.props.router.query.state}/>;
        }

        return <RingLoader color="#0065bd" size={100} />;
    }
}

export default withRouter(withApollo<WithApolloClient<WithRouterProps>>(Ctu));

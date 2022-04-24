import {Component} from 'react';
import {withRouter} from "next/router";
import {WithRouterProps} from "next/dist/client/with-router";
import {withApollo} from "@apollo/client/react/hoc";
import {WithApolloClient} from "@apollo/client/react/hoc/types";
import {RingLoader} from "react-spinners";
import * as Sentry from "@sentry/nextjs";
import {getUserErrors, isError} from "../../data/graphql";
import UserErrors from "../../components/UserErrors";
import {RegisterCtuMutation, RegisterCtuPayload} from "../../data/RegisterCtu";

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
        const {client, router} = this.props;
        const {code, state, error} = router.query;
        if (code && !error && !prevProps.router.query.code) {
            client?.mutate<RegisterCtuPayload>({
                mutation: RegisterCtuMutation,
                variables: {
                    oauthCode: code,
                    registrationCode: state,
                    redirectUri: process.env.oauthCtuRedirectUri
                }
            })
                .then(d => {
                    const mutationError = !!(isError(d.data, undefined) || d.errors);
                    this.setState(s => ({
                        ...s,
                        mutationResponse: d.data ?? undefined,
                        error: mutationError
                    }));

                    if (!mutationError) {
                        return router.push("/auth/success");
                    }

                    Sentry.captureException({errors: d.errors, userErrors: getUserErrors(d.data)});
                    return null;
                })
                .catch(e => {
                    this.setState(s => ({
                        ...s,
                        error: true
                    }));
                    Sentry.captureException(e);
                });
        }

        const {error: error1} = this.state;
        if (error && !error1) {
            this.setState(s => ({
                ...s,
                error: true
            }));
        }
    }

    render() {
        const {error, mutationResponse} = this.state;
        if (error) {
            const {router} = this.props;
            const {state} = router.query;
            return <UserErrors responseData={mutationResponse}
                               defaultMessage="Ověření se nepodařilo, zkuste se ověřit znovu."
                               redirectUri={`/auth?code=${state}`}/>;
        }

        return <RingLoader color="#0065bd" size={100}/>;
    }
}

export default withRouter(withApollo<WithApolloClient<WithRouterProps>>(Ctu));

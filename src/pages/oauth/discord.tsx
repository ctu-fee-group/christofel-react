import {Component} from 'react';
import {withRouter} from "next/router";
import {WithRouterProps} from "next/dist/client/with-router";
import {withApollo} from "@apollo/client/react/hoc";
import {WithApolloClient} from "@apollo/client/react/hoc/types";
import {RingLoader} from "react-spinners";
import * as Sentry from "@sentry/nextjs";
import {getUserErrors, isError} from "../../data/graphql";
import UserErrors from "../../components/UserErrors";
import {RegisterDiscordMutation, RegisterDiscordPayload} from "../../data/RegisterDiscord";

interface DiscordState {
    error: boolean;
    mutationResponse?: RegisterDiscordPayload;
}

class Discord extends Component<WithApolloClient<WithRouterProps>, DiscordState> {
    constructor(props: WithApolloClient<WithRouterProps>) {
        super(props);
        this.state = {
            error: false
        };
    }

    componentDidUpdate(prevProps: Readonly<WithApolloClient<WithRouterProps>>, prevState: Readonly<DiscordState>, snapshot?: any) {
        const {client, router} = this.props;
        const {code, error} = router.query;
        if (code && !error && !prevProps.router.query.code) {
            client?.mutate<RegisterDiscordPayload>({
                mutation: RegisterDiscordMutation,
                variables: {
                    oauthCode: code,
                    redirectUri: process.env.oauthDiscordRedirectUri
                }
            })
                .then(d => {
                    const registrationCode = d.data?.registerDiscord?.registrationCode;
                    const mutationError = (isError(d.data, undefined) || d.errors || !registrationCode) && true;
                    this.setState(s => ({
                            ...s,
                            mutationResponse: d.data ?? undefined,
                            error: mutationError
                        }));

                    if (!mutationError) {
                        return router.push(`/auth?code=${  registrationCode}`);
                    }

                    Sentry.captureException({errors: d.errors, userErrors: getUserErrors(d.data)});
                    return null;
                })
                .catch(e => {
                    this.setState(s => ({
                        ...s,
                        error: true
                    }));
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
            return <UserErrors responseData={mutationResponse}
                               defaultMessage="Ověření se nepodařilo, zkuste se ověřit znovu."
                               redirectUri="/auth"/>;
        }

        return <RingLoader color="#0065bd" size={100} />;
    }
}

export default withRouter(withApollo<WithApolloClient<WithRouterProps>>(Discord));

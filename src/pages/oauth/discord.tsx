import {Component, FC} from 'react';
import {withRouter} from "next/router";
import {RegisterDiscordMutation, RegisterDiscordPayload} from "../../data/RegisterDiscord";
import {WithRouterProps} from "next/dist/client/with-router";
import {withApollo} from "@apollo/client/react/hoc";
import {WithApolloClient} from "@apollo/client/react/hoc/types";
import {isError} from "../../data/graphql";
import UserErrors from "../../components/UserErrors";
import {RingLoader} from "react-spinners";

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
        const query = this.props.router.query;
        const code = query.code;
        const error = query.error;
        if (code && !error && !prevProps.router.query.code) {
            this.props.client?.mutate<RegisterDiscordPayload>({
                mutation: RegisterDiscordMutation,
                variables: {
                    oauthCode: code,
                    redirectUri: process.env.oauthDiscordRedirectUri
                }
            })
                .then(d => {
                    const registrationCode = d.data?.registerDiscord?.registrationCode;
                    const error = (isError(d.data, undefined) || d.errors || !registrationCode) && true;
                    this.setState(s => {
                        return {
                            ...s,
                            mutationResponse: d.data ?? undefined,
                            error
                        };
                    });

                    if (!error) {
                        return this.props.router.push("/auth?code=" + registrationCode);
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
                               redirectUri="/auth"/>;
        }

        return <RingLoader color="#0065bd" size={100} />;
    }
}

export default withRouter(withApollo<WithApolloClient<WithRouterProps>>(Discord));
